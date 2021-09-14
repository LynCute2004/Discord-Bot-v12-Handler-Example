const db = require("quick.db");
const Discord = require ("discord.js")
const { version } = require('../../package.json');
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');
const { PREFIX } = require("../../config");
module.exports = {
config:{
  name: "botinfo",

  category: "misc",
    aliases: ['uptime', 'botstats', 'stats'],
    description: 'Check\'s bot\'s status',
},
  run: async (bot, message, args, member) => {
      message.channel.send(new Discord.MessageEmbed()
            .setColor('WHITE')
            .setTitle(`${bot.user.username}'s Information`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`<:owner:879574141039177798> **Owner bot:** <@573805531773272064> \nPrefix: **${PREFIX}**`)
            .addField('Ngày tạo bot:', "__Thứ 7, Ngày 17 Tháng 10 Năm 2020__")
            .addField('Tổng số lệnh:', `${bot.commands.size} cmds`,true)
            .addField('Tổng số servers', `${bot.guilds.cache.size} guilds`, true)
            .addField(`Tổng số users:`, `${bot.users.cache.size} users`, true)
            .addField('Uptime:', `${ms(bot.uptime)}`, true)
            .addField('Độ trễ WebSocket:', `${bot.ws.ping}ms`, true)
            .addField('Bộ nhớ:', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`, true)
            .addField(`<:pinkstar:879697513861500928> Links:`,`Invite bot: [Here!](https://discord.com/api/oauth2/authorize?client_id=766853625967935508&permissions=261993005047&scope=bot)\n Support server: [Join!](https://discord.gg/ymZePxZAYY)`)
            .setTimestamp()
            .setFooter(`Yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
        );
    }
}