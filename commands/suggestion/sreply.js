const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    config:{
  name: "sreply",
  category: "Suggestion",
  description: "Trả lời góp ý",
    },
  run: async (bot, message, args) => {
    
let channel = await db.fetch(`suggestion_${message.guild.id}`);
if (channel === null) return;
     
      if(!message.member.hasPermission('MANAGE_GUILD')) return;
      
    const rgx = /^(?:<@!?)?(\d+)>?$/;

    const messageID = args[0];
    const replyQuery = args.slice(1).join(' ');
      
    const number = new MessageEmbed()
      .setDescription(`<:cross:879611212097290240> Đây không phải là một ID tin nhắn`)
      .setColor("RED")
      
    const id = new MessageEmbed()
      .setDescription(`<:cross:879611212097290240> Bạn chưa nhập ID tin nhắn!`)
      .setColor("RED")
      
    const query = new MessageEmbed()
      .setDescription(`<:cross:879611212097290240> Bạn chưa nhập câu Trả lời!`)
      .setColor("RED")
      
    const reply = new MessageEmbed()
      .setDescription(`<:tick:879611274428821555> Đã trả lời tin nhắn!`)
      .setColor("YELLOW")
      
    const noChannel = new MessageEmbed()
      .setDescription(`<:cross:879611212097290240> Không tìm thấy kênh suggest nào`)
      .setColor("RED")
      
    const noMessage = new MessageEmbed()
      .setDescription(`<:cross:879611212097290240> Không tìm thấy bất kỳ tin nhắn nào có ID này!`)
      .setColor("RED")
    
      if(!messageID) return message.channel.send(id);
      
      if (!rgx.test(messageID)) return message.channel.send(number);
      
      if(!replyQuery) return message.channel.send(query)
      
      try{
      const suggestionChannel = message.guild.channels.cache.get(channel)
      
      if(!suggestionChannel) return message.channel.send(noChannel)
      
      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
    const noMessage = new MessageEmbed()
      .setDescription(`<:cross:879611212097290240> Không tìm thấy bất kỳ tin nhắn nào có ID này!`)
      .setColor("RED")
  return message.channel.send(noMessage);
  })
     
      const data = suggestedEmbed.embeds[0];
     
      const replyEmbed = new MessageEmbed()
      .setAuthor(`${data.author.name}`, data.author.iconURL)
      .setDescription(data.description)
      .setColor("YELLOW")
      .addField(`<:tick:879611274428821555> Đã trả lời cho ${message.author.tag}`, replyQuery)
      .setFooter("Status: Replied")
      .setTimestamp();
      
     suggestedEmbed.edit(replyEmbed)
     
     message.channel.send(reply)
      
      const user = await client.users.cache.find((u) => u.tag === data.author.name)
      
    const embed = new MessageEmbed()
      .setDescription(`<:letter:880382258643619850> Bạn đã trả lời cho một câu đề xuất.**[Ấn vào đây để đi đến tin nhắn](https://discord.com/channels/${message.guild.id}/${channel}/${messageID})**`)
      .setColor("YELLOW")
      user.send(embed)
        
      } catch(err) {
        return;
    }
  }
}