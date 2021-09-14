const Discord = require('discord.js');
const client = new Discord.Client();
const { parse } = require("twemoji-parser");
const embed = new Discord.MessageEmbed()
module.exports = {
    config:{
    name: 'enlarged-emoji',
    description: 'Xem emoji phiên bản phóng to',
    category: "Utility",
    usage:"[prefix] <emoji>",
    aliases: ['eemoji'],
    },
    run: async (bot, message, args) => {
        const emoji = args[0];
if (!emoji) return message.channel.send("No emoji provided!");

let custom = Discord.Util.parseEmoji(emoji);

if (custom.id) {
   const embed = new Discord.MessageEmbed()
      .setTitle(`Enlarged version of ${emoji}`)
      .setColor("#34fffa")
      .setTimestamp()
      .setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
   return message.channel.send(embed);
} else {
   let parsed = parse(emoji, { assetType: "png" });
   if (!parsed[0]) return message.channel.send("<:cross:879611212097290240> Emoji không hợp lệ!")
   const embed = new Discord.MessageEmbed()
      .setTitle(`Enlarged version of ${emoji}`)
      .setColor("#34fffa")
      .setImage(parsed[0].url);
   return message.channel.send(embed);
}
    }
}