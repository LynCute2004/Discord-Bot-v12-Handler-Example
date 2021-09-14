const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: "uptime",
        description: "Shows Uptime of bot",
        aliases: ["up"],
        category: "info",
        usage: " ",
        accessableby: "everyone"
    },
    run: async(bot, message, args) => {
        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;

        const embed = new MessageEmbed()
            .setTitle("Thời gian chạy bot:")
            .setColor("WHITE")
            .setDescription(`<:cooldowncmd:884990928010502175> ${days} ngày, ${hours} giờ, ${minutes} phút, ${seconds} giây`)
            .setTimestamp()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL()) 
            .setFooter(`Yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
 
        message.channel.send(embed);
    }
}