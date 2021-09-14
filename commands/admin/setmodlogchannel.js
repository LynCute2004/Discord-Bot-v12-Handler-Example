const db = require("quick.db")

module.exports = {
    config: {
        name: "setmodlogchannel",
        category: "moderation",
        aliases: ['setm', 'sm', 'smc', 'setmodlog'],
        description: "Sets A Channel Where The Bot Can Send Moderation Logs!",
        usage: "[channel mention | channel ID | channel name]",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:cross:879611212097290240> **Bạn không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền: `ADMINISTRATOR`")
    if (!args[0]) {
      let b = await db.fetch(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(
          `<:cross:879611212097290240> Kênh Modlog đã được thiết lập trong máy chủ này là ${channelName}!`
        );
      } else
        return message.channel.send(
          "<:cross:879611212097290240> Vui lòng đề cập một kênh hoặc ID kênh"
        );
    }
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'text') return message.channel.send("<:cross:879611212097290240> Vui lòng đề cập một kênh text");

        try {
            let a = await db.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.channel.send("<:cross:879611212097290240> Kênh này đã được đặt thành kênh Modlog rồi")
            } else {
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("<:tick:879611274428821555> Đã đặt kênh Modlog!")
                db.set(`modlog_${message.guild.id}`, channel.id)

                message.channel.send(`<:tick:879611274428821555> Kênh Modlog đã được đặt thành công trong ${channel}!**`)
            }
        } catch {
            return message.channel.send("<:cross:879611212097290240> Thiếu quyền hoặc đây không phải là một kênh text!");
        }
    }
};