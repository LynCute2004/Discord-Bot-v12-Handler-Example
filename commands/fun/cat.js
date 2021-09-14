const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const HuyAPI = require("huyapi")
const image = new HuyAPI
module.exports = {
  config:{
  name: "cat",
  description: "Xem ảnh loài mèo",
  usage: "[prefix]cat",
  category: "Fun",
  },
  run: async (bot, message, args) => {
      // create button
      let catbutton1 = new MessageButton()
        .setStyle('green')
        .setLabel('Refrsh')
        .setID('cat_id')
      const anh_cat_dau_tien = await image.get.cat()
      const mainembed = new MessageEmbed()
        .setImage(anh_cat_dau_tien.url)
        .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(`WHITE`);
      //multiple buttons combine
      let row = new MessageActionRow()
        .addComponents(catbutton1);
      //send main embed message + buttons
      let mybuttonsmsg = await message.channel.send(mainembed, row)
  }
}