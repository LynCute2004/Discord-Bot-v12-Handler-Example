const { MessageEmbed } = require("discord.js");
const moment = require('moment');
module.exports = {
    config: {

        name: 'channelinfo',
        description: "Hiển thị thông tin kênh cần thiết",
        usage: "[prefix]roleinfo <role mention/role id>",
        aliases: ['cinfo', 'channel-info'],
        category: "Info",
    },
    run: async (bot, message, args) => {
        let channel = message.mentions.channels.first()
        if (channel) {
          args.shift();
        } else channel = message.channel;
        const embed = new MessageEmbed()
          .setTitle(`Channel Info: ${channel.name}`)
          .setColor(`White`)
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .addField('Tên:', channel, true)
          .addField('ID:', `\`${channel.id}\``, true)
          .addField('Số lượng thành viên tham gia:', `\`${channel.members.size}\``, true)
          .addField('Số lượng bot tham gia:', `\`${channel.members.array().filter(b => b.user.bot).length}\``, true)
          .addField('Được tạo vào:', `\`${moment(channel.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}\``, true)
          .setFooter(`Yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(`WHITE`);
        if (channel.type === 'text') {
          embed // Text embed
            .spliceFields(3, 0, { name: 'Slowmode:', value: `\`${channel.rateLimitPerUser}\``, inline: true })
            .spliceFields(6, 0, { name: 'NSFW:', value: `\`${channel.nsfw}\``, inline: true });
        } else if (channel.type === 'news') {
          embed // News embed
            .spliceFields(6, 0, { name: 'NSFW:', value: `\`${channel.nsfw}\``, inline: true });
        } else if (channel.type === 'voice') {
          embed // Voice embed
            .spliceFields(0, 1, { name: 'Channel:', value: `${voice} ${channel.name}`, inline: true })
            .spliceFields(5, 0, { name: 'Giới hạn người dùng:', value: `\`${channel.userLimit}\``, inline: true })
            .spliceFields(6, 0, { name: 'Full:', value: `\`${channel.full}\``, inline: true });
          const members = channel.members.array();
          if (members.length > 0) 
            embed.addField('Thành viên đã tham gia:', message.bot.utils.trimArray(channel.members.array()).join(' '));
        } else return this.sendErrorMessage(message, 0, stripIndent`
        <:cross:879611212097290240> Vui lòng nhập đề cập đến một kênh text hoặc kênh thông báo hợp lệ` +
          'hoặc cung cấp văn bản, thông báo hoặc ID kênh thoại hợp lệ'
        );
        if (channel.topic) embed.addField('Chủ đề kênh', channel.topic);
        message.channel.send(embed);
      }
    };
    