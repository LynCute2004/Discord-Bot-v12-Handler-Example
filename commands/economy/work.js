const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const ms = require("parse-ms");
const Jwork = 
[
    "Bạn đã thu hoạch trái cây",
    "Bạn đã xây ngô",
    "Bạn đã trồng rau",
    "Bạn đã cày ruộng thuê", 
    "Bạn đã bán vịt", 
    "Bạn đã sửa ống nước", 
    "Bạn đã làm việc bán thời gian", 
    "Bạn đã giao Pizza", 
    "Bạn đã tái chế đồ vật", 
    "Bạn đã hoàn thành công việc ở xưởng", 
    "Bạn đã làm từ thiện", 
    "Bạn đã hoàn thành công việc dọn dẹp nhà", 
    "Bạn đã đổ rác", 
    "Bạn đã bán được 1 kg cá và trứng", 
    "Bạn đã cho gà ăn",
    "Bạn đã dọn chuồng gà", 
    "Bạn đã gánh lúa", 
    "Bạn đã tưới cây", 
  ]
const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];

module.exports = {
    config: {
        name: "work",
        aliases: ["wr"],
        category: "economy",
        description: "Làm cách công việc được giao đển kiếm tiền",
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {


        let user = message.author;
        let author = await db.fetch(`worked_${message.guild.id}_${user.id}`)
        let timeout = 4200000

        if(author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));
            const workEmbed = new MessageEmbed()
            .setDescription(`<:tick:879611274428821555> Bạn đã hoàn thành công việc đồng án của mình. \n <:cooldowncmd:884990928010502175> Hãy nghỉ ngơi và quay lại sau <:cooldowncmd:884990928010502175> : **${time.hours} giờ , ${time.minutes} phút và ${time.seconds} giây**!`)
            .setColor("WHITE")

            return message.channel.send(workEmbed)
        } else {
            let amount = Math.floor(Math.random() * 25) + 1
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`worked_${message.guild.id}_${user.id}`, Date.now())

            const workSuccess = new MessageEmbed()
            .setDescription(`${user}, <:tick:879611274428821555> ${JworkR} và nhận được tiền công là: **$${amount}** <:anana_money:885060454202900490>`)
            .setColor("WHITE")

            message.channel.send(workSuccess)
        }
    }
}