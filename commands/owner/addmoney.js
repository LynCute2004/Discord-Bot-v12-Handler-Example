const Discord = require("discord.js");
const client = new Discord.Client();
const db = require('quick.db');
const {MessageEmbed} = require("discord.js");
module.exports = {
    config:{
    name: "addmoney",
    aliases: ["am"],
    description: "Đưa bot rời khỏi máy chủ",
    usage: " ",
    category:"Owner",
    ownerOnly: true,
    hidden: true,
    },
  run: async (bot, message, args) => {
    const ownerID = [
        "573805531773272064",
      ];
    if (!ownerID.includes(message.author.id)) return;

    let user = message.mentions.members.first() || message.author;
  
      if (isNaN(args[1])) return;
      db.add(`money_${user.id}`, args[1])
      let bal = await db.fetch(`money_${user.id}`) 
      message.channel.send(`<:tick:879611274428821555> Đã thêm **$${args[1]}** <:anana_money:885060454202900490> cho **${user}**.\n> Số tiền hiện tại là: **$${bal}** <:anana_money:885060454202900490>      `)
  
  }
}