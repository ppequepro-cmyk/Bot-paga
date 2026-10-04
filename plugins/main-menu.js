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


⌬⌬➩ © Powered by ${global.dev || 'Emmanuel'} - ${global.botname || 'BOT'}`.trim();

    const channel = global.channelRD || null;
    let channelId = channel?.id || global.ch?.ch1;
    let channelName = channel?.name || 'Canal oficial';

    // WhatsApp puede rechazar el botón nativo si el JID del canal configurado
    // quedó desactualizado. Resolvemos el enlace oficial directamente contra
    // la metadata de WhatsApp y usamos el JID real que devuelva el servidor.
    if (channel?.url && typeof conn.newsletterMetadata === 'function') {
      try {
        const inviteCode = channel.url.split('/channel/')[1]?.split(/[?#/]/)[0];
        if (inviteCode) {
          const metadata = await conn.newsletterMetadata('invite', inviteCode);
          if (metadata?.id) channelId = metadata.id;
          if (typeof metadata?.name === 'string' && metadata.name.trim()) channelName = metadata.name;
        }
      } catch (e) {
        console.error('No se pudo resolver el canal oficial:', e?.message || e);
      }
    }

    const contextInfo = {
      mentionedJid: [userId],
      isForwarded: true,
      forwardingScore: 1
    };

    if (channelId) {
      contextInfo.forwardedNewsletterMessageInfo = {
        newsletterJid: channelId,
        serverMessageId: -1,
        newsletterName: channelName
      };
    }


    await conn.sendMessage(m.chat, {
      text: menuText,
      contextInfo
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
