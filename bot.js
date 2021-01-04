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
            roblox.setRank(process.env.GROUPID, id, Number(process.env.DETAINROLE))
            let iEmbed = new discord.MessageEmbed()
                .setTitle('Fail')
                .setColor('RED')
                .setDescription(`${user} was caught in ${blacklistedgroups} blacklisted groups and successfully detained.`)
                .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
            client.channels.cache.get(process.env.LOGCHANNEL).send(iEmbed)
        } else {
            message.reply(`${user} has been check and 0 blacklisted groups were found.`)
        }
    }
})

async function first() {
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
                roblox.setRank(process.env.GROUPID, immigrants[i].userId, Number(process.env.DETAINROLE))
                let iEmbed = new discord.MessageEmbed()
                    .setTitle('Fail')
                    .setColor('RED')
                    .setDescription(`${immigrants[i].username} was caught in ${blacklistedgroups} blacklisted groups and successfully detained.`)
                    .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${immigrants[i].userId}&width=420&height=420&format=png`)
                client.channels.cache.get(process.env.LOGCHANNEL).send(iEmbed)
            } else {
                roblox.setRank(process.env.GROUPID, immigrants[i].userId, Number(process.env.CITIZENROLE))
                let iEmbed = new discord.MessageEmbed()
                    .setTitle('Success')
                    .setColor('GREEN')
                    .setDescription(`${immigrants[i].username} was found in ${blacklistedgroups} blacklisted groups and successfully immigrated.`)
                    .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${immigrants[i].userId}&width=420&height=420&format=png`)
                client.channels.cache.get(process.env.LOGCHANNEL).send(iEmbed)
            }
        }
        setTimeout(() => {
            second()
        }, 5000);
    } else {
        setTimeout(() => {
            second()
        }, 5000);
    }
}
async function second() {
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
                roblox.setRank(process.env.GROUPID, immigrants[i].userId, Number(process.env.DETAINROLE))
                let iEmbed = new discord.MessageEmbed()
                    .setTitle('Fail')
                    .setColor('RED')
                    //${await roblox.getRole(55578748, 54612554).get('name')}
                    .setDescription(`${immigrants[i].username} was caught in ${blacklistedgroups} blacklisted groups and successfully detained.`)
                    .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${immigrants[i].userId}&width=420&height=420&format=png`)
                client.channels.cache.get(process.env.LOGCHANNEL).send(iEmbed)
            } else {
                roblox.setRank(process.env.GROUPID, immigrants[i].userId, Number(process.env.CITIZENROLE))
                let iEmbed = new discord.MessageEmbed()
                    .setTitle('Success')
                    .setColor('GREEN')
                    //${await roblox.getRole(55578748, 36810683).get('name')}
                    .setDescription(`${immigrants[i].username} was found in ${blacklistedgroups} blacklisted groups and successfully immigrated.`)
                    .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${immigrants[i].userId}&width=420&height=420&format=png`)
                client.channels.cache.get(process.env.LOGCHANNEL).send(iEmbed)
            }
        }
        setTimeout(() => {
            first()
        }, 5000);
    } else {
        setTimeout(() => {
            first()
        }, 5000);
    }
}

first()
