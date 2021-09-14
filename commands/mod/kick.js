const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
    config:{
    name: 'kick',
    description: "Đá người dùng ra khỏi máy chủ",
    category: "Admin",
    usage: "[prefix]kick <userid> <reason>",
    },
    run: async(bot, message, args) => {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!message.member.hasPermission('KICK_MEMBERS')) {
            const kickerror = new MessageEmbed()
            .setDescription("<:cross:879611212097290240> Bạn không có quyền để sử dụng lệnh này**. Vui lòng kiểm tra lại quyền: `KICK_MEMBERS`")
            .setColor('RED')

            return message.channel.send(kickerror)
        } else if(!message.guild.me.hasPermission('KICK_MEMBERS')) {
            const kickerror2 = new MessageEmbed()
            .setDescription("<:cross:879611212097290240> **Tôi không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền của tôi: `KICK_MEMBERS`")
            .setColor('RED')

            return message.channel.send(kickerror2)
        } else if (!mentionedMember) {
            const kickerror3 = new MessageEmbed()
            .setDescription("<:cross:879611212097290240> Vui lòng đề cập đến một người dùng để thực hiện lệnh kick")
            .setColor('RED')

            return message.channel.send(kickerror3)
        }

        const mentionedPosition = mentionedMember.roles.highest.position
        const memberPosition = message.member.roles.highest.position
        const botPosition = message.guild.me.roles.highest.position

        if(memberPosition <= mentionedPosition) {  
            const kickerr = new MessageEmbed()
            .setDescription("<:cross:879611212097290240> Bạn không thể đá thành viên này vì vai trò của họ cao hơn / ngang bằng với bạn")
            .setColor('RED')
            
            return message.channel.send(kickerr)
        } else if (botPosition <= mentionedPosition) {
            const kickerr2 = new MessageEmbed()
            .setDescription("<:cross:879611212097290240> Tôi không thể đá thành viên này vì vai trò của họ cao hơn / ngang bằng với tôi")
            .setColor('RED')

            return message.channel.send(kickerr2)
        }
        

        const reason = args.slice(1).join(' ')

        try {
            await mentionedMember.kick([reason])

            const kickSuccess = new MessageEmbed()
            .setDescription(`<:tick:879611274428821555> Kicked ${mentionedMember} ${reason ? `for **${reason}**` : ''}`)
            .setColor('YELLOW')

            message.channel.send(kickSuccess)

        } catch (error) {
            console.log(error)
            const errorEmbed = new MessageEmbed()
            .setDescription("<:cross:879611212097290240> There Was an Error Kicking This Member")
            .setColor('RED')
            
            message.channel.send(errorEmbed)
        }
        await message.channel.send(embed).then(message => message.delete({timeout: 5000}))
        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;
        let role = message.mentions.roles.first() 
        const kickmodlog = new MessageEmbed()
            .setTitle(`Kick Logs`)
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, member.user.displayAvatarURL())
            .addField(`**Moderation**`, `${message.author}`)
            .addField("**Member**", mentionedMember)
            .addField(`**Reason**`, reason)
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp();

        let sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(kickmodlog)
    }
    
}



