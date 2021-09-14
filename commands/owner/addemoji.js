const Discord = require('discord.js')
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
    module.exports = {
        config: {
            name: "addemoji",
            description: "Thêm emoji vào máy chủ",
            usage: "[prefix]addemoji <emoji>",
            category: "Admin",
            example: ".addemoji 😊",
            aliases: ['aemoji']
        },
        run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_EMOJIS")) {
          const noPerms = new MessageEmbed()
          .setDescription("<:cross:879611212097290240> **Bạn không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền: `MANAGE_EMOJIS`")
          .setColor("RED")
          return message.channel.send(noPerms)
      }
      if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) {
        const noPerms1 = new MessageEmbed()
        .setDescription("<:cross:879611212097290240> **Tôi không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền của tôi: `MANAGE_EMOJI`")
        .setColor("RED")
        return message.channel.send(noPerms1)
    }
        const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
        if (!emojis) return message.channel.send(`<:cross:879611212097290240> **Gửi một emoji để thêm**`);
        emojis.forEach(emote => {
        let emoji = Discord.Util.parseEmoji(emote);
        if (emoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
       emoji.animated ? "gif" : "png"
}`
            message.guild.emojis.create(
                `${Link}`,
                `${`${emoji.name}`}`
            ).then(em => message.channel.send("<:tick:879611274428821555> Đã thêm emoji vào máy chủ!" + em.toString() )).catch(error => {
              message.channel.send("<:cross:879611212097290240> Đã có lỗi xảy ra. Ooop!")
                console.log(error)
})
          
        }
        })
}
}