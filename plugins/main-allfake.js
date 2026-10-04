import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

global.getBuffer = async function getBuffer(url, options) {
try {
options ? options : {}
var res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'User-Agent': 'GoogleBot',
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (e) {
console.log(`Error : ${e}`)
}}

//creador y otros
global.ofcbot = `${conn.user.jid.split('@')[0]}`
global.listo = ' *Aquí tienes, shinobi ❛‿˂̵✧*'
global.fotoperfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/nv87us.jpg')


//fechas
global.d = new Date(new Date + 3600000)
global.locale = 'es'
global.dia = d.toLocaleDateString(locale, {weekday: 'long'})
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'})
global.mes = d.toLocaleDateString('es', {month: 'long'})
global.año = d.toLocaleDateString('es', {year: 'numeric'})
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})

//Reacciones De Comandos.!
global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'
global.msm = '⚠︎'


global.emoji0 = '🤖⚡'
global.emoji1 = '⚙️🔥'
global.emoji2 = '🛡️✨'
global.emoji3 = '🚀⭐'
global.emoji4 = '📡⚡'
global.emoji5 = '🧠💡'
global.emoji6 = '🔧🛠️'
global.emoji7 = '📦📲'
global.emoji8 = '🌐⚙️'
global.emoji9 = '👑🔥'

global.emojis = [emoji0, emoji1, emoji2, emoji3, emoji4, emoji5, emoji6, emoji7, emoji8, emoji9].getRandom()
global.emoji = [emoji0, emoji1, emoji2, emoji3, emoji4, emoji5, emoji6, emoji7, emoji8, emoji9].getRandom()

//mensaje en espera
global.wait = '✪ Espera un momento, soy lento...';

//Enlaces
var canal = 'https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m'  
let canal2 = 'https://whatsapp.com/channel/0029VayQwPsFnSzESZJ9Us3z'
var git = 'https://github.com/BrayanOFC-Li'
var github = 'https://github.com/alejandroperez242425-maker/Kirito-bot-MD' 
let correo = 'bot@gmail.com'

global.redes = [canal, canal2, git, github, correo].getRandom()

global.canalIdM = ["120363431701840368@newsletter", "120363431701840368@newsletter"]
global.canalNombreM = ["🎄𝐊𝐢𝐫𝐢𝐭𝐨-𝐁𝐨𝐭 𝐌𝐃 ✦ ᴜɴᴇᴛᴇ ᴀʟ ᴄᴀɴᴀʟ ⛄.", "🦌𝕂𝕚𝕣𝕚𝕥𝕠-𝔹𝕠𝕥 𝕄𝔻 - 𝚞𝚗𝚎𝚝𝚎 𝚊𝚕 𝚌𝚊𝚗𝚊𝚕.⛄"]
global.channelRD = await getRandomChannel()

//• ↳ ◜𝑻𝑰𝑬𝑴𝑷𝑶 𝑹𝑷𝑮◞ • ⚔
var ase = new Date(); var hour = ase.getHours(); switch(hour){ case 0: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 1: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 2: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 3: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 4: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 5: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 6: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 7: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌅'; break; case 8: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 9: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 10: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 11: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 12: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 13: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 14: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 15: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 16: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 17: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 18: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 19: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 20: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 21: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 22: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 23: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;}
global.saludo = hour;

/*const imgs = [
  'https://Kirito.my/media/images/6.png',
  'https://Kirito.my/media/images/7.png',
  'https://Kirito.my/media/images/8.png',
  'https://Kirito.my/media/images/9.png',
  'https://Kirito.my/media/images/10.png',
  'https://Kirito.my/media/images/11.png',
  'https://Kirito.my/media/images/12.png',
  'https://Kirito.my/media/images/13.png'
];*/

const imgs = [inc, inc, inc, inc, inc]

global.img = imgs[Math.floor(Math.random() * imgs.length)];


//tags
global.nombre = m.pushName || 'Anónimo'
global.taguser = '@' + m.sender.split("@s.whatsapp.net")
var more = String.fromCharCode(8206)
global.rmr = more.repeat(850)

/*global.icono = [
'https://Kirito.my/media/images/1.jpg',
'https://Kirito.my/media/images/2.jpg',
'https://Kirito.my/media/images/3.jpg',
'https://Kirito.my/media/images/4.jpg',
'https://Kirito.my/media/images/5.jpg'
].getRandom()*/

global.icono = inc

global.packsticker = `┏━──────━◆◆━──────━┓\n✰ Usuario: ${nombre}\n⚔✰ Bot: ${botname}\n✰ Fecha: ${fecha}\n✰ Hora: ${tiempo}\n┗━──────━◆◆━──────━┛`;
global.packsticker2 = `\n┏━──────━◆◆━──────━┓\n👑 Desarrollador: ${dev}\n┗━──────━◆◆━──────━┛`;


    const res = await fetch(inc);
    const thumb2 = Buffer.from(await res.arrayBuffer());
    const userJid = m.sender

    global.fkontak1 = {
      key: { participants: userJid, remoteJid: "status@broadcast", fromMe: false, id: "Halo" },
      message: {
        locationMessage: {
          name: `ACCESO DENEGADO`,
          jpegThumbnail: thumb2
        }
      },
      participant: userJid
    };

const res2 = await fetch(icono);
    const thumb3 = Buffer.from(await res2.arrayBuffer());

    global.m1 = {
      key: { participants: userJid, remoteJid: "status@broadcast", fromMe: false, id: "Halo" },
      message: {
        locationMessage: {
          name: botname,
          jpegThumbnail: thumb3
        }
      },
      participant: userJid
    };

  
global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1 }
}}, { quoted: m }



global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: '', newsletterName: channelRD.name }, externalAdReply: { title: botname, mediaUrl: null, description: null, previewType: "PHOTO", thumbnail: await (await fetch(icono)).buffer(), /*sourceUrl: redes,*/ mediaType: 1, renderLargerThumbnail: false }, mentionedJid: null }}

global.rcanal1 = { contextInfo: { isForwarded: true, /*forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: '', newsletterName: channelRD.name },*/ externalAdReply: { title: botname, body: dev, mediaUrl: null, description: null, previewType: "PHOTO", thumbnail: await (await fetch(icono)).buffer(), /*sourceUrl: redes,*/ mediaType: 1, renderLargerThumbnail: false }, mentionedJid: null }}
}

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
  }

async function getRandomChannel() {
let randomIndex = Math.floor(Math.random() * canalIdM.length)
let id = canalIdM[randomIndex]
let name = canalNombreM[randomIndex]
return { id, name }
}
