import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 


global.owner = [
  [ '13202109768', 'emmanuel', true ]
]; 

global.suittag = ['13202109768'] 
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.Jadibts = true
global.packname = 'ONYX-BOT';
global.botname = 'ONYX-BOT';
global.author = 'Made by Emmanuel';
global.dev = '© Powered by Emmanuel';
global.textbot = 'ONYX-BOT • Emmanuel';
global.etiqueta = 'Emmanuel';
global.ch = {
ch1: '120363431701840368@newsletter',
ch2: '120363431701840368@newsletter',
}
global.channelRD = {
  id: '120363431701840368@newsletter',
  name: 'Canal oficial',
  url: 'https://whatsapp.com/channel/0029Vb9DAtxBlHphhwfBkM1i'
}
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.kirito = ''
global.moment = moment   


async function getRandomChannel() {
let randomIndex = Math.floor(Math.random() * canalIdM.length)
let id = canalIdM[randomIndex]
let name = canalNombreM[randomIndex]
return { id, name }
}


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
