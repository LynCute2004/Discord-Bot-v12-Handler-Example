const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'roleinfo',
        category: "info",
        aliases: ["rinfo"],
        description: "shows stats of the mentioned role",
        usage: "[role name | role mention | ID]",
        accessableby: 'everyone'
    },
    run: async (bot, message, args) => {
        if (!args[0]) return message.channel.send("**Please Enter A Role!**")
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!role) return message.channel.send("**Please Enter A Valid Role!**");

        const status = {
            false: "Không",
            true: "Có"
        }

        let roleembed = new MessageEmbed()
            .setColor("WHITE")
            .setAuthor(`Role Info: ${role.name}`)
            .setThumbnail(message.guild.iconURL())
            .addField("**Tên:**", role, true)
            .addField("**ID**", `\`${role.id}\``, true)
            .addField("**Mã màu:**", role.hexColor)
            .addField("**Số thành viên sở hữu**", role.members.size)
            .addField("**Vị trí**", role.position)
            .addField("**Quyền đề cập**", status[role.mentionable])
            .setFooter(`Yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        message.channel.send(roleembed);
    }
}