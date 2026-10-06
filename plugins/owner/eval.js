import util from 'util';

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const handler = async (m, { text }) => {
  if (!text) return m.reply('⚠️ Escribe el código que quieres ejecutar.');

  try {
    const fn = new AsyncFunction('m', 'conn', 'text', text);
    const result = await fn(m, m?.conn || this, text);
    const output = typeof result === 'string'
      ? result
      : util.inspect(result, { depth: 5 });

    await m.reply(output === 'undefined' ? '✅ Ejecutado correctamente.' : output);
  } catch (e) {
    await m.reply(String(e));
  }
};

handler.help = ['eval <código>'];
handler.tags = ['owner'];
handler.command = ['eval'];
handler.owner = true;

export default handler;
