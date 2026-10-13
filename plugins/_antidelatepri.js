import {
  getContentType,
  generateForwardMessageContent,
  generateWAMessageFromContent
} from '@whiskeysockets/baileys';

// Caché independiente del antidelate de grupos.
// Solo conserva mensajes privados recibidos por esta conexión.
const PRIVATE_DELETE_TTL = 24 * 60 * 60 * 1000;
const PRIVATE_DELETE_LIMIT = 1000;

function getPrivateCache(conn) {
  if (!conn.privateDeleteCache) conn.privateDeleteCache = new Map();
  return conn.privateDeleteCache;
}

export async function before(m, { conn }) {
  if (!m?.key || m.key.fromMe || !m.chat || m.isGroup) return;
  if (m.chat === 'status@broadcast' || !m.message) return;

  const cache = getPrivateCache(conn);
  const now = Date.now();

  // Limpieza de mensajes caducados.
  for (const [cacheKey, item] of cache) {
    if (now - item.savedAt > PRIVATE_DELETE_TTL) cache.delete(cacheKey);
  }

  const protocol = m.message?.protocolMessage;
  if (protocol?.key?.id) {
    const deletedId = protocol.key.id;
    const deletedChat = protocol.key.remoteJid || m.chat;

    let foundKey;
    let original;

    for (const [cacheKey, item] of cache) {
      if (item.key.id !== deletedId) continue;
      if (item.chat !== m.chat && item.chat !== deletedChat) continue;
      foundKey = cacheKey;
      original = item;
      break;
    }

    if (!original) return;

    cache.delete(foundKey);

    try {
      await conn.sendMessage(m.chat, {
        text: '🗑️ Se eliminó un mensaje. Contenido recuperado:'
      });

      const forwardContent = await generateForwardMessageContent(
        { key: original.key, message: original.message },
        { forwardingScore: 1 }
      );

      const forwardType = getContentType(forwardContent);
      if (!forwardType) return;

      forwardContent[forwardType].contextInfo = {
        ...(forwardContent[forwardType].contextInfo || {}),
        isForwarded: true
      };

      const restored = generateWAMessageFromContent(m.chat, forwardContent, {
        userJid: conn.user.id
      });

      await conn.relayMessage(m.chat, restored.message, {
        messageId: restored.key.id
      });
    } catch (error) {
      console.error('[ANTIDELATEPRI] No se pudo recuperar el mensaje:', error);
    }

    return;
  }

  // No almacenar avisos de protocolo ni mensajes sin ID.
  if (m.message.protocolMessage || !m.key.id) return;

  const cacheKey = `${m.chat}:${m.key.id}`;
  cache.set(cacheKey, {
    key: m.key,
    message: m.message,
    chat: m.chat,
    savedAt: now
  });

  // Limitar memoria para evitar crecimiento indefinido.
  while (cache.size > PRIVATE_DELETE_LIMIT) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey === undefined) break;
    cache.delete(oldestKey);
  }
}
