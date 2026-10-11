const handler = async (m, { conn, text }) => {
  const chat = global.db.data.chats[m.chat] || (global.db.data.chats[m.chat] = {});
  const option = (text || '').trim().toLowerCase();

  if (option === 'on' || option === 'activar') {
    chat.antiAudio = true;
    return conn.reply(m.chat, '🎙️ *ANTI-AUDIO ACTIVADO*\nCada nota de voz recibirá su respectiva burla. 💀', m);
  }

  if (option === 'off' || option === 'desactivar') {
    chat.antiAudio = false;
    return conn.reply(m.chat, '🔇 *ANTI-AUDIO DESACTIVADO*\nLa gente puede volver a mandar sus podcasts de 40 minutos.', m);
  }

  chat.antiAudio = !chat.antiAudio;
  return conn.reply(
    m.chat,
    chat.antiAudio
      ? '🎙️ *ANTI-AUDIO ACTIVADO*\nCada nota de voz recibirá su respectiva burla. 💀\nUsa *antiaudio off* para desactivarlo.'
      : '🔇 *ANTI-AUDIO DESACTIVADO*\nLa gente puede volver a mandar sus podcasts de 40 minutos. 💀',
    m
  );
};

handler.all = async function (m, { conn }) {
  if (!m?.isGroup || m.fromMe || m.isBaileys || !m.sender) return;
  const chat = global.db.data.chats[m.chat];
  if (!chat?.antiAudio) return;

  const type = m.mtype || (m.message && Object.keys(m.message)[0]) || '';
  const isAudio = type === 'audioMessage' ||
    type === 'pttMessage' ||
    Boolean(m.msg?.mimetype && /^audio\//i.test(m.msg.mimetype));

  if (!isAudio) return;
  if (m.sender === conn.user?.jid) return;

  const senderTag = '@' + m.sender.split('@')[0];
  const replies = [
    `🎙️ ${senderTag}, ¿otra nota de voz? Esto es un chat, no tu podcast, criatura. Escribe un poquito. 💀`,
    `💀 ${senderTag} volvió a mandar audio... el teclado no muerde, campeón. Ponlo por escrito.`,
    `📢 Atención: ${senderTag} cree que esto es una estación de radio. ¡Usa el teclado, leyenda!`,
    `🫠 ${senderTag}, tanto audio y ni un subtítulo. Escríbelo, que leer todavía es gratis.`
  ];

  const reply = replies[Math.floor(Math.random() * replies.length)];
  await conn.sendMessage(m.chat, { text: reply, mentions: [m.sender] }, { quoted: m });
};

handler.help = ['antiaudio [on/off]'];
handler.tags = ['grupo'];
handler.command = ['antiaudio', 'antivoz', 'anti-audio'];
handler.group = true;
handler.admin = true;

export default handler;
