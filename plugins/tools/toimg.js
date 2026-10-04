import { ffmpeg } from '../../lib/converter.js';

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    if (!m.quoted) return m.reply(`⚠️ Responde a un sticker con el comando ${usedPrefix + command}`);
    const q = m.quoted;

    if (!/stickerMessage/i.test(q.mtype)) return m.reply("⚠️ El mensaje citado no es un sticker.");

    const stickerBuffer = await q.download();
    if (!stickerBuffer) return m.reply("❌ No se pudo descargar el sticker.");

    const result = await ffmpeg(stickerBuffer, [
      '-frames:v', '1',
      '-q:v', '2'
    ], 'webp', 'jpg');

    try {
      await conn.sendFile(m.chat, result.data, 'sticker.jpg', '✅ Sticker convertido a imagen', m);
    } finally {
      await result.delete().catch(() => {});
    }
  } catch (e) {
    console.error(e);
    m.reply("❌ Ocurrió un error al convertir el sticker.");
  }
};

handler.help = ["toimg"];
handler.tags = ["tools"];
handler.command = /^toimg$/i;

export default handler;
