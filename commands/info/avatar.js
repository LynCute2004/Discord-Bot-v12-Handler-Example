const Discord = require("discord.js");
module.exports = {
    config: {
    name: 'avatar',
    description: "Lấy hình đại diện người dùng được đề cập",
    usage: "[prefix]avatar",
    aliases: ["avatar", "av"],
    category: "Info",
    nsfwOnly: true,
    },
    run: async(bot, message, args) => {
const oneavatarembed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle(`🍬🌸${message.author.tag}'s avatar✨🌙`)
.addField(`🪐Status: ${message.author.presence.status}`, `🍯**ID: ${message.author.id}**`, true)
.setImage(message.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }))
.setFooter(`Yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
.setTimestamp()
if (!message.mentions.users.size) {
 return message.channel.send(oneavatarembed);
}

const userinvalid = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle('Oh no! Lỗi rồi :<')
.setDescription('Hãy tag một người để dùng lệnh xem avatar!.🐰')
if (args[0]) {
    const user = message.mentions.users.first();
   if (!user) {
       return message.channel.send(userinvalid);
     }
   }

   const user = message.mentions.users.first()
const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle(`🍑🍇${user.tag}'s avatar🌈🍭`)
.addField(`🐰Status: ${user.presence.status}`, `🍒**ID: ${user.id}**`, true)
.setImage(user.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }))
.setFooter(`Yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
.setTimestamp()
return message.channel.send(embed);

}
}
