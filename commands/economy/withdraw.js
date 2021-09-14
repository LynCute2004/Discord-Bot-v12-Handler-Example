const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    config:{
    name: 'withdraw',
    description: "Lấy tiền trong túi",
    usage: "[prefix]deposit <amount>",
    aliases: ['with'],
    category: "Economy",
    },
    run: async (bot, message, args) => {
        
        let user = message.author;

        let bankbal = db.fetch(`bank_${message.guild.id}_${user.id}`)

        let all = db.fetch(`bank_${message.guild.id}_${user.id}`)

        if(args[0] === "all") args[0] = all
        if (!args[0]) {
            const withdrawError = new MessageEmbed()
                .setDescription("<:cross:879611212097290240> Bạn cần nhập một số tiền hợp lệ để lấy ra!")
                .setColor("RED")

            return message.channel.send(withdrawError)
        }
        if (isNaN(args[0])) {
            const withdrawError2 = new MessageEmbed()
                .setDescription("<:cross:879611212097290240> Bạn cần nhập một số tiền hợp lệ có trong túi để lấy ra!")
                .setColor("RED")

            return message.channel.send(withdrawError2)
        }
        if(args[0] > bankbal) {
            const withdrawError3 = new MessageEmbed()
                .setDescription("<:cross:879611212097290240> Số tiền bạn đưa ra quá lớn so với số tiền bạn có trong túi!")
                .setColor("RED")

            return message.channel.send(withdrawError3)
        }
        if(args[0] > all) {
            const withdrawError4 = new MessageEmbed()
                .setDescription("<:cross:879611212097290240> Số tiền bạn có quá nhỏ!")
                .setColor("RED")

            return message.channel.send(withdrawError4)
        }

        db.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
        db.add(`money_${message.guild.id}_${user.id}`, args[0])
        let cashBalance = db.fetch(`bank_${message.guild.id}_${user.id}`)

        let depositSuccess = new MessageEmbed()
            .setDescription(`<:tick:879611274428821555> Đã lấy ra **$${args[0]}** trong túi của bạn! \n <a:arrowright1:885435801947742238> Số tiền tiết kiệm của bạn bây giờ là: **$${cashBalance}** <:anana_money:885060454202900490>`)
            .setColor("WHITE")

        message.channel.send(depositSuccess)






    }
}