const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const HuyAPI = require("huyapi")
const image = new HuyAPI
module.exports = {
  config:{
  name: "dog",
  description: "Xem ảnh loài chó",
  usage: "[prefix]dog",
  category: "Fun",
  },
  run: async (bot, message, args) => {
      // create button
      let dogbutton1 = new MessageButton()
        .setStyle('green')
        .setLabel('Refrsh')
        .setID('dog_id')
      const anh_dog_dau_tien = await image.get.dog()
      const mainembed = new MessageEmbed()
        .setImage(anh_dog_dau_tien.url)
        .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(`WHITE`);
      //multiple buttons combine
      let row = new MessageActionRow()
        .addComponents(dogbutton1);
      //send main embed message + buttons
      let mybuttonsmsg = await message.channel.send(mainembed, row)
  }
}