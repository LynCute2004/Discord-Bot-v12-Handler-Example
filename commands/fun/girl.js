const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const HuyAPI = require("huyapi")
const image = new HuyAPI
module.exports = {
  config:{
  name: "girl",
  description: "Xem ảnh gái",
  usage: "[prefix]girl",
  category: "Fun",
  },
  run: async (bot, message, args) => {
      // create button
      let girlbutton1 = new MessageButton()
        .setStyle('green')
        .setLabel('Refrsh')
        .setID('girl_id')
      const anh_girl_dau_tien = await image.get.girl()
      const mainembed = new MessageEmbed()
        .setImage(anh_girl_dau_tien.url)
        .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(`WHITE`);
      //multiple buttons combine
      let row = new MessageActionRow()
        .addComponents(girlbutton1);
      //send main embed message + buttons
      let mybuttonsmsg = await message.channel.send(mainembed, row)
  }
}