const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
  config: {
    name: 'fish',
    description: "Câu cá để kiếm tiền thưởng",
    usage: "[prefix]deposit <amount>",
    category: "Economy",
    aliases: ['f']
  },
  run: async (bot, message, args) => {
    let user = message.mentions.users.first() || message.author
    let author = await db.fetch(`fish_${message.guild.id}_${user.id}`)
    let timeout = 20000;
    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));
      message.channel.send(`🎣**${message.author.username}**, Bạn đã vừa câu cá. <:cooldowncmd:884990928010502175> Vui lòng chờ sau: **${time.minutes} phút, ${time.seconds} giây** để tiếp tục!.`)

    } else {

      let fish = [
        "🐠 **Cá nhiệt đới**",
        "🐟 **Cá thường**",
        "🐡 **Cá nóc**",
        "🐬 **Cá heo**",
        "🦐 **Tôm**",
        "🦈 **Cá mập**",
        "🦀 **Cua biển**",
        "🐙 **Bạch tuộc**",
        "🦑 **Mực**",
        "🐋 **Cá voi**",
        "🦪 **Con hàu**",
        "🦞 **Tôm hùm**",
        "🐚 **Vỏ ốc** "

      ]
      let fishresult = Math.floor((Math.random() * fish.length));
      let amount = Math.floor(Math.random() * 100) + 1;
      if (!args[0]) {
        const msg = await message.channel.send(`${message.author.username} đang câu cá...`);
			msg.edit(`🎣**${message.author.username}** đã câu được ${fish[fishresult]} và nhận được **$${amount}** <:anana_money:885060454202900490>`)

        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.add(`fish_${message.guild.id}_${user.id}`, Date.now())

      }
    }
  }
}
