let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    const userId = m.mentionedJid?.[0] || m.sender;
    const users = [...new Set(
      (global.conns || []).filter(c =>
        c?.user && c?.ws?.socket?.readyState !== 3
      )
    )];

    const totalCommands = Object.keys(global.plugins || {}).filter(name => !global.plugins[name]?.disabled).length;
    const totalreg = Object.keys(global.db?.data?.users || {}).length;
    const uptime = clockString(process.uptime() * 1000);
    const mode = global.opts?.self ? 'Privado' : 'Público';

    const help = Object.values(global.plugins || {})
      .filter(plugin => plugin && !plugin.disabled)
      .map(plugin => ({
        help: Array.isArray(plugin.help) ? plugin.help : (plugin.help ? [plugin.help] : []),
        tags: Array.isArray(plugin.tags) ? plugin.tags : (plugin.tags ? [plugin.tags] : []),
        limit: plugin.limit,
        premium: plugin.premium
      }));

    const groups = [
      ['⟡ＤＯＷＮＬＯＡＤＥＲ⟡', ['downloader', 'dl', 'descargas']],
      ['✦ＡＮＩＭＥ✦', ['anime']],
      ['▢ＢＵＳＣＡＤＯＲ▢', ['buscador', 'search']],
      ['⌬ＧＡＭＥ⌬', ['game', 'juegos']],
      ['⊹ＩＭＡＧＥＮ⊹', ['imagen']],
      ['『ＧＲＯＵＰＳ』', ['grupo']],
      ['⟦ＨＥＲＲＡＭＩＥＮＴＡＳ⟧', ['herramientas', 'tools']],
      ['⋆ＯＮ / ＯＦＦ⋆', ['nable']],
      ['☣ＮＳＦＷ☣', ['nsfw']],
      ['✦ＯＷＮＥＲ✦', ['owner']],
      ['✧ＳＵＢ ＢＯＴＳ✧', ['serbot']],
      ['⊶ＳＴＩＣＫＥＲＳ⊷', ['sticker']],
      ['⦿ＩＡ⦿', ['ia', 'ai']],
      ['⇝ＭＯＴＩＶＡＣＩＯＮＡＬ⇜', ['motivacional']],
      ['◈ＩＮＦＯ◈', ['main']],
      ['⟡ＴＲＡＮＳＦＯＲＭＡＤＯＲ⟡', ['transformador']],
      ['✧ＦＵＮ✧', ['fun']]
    ];

    const sections = groups.map(([title, aliases]) => {
      const commands = help
        .filter(item => item.tags.some(tag => aliases.includes(tag)))
        .flatMap(item => item.help.map(cmd =>
          `┃ ➩ ${_p || '/'}${cmd}${item.limit ? ' ◜⭐◞' : ''}${item.premium ? ' ◜🪪◞' : ''}`
        ));

      if (!commands.length) return '';
      return `╭━━〔 ${title} ${getRandomEmoji()} 〕━━━⌬
${commands.join('\n')}
╰━━━━━━━━━━━━━━⌬`;
    }).filter(Boolean).join('\n');

    const menuText = `╭━〘 ${global.botname || 'BOT'} ☆ 〙━⌬
┃ ✎ Nombre: @${userId.split('@')[0]}
┃ ✎ Modo: ${mode}
┃ ✎ Usuarios: ${totalreg}
┃ ✎ Uptime: ${uptime}
┃ ✎ Comandos: ${totalCommands}
┃ ✎ Sub-Bots: ${users.length}
╰━━━━━━━━━━━━━━━━━━━━━⌬

${global.emoji || '🤖'} 𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒↷↷
${global.rmr || ''}
${sections}

╭━━〔 📢 CANAL OFICIAL 〕━━━⌬
╰━━━━━━━━━━━━━━━━━━━━⌬

⌬⌬➩ © Powered by ${global.dev || 'Emmanuel'} - ${global.botname || 'BOT'}`.trim();

    const contextInfo = {
      mentionedJid: [userId],
      isForwarded: true
    };

    const channel = global.channelRD || null;
    const channelId = channel?.id || global.ch?.ch1;
    const channelName = channel?.name || 'Canal oficial';

    if (channelId) {
      contextInfo.forwardedNewsletterMessageInfo = {
        newsletterJid: channelId,
        serverMessageId: '',
        newsletterName: channelName
      };
    }

    const channelUrl = channel?.url || 'https://whatsapp.com/channel/0029Vb9DAtxBlHphhwfBkM1i';

    await conn.sendMessage(m.chat, {
      text: menuText,
      contextInfo,
      interactiveButtons: [
        {
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: '📢 Canal Oficial',
            url: channelUrl,
            merchant_url: channelUrl
          })
        }
      ]
    }, { quoted: m });

  } catch (e) {
    console.error('Error en main-menu:', e);
    try {
      await m.reply('❎ Error al generar el menú: ' + (e?.message || e));
    } catch {}
  }
};

handler.help = ['menu', 'allmenu'];
handler.tags = ['main'];
handler.command = ['menu', 'allmenu', 'menú', 'help'];
handler.register = true;

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

function getRandomEmoji() {
  const emojis = ['👑', '🔥', '🌟', '⚡'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}
