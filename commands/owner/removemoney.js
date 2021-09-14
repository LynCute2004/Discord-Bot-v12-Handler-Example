const Discord = require("discord.js");
const client = new Discord.Client();
const db = require('quick.db');
const {MessageEmbed} = require("discord.js");
module.exports = {
    config:{
    name: "removemoney",
    aliases: ["rm"],
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
    db.subtract(`money_${user.id}`, args[1])
    let bal = await db.fetch(`money_${user.id}`)

  message.channel.send(`Taken \`${args[1]}\` credits from **${user}**'s balance.\n> Current balance: \`${bal}\` credits.`)

}
}