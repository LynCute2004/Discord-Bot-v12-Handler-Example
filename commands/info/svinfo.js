const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    VERY_HIGH: 'Very high'
};

const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydeny: 'Sydeny',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};

module.exports = {
    config:{
    name: 'serverinfo',
    aliases: [],
    category: "Info",
    description: 'Xem số liệu thống kê về máy chủ',
    cooldown: 5,
    guildOnly: false,
    args: false,
    },
 run: async (bot, message, args) => {
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;

        const embed = new MessageEmbed()
            .setDescription(`** ${message.guild.name}'s Server Info**`)
            .setColor('WHITE')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('General', [
                `**Tên:** ${message.guild.name}`,
                `**ID:** ${message.guild.id}`,
                `**<:owner:879574141039177798> Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
                `**Khu vực:** ${regions[message.guild.region]}`,
                `**Boost Level:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
                `**Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
                `**Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
                `**📅Tạo vào lúc:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} [${moment(message.guild.createdTimestamp).fromNow()}]`,
                '\u200b'
            ])
            .addField('<:settings:879611664289398824> Statistics', [
                `**<a:anna_star:885353144761077762> Tổng số roles:** ${roles.length}`,
                `**Tổng số emojis:** ${emojis.size}`,
                `**Emoji thường:** ${emojis.filter(emoji => !emoji.animated).size}`,
                `**Emoji động:** ${emojis.filter(emoji => emoji.animated).size}`,
                `**Tổng số người dùng (User & Bots):** ${message.guild.memberCount}`,
                `**Thành viên👥:** ${members.filter(member => !member.user.bot).size}`,
                `**<:discordboten:879348099036893194> Bots:** ${members.filter(member => member.user.bot).size}`,
                `**<:textchannel:879607966154752031> Kênh text:** ${channels.filter(channel => channel.type === 'text').size}`,
                `**<:voicechannel:879607943631372400> Kênh voice:** ${channels.filter(channel => channel.type === 'voice').size}`,
                `**<a:Booster:879348729528873001> Tổng số boost:** ${message.guild.premiumSubscriptionCount || '0'}`,
                '\u200b'
            ])
            .addField('Presence', [
                `**<a:Online:879346778665812049> Online:** ${members.filter(member => member.presence.status === 'online').size}`,
                `**<a:idle:879340067603218443> Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
                `**<a:Dnd:879346894898364416> Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
                `**<a:Offline:879346857468383244> Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
                '\u200b'
            ])
            .addField(`Roles [${roles.length - 1}]`, roles.join(', '))
            .setFooter(`Yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
            
        message.channel.send(embed);
    }

}