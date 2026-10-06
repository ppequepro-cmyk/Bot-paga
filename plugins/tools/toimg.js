
import fs from "fs";
import path from "path";
import Jimp from "jimp";

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    if (!m.quoted) return m.reply(`⚠️ Responde a un sticker con el comando ${usedPrefix + command}`);
    let q = m.quoted;

    if (!/stickerMessage/i.test(q.mtype)) return m.reply("⚠️ El mensaje citado no es un sticker.");

    let stickerBuffer = await q.download();
    if (!stickerBuffer) return m.reply("❌ No se pudo descargar el sticker.");

    let image = await Jimp.read(stickerBuffer);
    let outBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    await conn.sendFile(m.chat, outBuffer, "sticker.jpg", "✅ Sticker convertido a imagen", m);
  } catch (e) {
    console.error(e);
    m.reply("❌ Ocurrió un error al convertir el sticker.");
  }
};

handler.help = ["toimg"];
handler.tags = ["tools"];
handler.command = /^toimg$/i;

export default handler;