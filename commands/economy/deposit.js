const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    config:{
    name: 'deposit',
    description: "Đặt cọc tiền",
    usage: "[prefix]deposit <amount>",
    aliases: ['dep'],
    category: "Economy",
    },
    run: async (bot, message, args) => {
        
        let user = message.author;


        let all = db.fetch(`money_${message.guild.id}_${user.id}`)

        if(args[0] === "all") args[0] = all


        if (!args[0]) {
            const depositError = new MessageEmbed()
                .setTitle("<:cross:879611212097290240> Bạn cần nhập một số tiền hợp lệ để cất đi!")
                .setColor("RED")
                .setDescription("Bạn có thể thực hiện \"deposit all\" để cất tất cả tiền mặt của bạn vào túi cùng một lúc\nNếu đã cất tiền thì không cần dùng lại lệnh này!")

            return message.channel.send(depositError)
        }

        if (isNaN(args[0])) {
            const depositError2 = new MessageEmbed()
                .setDescription("<:cross:879611212097290240> Đó không phải là số tiền hợp lệ!")
                .setColor("RED")

            return message.channel.send(depositError2)
        }

        if (args[0] > all) {
            const depositError3 = new MessageEmbed()
                .setDescription("<:cross:879611212097290240> Bạn không có đủ tiền hiện tại để cất!")
                .setColor("RED")

            return message.channel.send(depositError3)
        }


        


        
        db.subtract(`money_${message.guild.id}_${user.id}`, args[0])
        db.add(`bank_${message.guild.id}_${user.id}`, args[0])
        let bankbal = db.fetch(`bank_${message.guild.id}_${user.id}`)

        let depositSuccess = new MessageEmbed()
            .setDescription(`<:tick:879611274428821555> Đã cất **$${args[0]}** <:anana_money:885060454202900490> vào túi của bạn! \n <a:arrowright1:885435801947742238> Số tiền tiết kiệm của bạn bây giờ là: **$${bankbal}** <:anana_money:885060454202900490>`)
            .setColor("WHITE")
            
        message.channel.send(depositSuccess)






    }
}