const { MessageEmbed } = require('discord.js')
const math = require('mathjs')

module.exports = {
    config:{
    name: 'calculator',
    description: "Giải phép tính toán học của bạn",
    usage: "[prefix]calculator [question]\nDấu phép tính có sẵn:[+] (cộng), [-] (trừ), [.] (nhân), [/] (chia)",
    aliases: ['calc', 'calculator'],
    category: "Utility",
    example: "[prefix]calculator 1+1"
    },
    run: async(bot, message, args) => {

        if(!args[0]) {
            const calculatorError = new MessageEmbed()
            .setDescription(`<:cross:879611212097290240> Vui lòng đưa ra một câu hỏi về toán học`)
            .setColor('RED')

            return message.channel.send(calculatorError)
        }

        let result;

        try {
            result = math.evaluate(args.join(" ").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/"))
        } catch (error) {
            const cError = new MessageEmbed()
            .setDescription(`<:cross:879611212097290240> Phép tính không hợp lệ`)
            .setColor('RED')
            return message.channel.send(cError)
        }

        message.channel.send(`<a:anna_working:886609950070173738> ${args.join("").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/")} = ${result}`)
    }
}