var Discord = require('discord.js')
const fs = require("fs")
const { PREFIX } = require("../../config")
const db = require('quick.db')
const { stripIndents } = require("common-tags");

module.exports = {
config: {
    name: "help",
    description: "Hiển thị tất cả lệnh của bot",
    usage: "[prefx]help <command>",
    example: "[prefix]help ban",

},
run: async (bot, message, args) => {
    let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

if(message.content.toLowerCase() === `${prefix}help`){
    var log = new Discord.MessageEmbed()
    .setTitle(`Anna Help Commands`)
    .addField(`<:questionbot:879635408282058803> Sử dụng \`${prefix}help <command>\` để xem thông tin lệnh!`, `**Prefix:** \`${prefix}\``)
    .setColor(`WHITE`)
    .addField(`<a:botcup1:885762552016023604> ADMIN`, "`lockdown` `setmodlogchannel` `setmuterole` `serverregion`")
    .addField(`<:textchannel:879607966154752031> ACTION`, "`hug` `slap`")
    .addField(`<:anana_money:885060454202900490> ECONOMY (11 lệnh)`, "`balance` `daily` `deposit` `fish` `hunt` `pay` `rob` `shop` `withdraw` `work`")
    .addField(`<:littlestart1:885766628975988766> FUN`)
    .addField(`<:download:879611359132786728> INFO`, "`avatar` `botinfo` `channelinfo` `roleinfo` `servericon` `serverinfo` `whois`")
    .addField(`<:anna_support:885763849800777788> MISC`, "`feedback`")
    .addField(`<:moderator:879611409938391040> MODERATION`,"`addrole` `ban` `clean` `deafen` `dm` `kick` `lock` `mute` `removerole` `slowmode` `tempban` `unban` `undeafen` `unlock` `unmute` `warn` `unwarn`")
    .addField(`<:textchannel:879607966154752031> SUGGESTION (3 lệnh)`, "`setsuggest` `sreply` `suggest`")
    .addField(`<:settings:879611664289398824> UTILITY`, "`enlarged-emoji` `help` `invite` `ping` `prefix` `uptime`")
    .setFooter(bot.user.username, bot.user.displayAvatarURL())
    .setTimestamp()

message.channel.send(log);
} 

else {
    const embed = new Discord.MessageEmbed()
    .setColor("WHITE")
    .setTitle(`Anna Help Command `)
    .setTimestamp()
    let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
    if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`${prefix}help\` For the List Of the Commands!**`))
    command = command.config

    embed.setDescription(stripIndents`
    ** <:question:879635408282058803> Info Command:** \`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\`\n
    ** <:pinkstar:879697513861500928> Mô tả:** \`${command.description || "Không"}\`\n
    ** <:pinkstar:879697513861500928> Viết tắt:** \`${command.aliases || "Không"}\`\n
    ** <:pinkstar:879697513861500928> Cách sử dụng:** \`${command.usage ? `\`${command.usage}\`` : "Không"}\` \n
    ** <:pinkstar:879697513861500928> Ví dụ:** \`${command.example ? `\`${command.example}\`` : "Không"}\``)
    embed.setFooter(bot.user.username, bot.user.displayAvatarURL())

    return message.channel.send(embed)
}

    

}

}

