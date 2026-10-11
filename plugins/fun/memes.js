import fetch from 'node-fetch';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(conn, jid, medias, options = {}) {
  if (typeof jid !== 'string') throw new TypeError('jid must be string');
  if (medias.length < 2) throw new RangeError('Minimum 2 media');

  const caption = options.caption || options.text || '';
  const delay = Number.isFinite(options.delay) ? options.delay : 500;
  const album = baileys.generateWAMessageFromContent(jid, {
    messageContextInfo: {},
    albumMessage: {
      expectedImageCount: medias.filter(media => media.type === 'image').length,
      expectedVideoCount: medias.filter(media => media.type === 'video').length,
      ...(options.quoted ? {
        contextInfo: {
          remoteJid: options.quoted.key.remoteJid,
          fromMe: options.quoted.key.fromMe,
          stanzaId: options.quoted.key.id,
          participant: options.quoted.key.participant || options.quoted.key.remoteJid,
          quotedMessage: options.quoted.message
        }
      } : {})
    }
  }, {});

  await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });
  for (let i = 0; i < medias.length; i++) {
    const { type, data } = medias[i];
    const img = await baileys.generateWAMessage(album.key.remoteJid,
      { [type]: data, ...(i === 0 ? { caption } : {}) },
      { upload: conn.waUploadToServer });
    img.message.messageContextInfo = {
      messageAssociation: { associationType: 1, parentMessageKey: album.key }
    };
    await conn.relayMessage(img.key.remoteJid, img.message, { messageId: img.key.id });
    await baileys.delay(delay);
  }
  return album;
}

const getMemes = async () => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch('https://meme-api.com/gimme/wholesomememes/10', {
      signal: controller.signal,
      headers: { accept: 'application/json', 'user-agent': 'Bot-paga/1.8.2' }
    });
    if (!response.ok) throw new Error(`Meme API respondió HTTP ${response.status}`);
    const json = await response.json();
    const list = Array.isArray(json.memes) ? json.memes : [json];
    return list.filter(item =>
      item && item.nsfw !== true && item.spoiler !== true &&
      typeof item.url === 'string' &&
      /^https:\/\//i.test(item.url) &&
      /\.(jpe?g|png|webp)(\?|$)/i.test(item.url)
    ).slice(0, 10);
  } finally {
    clearTimeout(timer);
  }
};

const handler = async (m, { conn }) => {
  try {
    await m.react('🕒');
    const memes = await getMemes();
    if (!memes.length) throw new Error('La API no devolvió imágenes seguras compatibles.');

    if (memes.length === 1) {
      await conn.sendMessage(m.chat, {
        image: { url: memes[0].url },
        caption: `😄 ${memes[0].title || 'Meme aleatorio'}\nFuente: ${memes[0].postLink || 'Reddit'}`
      }, { quoted: m });
    } else {
      await sendAlbumMessage(conn, m.chat,
        memes.map(item => ({ type: 'image', data: { url: item.url } })),
        { caption: '😄 Aquí tienes memes aleatorios seguros.', quoted: m });
    }
    await m.react('✅');
  } catch (error) {
    console.error('[ERROR MEMES]', error);
    await m.reply(`❌ No se pudieron obtener memes: ${error.message}`);
  }
};

handler.help = ['memes'];
handler.tags = ['fun'];
handler.command = ['meme', 'memes'];
export default handler;
