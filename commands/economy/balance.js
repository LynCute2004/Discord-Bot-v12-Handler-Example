const { MessageEmbed, Message } = require("discord.js");
const db = require('quick.db');

module.exports = {
    config:{
    name: 'balance',
    description: "Check balance của bạn / ai đó trong máy chủ",
    usage: "[prefix]balance",
    aliases: ['bal','cash'],
    category: "Economy",
    },
    run: async(bot, message, args) => {

        let user = message.mentions.members.first() || message.author;
        let bal = await db.get(`money_${message.guild.id}_${user.id}`)
        let bankbal = await db.get(`bank_${message.guild.id}_${user.id}`)
  if (bal === null) bal = 0;
  if (bankbal === null) bankbal = 0;
  const embed = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
  .setTitle(`<:flourbag:885319054452199424> ${user.username}'s Balance`)
  .setDescription(`<a:arrowright1:885435801947742238> Số tiền hiện tại của bạn là: **$${bal}** <:anana_money:885060454202900490>\n <a:arrowright1:885435801947742238> Số tiền trong túi của bạn: **$${bankbal}** <:anana_money:885060454202900490>`)
  .setColor(`WHITE`)
  .setTimestamp()
  message.channel.send(embed)
      }
    }      