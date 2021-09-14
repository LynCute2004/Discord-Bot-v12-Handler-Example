const { MessageEmbed } = require('discord.js');

module.exports = { 
        config: {
            name: "rolememberinfo",
            description: "Hiển thị tất cả thành viên sở hữu vai trò nhất định",
            usage: "[prefix]/rolememberinfo <role mention/role id>",
            aliases: ['rmi', 'rmemberinfo']
        },
        run: async (client, message, args) => {
        if (args.includes("@everyone")) return;
        
        if (args.includes("@here")) return;

        if (!args[0]) return message.channel.send("<:cross:879611212097290240> Vui lòng đề cập một vai trò")

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!role) return message.channel.send("<:cross:879611212097290240> Vui lòng đề cập một vai trò hợp lệ");

        let membersWithRole = message.guild.members.cache.filter(member => {
            return member.roles.cache.find(r => r.name === role.name);
        }).map(member => {
            return member.user;
        })
        if (membersWithRole > 2048) return message.channel.send('<:cross:879611212097290240> Danh sách vai trò quá dài để hiển thị')

        let roleEmbed = new MessageEmbed()
            .setColor("WHITE")
            .setThumbnail(message.guild.iconURL())
            .setTitle(`<:moderator:879611409938391040> Role member info: ${role.name}`)
            .setDescription(`Vai trò: ${role}\nID: ${role.id}`)
            .addField(`Người sở hữu vai trò:`,membersWithRole.join("\n"))
            .setFooter(`Yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        message.channel.send(roleEmbed);
    }
}