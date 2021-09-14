const Discord = require("discord.js")
const moment = require('moment');

const status = {
    online: "<a:Online:879346778665812049> Online",
    idle: "<a:Idle:879340067603218443> Idle",
    dnd: "<a:Dnd:879346894898364416> Do Not Disturb",
    offline: "<a:Offline:879346857468383244> Offline"
};
const flags = {
    DISCORD_EMPLOYEE: '<:employee:881411799893823508> Discord Employee',
    DISCORD_PARTNER: '<:discordpartner:879610935629738035> Discord Partner',
    BUGHUNTER_LEVEL_1: '<:bughunterlv1:879611057444880425> Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: '<:bughunterlv2:879610977937653781> Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: '<:hypesquad:880466973706829865> HypeSquad Events',
    HOUSE_BRAVERY: '<:bravery:880466456599494707> House of Bravery',
    HOUSE_BRILLIANCE: '<:brillance:879611105696174102> House of Brilliance',
    HOUSE_BALANCE: '<:balance:879611160880615425> House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: '<:verifiedbot1:886977199658369125> Verified Bot',
    VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = {
    config: {
        name: "whois",
        description: "userinfo",
        usage: "[prefix] <@member/member id>",
        aliases: ['ui', 'userinfo']
    },
    run: async (bot, message, args) => {
        var permissions = [];
        var acknowledgements = 'Không';

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const userFlags = member.user.flags.toArray();


        if(member.hasPermission("KICK_MEMBERS")){
            permissions.push("Kick Members");
        }
        
        if(member.hasPermission("BAN_MEMBERS")){
            permissions.push("Ban Members");
        }
        
        if(member.hasPermission("ADMINISTRATOR")){
            permissions.push("Administrator");
        }
    
        if(member.hasPermission("MANAGE_MESSAGES")){
            permissions.push("Manage Messages");
        }
        
        if(member.hasPermission("MANAGE_CHANNELS")){
            permissions.push("Manage Channels");
        }
        
        if(member.hasPermission("MENTION_EVERYONE")){
            permissions.push("Mention Everyone");
        }
    
        if(member.hasPermission("MANAGE_NICKNAMES")){
            permissions.push("Manage Nicknames");
        }
    
        if(member.hasPermission("MANAGE_ROLES")){
            permissions.push("Manage Roles");
        }
    
        if(member.hasPermission("MANAGE_WEBHOOKS")){
            permissions.push("Manage Webhooks");
        }
    
        if(member.hasPermission("MANAGE_EMOJIS")){
            permissions.push("Manage Emojis");
        }
    
        if(permissions.length == 0){
            permissions.push("<:cross:879611212097290240> Không sở hữu bất kì quyền nào");
        }
    
        if(member.user.id == message.guild.ownerID){
            acknowledgements = 'Server Owner';
        }
   
        const embed = new Discord.MessageEmbed()
            .setTitle(`Profile of ${member.user.username}`)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('WHITE')
            .setFooter(`ID: ${message.author.id}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .addField(`__<a:cupcakepink:879559934197526528> Tên:__`, `<@${member.user.id}>`)
            .addField(`__<:textchannel:879607966154752031> Thẻ tag:__`,`#${member.user.discriminator}`)
            .addField(`__<a:thatym:879568895885869149> Badges__`, `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Không'}`)
            .addField("__Biệt danh:__", `${member.nickname !== null ? `${member.nickname}` : 'Không'}`, true)
            .addField("__<:anna_stast:885783679820005376> Trạng thái:__",`${status[member.user.presence.status]}`, true)
            .addField('__<a:anna_win:886259185757605971> Tham gia vào:__ ',`${moment(member.joinedAt).format("HH:mm:ss, DD/MM/YYYY")}`, true)
            .addField('__Tạo tài khoản lúc:__', member.user.createdAt.toLocaleString(), true)
            .addField(`\n__<a:anna_star:885353144761077762> Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]__`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "<:cross:879611212097290240> Không sở hữu bất kì vai trò nào"}`, true)
            .addField("\n__Acknowledgements:__ ", `${acknowledgements}`, true)
            .addField("\n__<:tick:879611274428821555> Permissions:__ ", `${permissions.join(` | `)}`)
        
        message.channel.send({embed});
    
    }
    }
