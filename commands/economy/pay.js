const db = require('quick.db');
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");

module.exports = {
    config:{
    name: 'pay',
    description: "Chuyển tiền cho người dùng khác",
    usage: "[prefix]pay <amount>",
    aliases: ['give','send'],
    category: "Economy",
    },
    run: async(bot, message, args) => {
        let user = message.mentions.members.first() || message.author;

        let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)
      
        if (!user) {
            return message.channel.send(`<:cross:879611212097290240> Vui lòng đề cập một người dùng để chuyển tiền.`)
        }
        
        if (!args[1]) {
            return message.channel.send(`<:cross:879611212097290240> Vui lòng cung cấp số tiền để chuyển.`)
        }
        if (member < args[1]) {
            return message.channel.send(`<:cross:879611212097290240> Bạn hiện không có đủ số tiền cần chuyển.`)
        }
      
        message.channel.send(`<:tick:879611274428821555> Bạn đã chuyển thành công **$${args[1]}** <:anana_money:885060454202900490> cho **${user}**`)
        db.add(`money_${message.guild.id}_${user.id}`, args[1])
        db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])
      
      }
    }      