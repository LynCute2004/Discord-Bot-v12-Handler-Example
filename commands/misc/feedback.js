const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const {MessageEmbed} = require("discord.js");
module.exports = {
  config:{
    name: "feedback",
    aliases: ["fb"],
    description: "Gửi phản hồi đóng góp cho nhà phát triển bot",
    usage: " ",
    category:"Misc",
    ownerOnly: true,
    hidden: true,
  },
  run: async (bot, message, args) => {
message.delete()
let channel = await db.fetch(`feedback_${message.guild.id}`);
if (channel === null) return;

const suggestionQuery = args.join(" ");
if(!suggestionQuery) return message.reply("<:cross:879611212097290240> Vui lòng gửi một tin nhắn.");

const embed = new MessageEmbed()
   .setTitle(`📥 ${bot.user.username}'s Feedback`)
   .setThumbnail(message.guild.iconURL({ dynamic: true }))
   .setDescription(`${suggestionQuery}`)
   .addField('User', message.member, true)
   .addField('Server', message.guild.name, true)
   .setColor("PINK")
   .setFooter("feedback <message> để gửi feedback.")
   .setTimestamp();
   
const done = new MessageEmbed()
.setDescription(`
<:tick:879611274428821555> Đã gửi Feedback thành công!
  Vui lòng tham gia server support [Anna Support Server](https://discord.gg/W42NTvjN7N) để xem phản hồi từ nhà phát triển.
  Hãy kiểm tra tin nhắn trong DMs của bạn, sẽ có câu trả lời sớm nhất thì chúng tớ! Cảm ơn bạn đã gửi:3`) 
.addField('📤 Yêu cầu đã gửi bỏi:', message.member, true)
.setColor("#a848ff")
   
message.channel.send(done)

let msgEmbed = await message.guild.channels.cache.get(channel).send(embed)

await msgEmbed.react('✅')
await msgEmbed.react('❌')
let fbchannel = db.fetch(`modlog_${message.guild.id}`)
if (!fbchannel) return;
let role = message.mentions.roles.first() 
const fbmodlog = new MessageEmbed()
    .setTitle(`Feedback Logs`)
    .setColor("#ff0000")
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setFooter(message.guild.name, message.author.displayAvatarURL())
    .addField("**Người gửi**",message.author)
    .addField("**ID người gửi**", message.author.id)
    .addField(`**Server** ${message.guild.name}`, `**ID server** ${message.guild.id}`)
    .addField("**Nội dung**", suggestionQuery)
    .addField("**Date**", message.createdAt.toLocaleString())
    .setTimestamp();

let sChannel = message.guild.channels.cache.get(fbchannel)
if (!sChannel) return;
sChannel.send(fbmodlog)
}
}