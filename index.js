const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Bot online. Please leave this tab open or put it into https://uptimerobot.com as an HTTP monitor.')
})

app.listen(port, () => {
  console.log(`Listening on https://localhost:${port}.`)
})

const roblox = require('noblox.js')
const discord = require('discord.js')
require('dotenv').config()
let enabled = true
const client = new discord.Client()
const prefix = process.env.PREFIX
const blacklisted = process.env.BLACKLISTED.split(",");
client.login(process.env.TOKEN)
roblox.setCookie(process.env.COOKIE)

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}.`)
    client.user.setActivity('over the border', { type: 'WATCHING' })
})

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === 'immigration') {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('you cannot use this command. Please assure you have the `Administrator` permission on one of your roles and try again.')
        let mode = args[0]
        if (mode == 'on' || mode == 'true' || mode == 'enable') {
            enabled = true
            message.reply('opened the borders.')
        }
        if (mode == 'off' || mode == 'false' || mode == 'disable') {
            enabled = false
            message.reply('closed the borders.')
        }
    }
    if (command === 'check') {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('you cannot use this command. Please assure you have the `Administrator` permission on one of your roles and try again.')
        let user = args[0]
        let id = await roblox.getIdFromUsername(user)
        let realname = await roblox.getUsernameFromId(id)
        let failedcheck = false
        let blacklistedgroups = 0
        const userGroups = await roblox.getGroups(id)
        for (f = 0; f < userGroups.length; f++) {
            for (l = 0; l < blacklisted.length; l++) {
                if (blacklisted[l] == userGroups[f].Id) {
                    failedcheck = true
                    blacklistedgroups += 1
                }
            }
        }
        if (failedcheck == true) {
            await roblox.setRank(process.env.GROUPID, id, Number(process.env.DETAINROLE))
            let iEmbed = new discord.MessageEmbed()
                .setTitle('Fail')
                .setColor('RED')
                .setDescription(`${realname} was caught in ${blacklistedgroups} blacklisted groups and successfully detained.`)
                .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
            client.channels.cache.get(process.env.LOGCHANNEL).send(iEmbed)
        } else {
            message.reply(`${realname} has been checked and 0 blacklisted groups were found.`)
        }
    }
})

setInterval(async () => {
    if (enabled == true) {
        let failedcheck = false
        let blacklistedgroups = 0
        const immigrants = await roblox.getPlayers(process.env.GROUPID, process.env.IMMIGRATIONRANK)
        for (i = 0; i < immigrants.length; i++) {
            const userGroups = await roblox.getGroups(immigrants[i].userId)
            for (f = 0; f < userGroups.length; f++) {
                for (l = 0; l < blacklisted.length; l++) {
                    if (blacklisted[l] == userGroups[f].Id) {
                        failedcheck = true
                        blacklistedgroups += 1
                    }
                }
            }
            if (failedcheck == true) {
                await roblox.setRank(process.env.GROUPID, immigrants[i].userId, Number(process.env.DETAINROLE))
                let iEmbed = new discord.MessageEmbed()
                    .setTitle('Fail')
                    .setColor('RED')
                    .setDescription(`${immigrants[i].username} was caught in ${blacklistedgroups} blacklisted groups and successfully detained.`)
                    .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${immigrants[i].userId}&width=420&height=420&format=png`)
                client.channels.cache.get(process.env.LOGCHANNEL).send(iEmbed)
            } else {
                await roblox.setRank(process.env.GROUPID, immigrants[i].userId, Number(process.env.CITIZENROLE))
                let iEmbed = new discord.MessageEmbed()
                    .setTitle('Success')
                    .setColor('GREEN')
                    .setDescription(`${immigrants[i].username} was found in ${blacklistedgroups} blacklisted groups and successfully immigrated.`)
                    .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${immigrants[i].userId}&width=420&height=420&format=png`)
                client.channels.cache.get(process.env.LOGCHANNEL).send(iEmbed)
            }
        }
    }
}, 1000);
