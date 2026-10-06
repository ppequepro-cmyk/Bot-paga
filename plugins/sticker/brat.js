import fetch from 'node-fetch'
import Jimp from 'jimp'

let handler = async (m, { conn, args }) => {
  const res1 = await fetch('https://files.catbox.moe/p87uei.jpg')
  const thumb5 = Buffer.from(await res1.arrayBuffer())
const fkontak = {
    key: { fromMe: false, participant: "0@s.whatsapp.net" },
    message: {
        documentMessage: {
            title: '𝗦𝗧𝗜𝗞𝗘𝗥',
            fileName: `𝗦𝗧𝗜𝗞𝗘𝗥 𝗚𝗘𝗡𝗘𝗥𝗔𝗗𝗢 𝗖𝗢𝗡 𝗘𝗫𝗜𝗧𝗢`,
            jpegThumbnail: thumb5
        }
    }
}
  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

  try {
    const texto = args.join(' ').trim()
    if (!texto) {
      await conn.sendMessage(m.chat, { react: { text: '✨', key: m.key } })
      return conn.reply(m.chat, `${emoji} *Falta el texto para continuar*.`, m, rcanal)
    }

    const urlApi = `https://canvas-8zhi.onrender.com/api/brat2?texto=${encodeURIComponent(texto)}`

    const respuesta = await fetch(urlApi)
    if (!respuesta.ok) throw new Error(`API Error: ${respuesta.status} ${respuesta.statusText}`)

    const arrayBuffer = await respuesta.arrayBuffer()
    const imageBuffer = Buffer.from(arrayBuffer)

    if (!imageBuffer || imageBuffer.length === 0) throw new Error('La imagen recibida está vacía')

    const image = await Jimp.read(imageBuffer)
    image.contain(512, 512)
    const stickerBuffer = await image.getBufferAsync(Jimp.MIME_WEBP)

    /* const sticker = new Sticker(imageBuffer, {
      pack: 'Imagen BRAT',
      author: botname,
      type: 'full',
      quality: 100,
      categories: ['🤩','🎉'],
      id: 'brat-sticker',
      background: '#000000'
    })

    const stickerBufferLegacy = await sticker.toBuffer()
    */
    if (!stickerBuffer || stickerBuffer.length === 0) throw new Error('Error al convertir la imagen en sticker')

    await conn.sendMessage(m.chat, { sticker: stickerBuffer, ...global.rcanal }, { quoted: fkontak })
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

  } catch (e) {
    console.error('Error en handler brat:', e)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    m.reply(`❌ *Ocurrió un error:*\n${e.message}`)
  }
}

handler.tags = ['sticker']
handler.command = handler.help = ['brat', 'bratimg', 'brati']

export default handler