import fetch from 'node-fetch';

const getMemes = async () => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch('https://meme-api.com/gimme/wholesomememes/5', {
      signal: controller.signal,
      headers: {
        accept: 'application/json',
        'user-agent': 'Bot-paga/1.8.2 (WhatsApp bot)'
      }
    });
    if (!response.ok) throw new Error(`Proveedor de memes respondió HTTP ${response.status}`);
    const json = await response.json();
    const list = Array.isArray(json.memes) ? json.memes : [json];
    return list.filter(item =>
      item && item.nsfw !== true && item.spoiler !== true &&
      typeof item.url === 'string' &&
      /^https:\/\//i.test(item.url) &&
      /\.(jpe?g|png|webp)(\?|$)/i.test(item.url)
    ).slice(0, 5);
  } finally {
    clearTimeout(timer);
  }
};

const handler = async (m, { conn }) => {
  try {
    await m.react('🕒');
    const memes = await getMemes();
    if (!memes.length) throw new Error('El proveedor no devolvió imágenes compatibles.');

    let enviados = 0;
    for (const item of memes) {
      try {
        await conn.sendMessage(m.chat, {
          image: { url: item.url },
          caption: `😄 ${item.title || 'Meme aleatorio'}\nFuente: ${item.postLink || 'Reddit'}`
        }, { quoted: enviados === 0 ? m : undefined });
        enviados++;
      } catch (error) {
        console.error('[ERROR ENVIANDO MEME]', error.message);
      }
    }
    if (!enviados) throw new Error('El proveedor respondió, pero WhatsApp no pudo enviar ninguna imagen.');
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
