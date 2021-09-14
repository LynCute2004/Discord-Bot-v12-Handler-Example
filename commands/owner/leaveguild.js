const Discord = require("discord.js");
const ownerid = "573805531773272064";
const client = new Discord.Client();
const {MessageEmbed} = require("discord.js");
module.exports = {
    config:{
    name: "leaveguild",
    aliases: ["lg"],
    description: "Đưa bot rời khỏi máy chủ",
    usage: " ",
    category:"Owner",
    ownerOnly: true,
    hidden: true,
    },
  run: async (bot, message, args) => {
    const guildId = args[0];
    if (!guildId)
      return message.channel.send('Please provide a valid server ID');
    const guild = message.client.guilds.cache.get(guildId);
    if (!guild) return message.channel.send('Unable to find server, please check the provided ID');
    await guild.leave();
    const embed = new MessageEmbed()
      .setTitle('Leave Guild')
      .setDescription(`I have successfully left **${guild.name}**.`)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  } 
};