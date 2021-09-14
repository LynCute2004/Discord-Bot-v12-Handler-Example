const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const HuyAPI = require("huyapi")
const image = new HuyAPI
module.exports = {
  config:{
  name: "meme",
  description: "Xem ảnh meme",
  usage: "[prefix]meme",
  category: "Fun",
  },
  run: async (bot, message, args) => {
      // create button
      let memebutton1 = new MessageButton()
        .setStyle('green')
        .setLabel('Refrsh')
        .setID('meme_id')
      const anh_meme_dau_tien = await image.get.meme()
      const mainembed = new MessageEmbed()
        .setImage(anh_meme_dau_tien.url)
        .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(`WHITE`);
      //multiple buttons combine
      let row = new MessageActionRow()
        .addComponents(memebutton1);
      //send main embed message + buttons
      let mybuttonsmsg = await message.channel.send(mainembed, row)
  }
}