import util from 'util';

const handler = async (m, { text }) => {
  if (!text) return m.reply('⚠️ Escribe el código que quieres ejecutar.');

  try {
    const result = await eval(`(async () => {\n${text}\n})()`);
    const output = typeof result === 'string' ? result : util.inspect(result, { depth: 5 });
    await m.reply(output || '✅ Ejecutado correctamente.');
  } catch (e) {
    await m.reply(String(e));
  }
};

handler.help = ['eval <código>'];
handler.tags = ['owner'];
handler.command = ['eval'];
handler.owner = true;

export default handler;
