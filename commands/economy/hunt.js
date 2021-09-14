const db = require('quick.db');
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");

module.exports = {
    config:{
    name: 'hunt',
    description: "Bắt thú để kiếm tiền thưởng",
    usage: "[prefix]daily",    
    aliases: ['h'],
    category: "Economy",
    },
    run: async(bot, message, args) => {
    let user = message.mentions.users.first() || message.author
    let author = await db.fetch(`hunt_${message.guild.id}_${user.id}`)

    let timeout = 20000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));

        message.channel.send(`🏹**${message.author.username}**, Bạn đã vừa bắt thú. <:cooldowncmd:884990928010502175> Vui lòng chờ sau: **${time.minutes} phút, ${time.seconds} giây**!`)
      } else {

    let hunt = [
        "🐰 **Thỏ**",
        "🐸 **Ếch**",
        "🐒 **Khỉ**",
        "🐔 **Gà**",
        "🐤 **Gà con**",
        "🐺 **Sói**",
        "🐓 **Gà trống**",
        "🦃 **Gà tây**", 
        "🐿 **Sóc**",
        "🐃 **Trâu nước**",
        "🐂 **Bò**",
        "🐎 **Ngựa**",
        "🐖 **Heo**",
        "🐍 **Rắn**",
        "🐄 **Bò sữa**",
        "🐗 **Heo rừng**",
        "🐪 **Lạc đà**",
        "🐏 **Cừu trắng**",
        "🦓 **Ngựa vằn**",
        "🐐 **Dê trắng**",
        "🦒 **Hưu cao cổ**",
        "🦘 **Chuột túi**",
        "🐘 **Voi**",
        "🐼 **Gấu trúc**",
        "🐨 **Gấu túi**",
        "🐱 **Mèo**",
        "🐶 **Chó**",
        "🦝 **Gấu túi**",
        "🐯 **Sư tử**"
    ]

    const huntresult = Math.floor((Math.random() * hunt.length));
    let amount = Math.floor(Math.random() * 100) + 1;
    const msg = await message.channel.send(`${message.author.username} đang bắt thú...`);
    msg.edit(`🏹**${message.author.username}** bạn đã bắt được ${hunt[huntresult]} và nhận được **$${amount}** <:anana_money:885060454202900490>`)

    db.add(`money_${message.guild.id}_${user.id}`, amount)
    db.set(`hunt_${message.guild.id}_${user.id}`, Date.now())

    };
}
}

