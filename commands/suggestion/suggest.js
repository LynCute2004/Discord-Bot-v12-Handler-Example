const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
 
module.exports = {
    config:{
  name: "suggest",
  category: "Suggestion",
  description: "Gửi tin nhắn góp ý",
  aliases: ['sgt'],
    },
  run: async (bot, message, args) => {
   
  let channel = await db.fetch(`suggestion_${message.guild.id}`);
    if (channel === null) return;
  
  const suggestionQuery = args.join(" ");
  if(!suggestionQuery) return message.reply("<:cross:879611212097290240> Vui lòng nhập một tin nhắn góp ý.");
  message.delete()
  const embed = new MessageEmbed()
         
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
       .setTitle(`<:letter:880382258643619850> Suggestion`)
       .setThumbnail(message.guild.iconURL({ dynamic: true }))
       .setDescription(`${suggestionQuery}`)
       .setColor("00FFFF")
       .setFooter("Status: Pending. suggest <content> để gửi góp ý.")
       .setTimestamp();
       
    const done = new MessageEmbed()
       .setDescription(`<:tick:879611274428821555> Đề xuất của bạn được gửi ở đây, <#${channel}>\n\n<:sendmessage:885008819200081950> Ghi chú: Hãy kiểm tra tin nhắn của tôi trong DMs!`)
       .setColor("#a848ff")
       .setFooter(`sreply <ID msg> <msg> để phản hồi tin nhắn`)
       .setTimestamp()
    message.channel.send(done)
    
    let msgEmbed = await message.guild.channels.cache.get(channel).send(embed)
    
    await msgEmbed.react('⬆️')
    await msgEmbed.react('⬇️')
  }
}