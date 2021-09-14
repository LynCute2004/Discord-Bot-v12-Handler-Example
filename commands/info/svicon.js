const discord = require("discord.js")

module.exports = {
    config:{
  name: "servericon",
  aliases: ["sav", "guildavatar"],
  category: "Info",
  description: "Xem biểu tượng của máy chủ",
    },
  run: async (bot, message, args) => {
    
    let embed = new discord.MessageEmbed()
      embed.setTitle(`${message.guild.name}'s Icon`)
      embed.setDescription(`${message.guild.iconURL({ dynamic: true, size: 1024 })}`)
      embed.setImage(message.guild.iconURL({ dynamic: true, size: 1024 }))
      embed.setColor("WHITE")
      .setFooter(`Yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      message.channel.send(embed)
    
  }
}