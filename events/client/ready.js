const { PREFIX } = require('../../config');
const { MessageEmbed } = require("discord.js")

module.exports = async bot => {
    console.log(`${bot.user.username} is available now!`)
    var activities = [ `${bot.guilds.cache.size} servers!`, `${bot.users.cache.size} users!`, `${PREFIX}help để nhận lệnh!` ], i = 0;
    setInterval(() => bot.user.setActivity(`${activities[i++ % activities.length]}`, { type: "LISTENING" }),5000)
    
};
