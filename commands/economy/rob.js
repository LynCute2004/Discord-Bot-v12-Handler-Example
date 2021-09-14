const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    config:{
    name: 'rob',
    description: "Lấy trộm tiền của người khác",
    usage: "[prefix]deposit <amount>",
    category: "Economy",
    },
    run: async (bot, message, args) => {
        let timeout = 7200000;
        let user = message.mentions.users.first()
        let cash = db.fetch(`money_${message.guild.id}_${message.author.id}`)

        let robbedCash = db.fetch(`robbedCash_${message.author.id}`)

        if(!user) {
            const robError = new MessageEmbed()
            .setDescription(`<:cross:879611212097290240> Vui lòng đề cập một người dùng mà bạn muốn lấy trộm tiền!`)
            .setColor("RED")

            return message.channel.send(robError)
        }
        if(message.author === user) {
            const embed2 = new MessageEmbed()
            .setDescription("<:cross:879611212097290240> Bạn không thể tự lấy tiền của chính mình!")
            .setColor("RED")

            return message.channel.send(embed2)
        }

        
        let memberCash = db.fetch(`money_${user.id}`)

        if(memberCash == null || 0) {
            robErr = new MessageEmbed()
            .setDescription(`<:cross:879611212097290240> ${user} không có tiền mặt.`)
            .setColor("RED")

            db.set(`robbedCash_${message.guild.id}_${message.author.id}`, Date.now())
            return message.channel.send(robErr)
            
            
        }


        if(robbedCash !== null && timeout - (Date.now() - robbedCash) > 0) {
            let time = ms(timeout - (Date.now() - robbedCash))

            const robEmbed = new MessageEmbed()
            .setDescription(`<:cross:879611212097290240> Bạn đã vừa ăn trộm. Dùng lại sau: **${time.hours}giờ , ${time.minutes}phút và ${time.seconds}giây**!`)
            .setColor("RED")

            return message.channel.send(robEmbed)
        }

        let amount = Math.floor(Math.random() * memberCash) + 1
        db.subtract(`money_${message.guild.id}_${user.id}`, amount)
        db.add(`money_${message.guild.id}_${message.author.id}`, amount)
        db.set(`robbedCash_${message.guild.id}_${message.author.id}`, Date.now())

        const robSuccess = new MessageEmbed()
        .setDescription(`<:tick:879611274428821555> Đã ăn trộm **S${amount}** thành công từ ${user}`)
        .setColor("WHITE")

        message.channel.send(robSuccess)


    }
}