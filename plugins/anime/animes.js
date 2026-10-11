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

const getAnimeImage = async () => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch('https://api.waifu.pics/sfw/waifu', {
      signal: controller.signal,
      headers: { accept: 'application/json' }
    });
    if (!response.ok) throw new Error(`Anime API respondió HTTP ${response.status}`);
    const json = await response.json();
    if (typeof json.url !== 'string' || !/^https:\/\//i.test(json.url)) {
      throw new Error('La API devolvió una respuesta sin imagen válida.');
    }
    return json.url;
  } finally {
    clearTimeout(timer);
  }
};

const handler = async (m, { conn }) => {
  try {
    await m.react('🕒');
    const results = await Promise.allSettled(
      Array.from({ length: 8 }, () => getAnimeImage())
    );
    const urls = [...new Set(results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value))].slice(0, 8);

    if (!urls.length) throw new Error('El proveedor anime no devolvió imágenes.');

    if (urls.length === 1) {
      await conn.sendMessage(m.chat, {
        image: { url: urls[0] },
        caption: '🍥 Imagen anime aleatoria'
      }, { quoted: m });
    } else {
      await sendAlbumMessage(conn, m.chat,
        urls.map(url => ({ type: 'image', data: { url } })),
        { caption: `🍥 Aquí tienes ${urls.length} imágenes anime SFW.`, quoted: m });
    }
    await m.react('✅');
  } catch (error) {
    console.error('[ERROR ANIME]', error);
    await m.reply(`❌ No se pudieron obtener imágenes anime: ${error.message}`);
  }
};

handler.help = ['anime'];
handler.tags = ['fun'];
handler.command = ['anime', 'animes'];
export default handler;
