import fetch from 'node-fetch';

const getAnimeImages = async () => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch('https://nekos.best/api/v2/waifu?amount=8', {
      signal: controller.signal,
      headers: {
        accept: 'application/json',
        'user-agent': 'Bot-paga/1.8.2 (https://github.com/ppequepro-cmyk/Bot-paga)'
      }
    });
    if (!response.ok) throw new Error(`Proveedor anime respondió HTTP ${response.status}`);
    const json = await response.json();
    const results = Array.isArray(json.results) ? json.results : [];
    return [...new Set(results
      .map(item => item?.url)
      .filter(url => typeof url === 'string' && /^https:\/\//i.test(url)))]
      .slice(0, 8);
  } finally {
    clearTimeout(timer);
  }
};

const handler = async (m, { conn }) => {
  try {
    await m.react('🕒');
    const urls = await getAnimeImages();
    if (!urls.length) throw new Error('El proveedor respondió, pero no devolvió URLs de imágenes válidas.');

    let enviados = 0;
    for (const url of urls) {
      try {
        await conn.sendMessage(m.chat, {
          image: { url },
          caption: enviados === 0 ? `🍥 Aquí tienes ${urls.length} imágenes anime SFW.` : ''
        }, { quoted: enviados === 0 ? m : undefined });
        enviados++;
      } catch (error) {
        console.error('[ERROR ENVIANDO ANIME]', error.message);
      }
    }
    if (!enviados) throw new Error('El proveedor respondió, pero WhatsApp no pudo enviar ninguna imagen.');
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
