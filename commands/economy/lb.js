const db = require('quick.db');
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");

module.exports = {
    config:{
    name: 'daily',
    description: "Cung cấp cho bạn tiền thưởng hàng ngày",
    usage: "[prefix]daily",
    category: "Economy",
    },
    run: async(bot, message, args) => {
      let money = db.all().filter(data => data.ID.startsWith(`money`)).sort((a, b) => b.data - a.data)
    money.length = 10;
    var finalLb = "";
    var i = 0;
    let indexnum = 0;
    for (i in money) {
      finalLb += `**${++indexnum}. <@${bot.users.get(money[i].ID.split('_')[1]).id}>** - ${money[i].data} :dollar:\n`;
    }

    
    const embed = new MessageEmbed()
    .setAuthor(`Leaderboard!`, message.guild.iconURL())
    .setColor(`WHITE`)
    .setDescription(finalLb)
    .setFooter(bot.user.tag, bot.user.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed)
}
}