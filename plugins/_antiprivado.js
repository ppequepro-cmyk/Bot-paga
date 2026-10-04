export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};

  // No bloquear los privados por defecto. Solo actuar cuando antiPrivate
  // esté realmente activado y el remitente no sea owner.
  if (bot.antiPrivate && !isOwner && !isROwner) {
    let img = Buffer.alloc(0);
    try {
      const res = await fetch('https://files.catbox.moe/0aa6fw.png');
      if (res.ok) img = Buffer.from(await res.arrayBuffer());
    } catch (e) {
      console.error('Aviso _antiprivado: no se pudo cargar la imagen:', e.message);
    }

    const fkontak = {
      key: { fromMe: false, participant: '0@s.whatsapp.net' },
      message: {
        productMessage: {
          product: {
            productImage: { jpegThumbnail: img },
            title: 'texto',
            description: '𝗗𝗘𝗧𝗘𝗡𝗧𝗘 𝗔𝗩𝗜𝗦𝗢',
            currencyCode: 'USD',
            priceAmount1000: '5000',
            retailerId: 'BOT'
          },
          businessOwnerJid: '0@s.whatsapp.net'
        }
      }
    };

    try {
      await m.reply(
        `${emoji} Hola @${m.sender.split('@')[0]}, 

⚠️ Los comandos no funcionan en *privados*.
Serás *bloqueado* inmediatamente.`,
        fkontak,
        { mentions: [m.sender] }
      );
    } catch (e) {
      console.error('Error _antiprivado al responder:', e.message);
      await m.reply('⚠️ Los comandos no funcionan en privados.');
    }

    try {
      await this.updateBlockStatus(m.chat, 'block');
    } catch (e) {
      console.error('Error _antiprivado al bloquear:', e.message);
    }

    return true;
  }

  return false;
}