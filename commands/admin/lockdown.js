const Discord = require('discord.js')

module.exports = {
    config: {
        name: "lockdown",
        description: "Khóa máy chủ của bạn",
        usage:"[prefix]lockdown",
        example:"[prefix]lockdown",
        category: "Admin",
    },
    run: async (bot, message, args) => {
        let lockPermErr = new Discord.MessageEmbed()
        .setColor(`RED`)
        .setDescription("<:cross:879611212097290240> **Bạn không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền: `BAN_MEMBERS`")
        
        if(!message.channel.permissionsFor(message.member).has("BAN_MEMBERS") ) return message.channel.send(lockPermErr);

        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
            })
            
            let lockEmbed = new Discord.MessageEmbed()
            .setColor('WHITE')    
            .setTitle(`Lookdown of ${message.guild.name}`)
            .setDescription(`**\n\<:tick:879611274428821555> Máy chũ đã được khóa thành công!🔒**`)
            .setColor('WHITE')
            .setFooter(`Yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))

            return message.channel.send(lockEmbed);

        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                })
            })
            
            let lockEmbed2 = new Discord.MessageEmbed()
                .setColor('WHITE')    
                .setTitle(`Lookdown of ${message.guild.name}`)
                .setDescription(`**\n\n<:tick:879611274428821555> Máy chũ đã được mở khóa thành công!🔓**`)
                .setTimestamp()
                .setFooter(`Yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))

            return message.channel.send(lockEmbed2)
        }
    }
}