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
        let timeout = 86400000;
        let amount = 100;
        let user = message.author

        let daily =  await db.fetch(`daily_${message.guild.id}_${user.id}`)
        if(daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily))

            return message.channel.send(`<:tick:879611274428821555> Bạn đã nhận phần thưởng hàng ngày, \n <:cooldowncmd:884990928010502175> Hãy quay lại sau:  **${time.hours} giờ, ${time.minutes} phút và ${time.seconds} giây**!`)
        } else {
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now())

            const dailySuccess = new MessageEmbed()
            message.channel.send(`<:tick:879611274428821555> Bạn đã nhận được tiền thưởng hàng ngày là: **$${amount}** <:anana_money:885060454202900490>`)
        }
    }
}
