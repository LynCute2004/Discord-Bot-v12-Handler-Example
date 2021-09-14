const ms = require('ms')
const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
          name: "slowmode",
          description: "Set the slowmode for the channel!",
          aliases: ['sm']
    },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission(('MANAGE_CHANNELS'))) {
      const slowmodeError = new MessageEmbed()
          .setDescription("<:cross:879611212097290240> **Bạn không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền: `MANAGE_CHANNELS`")
          .setColor('RED')
      return message.channel.send(slowmodeError)
  }
  if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
      const noPerms1 = new MessageEmbed()
      .setDescription("<:cross:879611212097290240> **Tôi không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền của tôi: `MANAGE_CHANNELS`")
      .setColor("RED")
      return message.channel.send(noPerms1)
  }
  if (!args[0]) {
      const slowmodeError2 = new MessageEmbed()
          .setDescription(`<:cross:879611212097290240> Vui lòng cung cấp khoảng thời gian chế độ slowmode. \n\n Đơn vị thời gian: h(hour), m(minute), s(seconds) \n (Example - ?slowmode 5s)`)
          .setColor('RED')
      return message.channel.send(slowmodeError2)
  }
  const currentSlowmode = message.channel.rateLimitPerUser
  const reason = args[1] ? args.slice(1).join(" ") : 'Không có lí do'

  if (args[0] === 'off') {
      if (currentSlowmode === 0) {
          const slowmodeOfferror = new MessageEmbed()
              .setDescription(`<:tick:879611274428821555> Slowmode đã được tắt`)
              .setColor('YELLOW')
          return message.channel.send(slowmodeOfferror)
      }
      message.channel.setRateLimitPerUser(0, reason)
      const slowmodeOff = new MessageEmbed()
          .setDescription(`<:tick:879611274428821555> Slowmode đã bị vô hiệu hóa`)
          .setColor('WHITE')

      return message.channel.send(slowmodeOff)
  }

  const time = ms(args[0]) / 1000
  const slowmodeError3 = new MessageEmbed()
      .setDescription(`<:cross:879611212097290240> Đây không phải là thời gian hợp lệ. Vui lòng nhập thời gian có trong các đơn vị được đề cập. \n\n Đơn vị thời gian: h(hour), m(minute), s(seconds) \n (Example - ?slowmode 5s)`)
      .setColor('RED')
  if (isNaN(time)) {
      return message.channel.send(slowmodeError3)
  }

  if (time > 21600000) {
      const slowmodeError4 = new MessageEmbed()
          .setDescription(`<:cross:879611212097290240> Thời gian quá dài. Hãy chắc chắn rằng nó dưới 6 giờ.`)
          .setColor('RED')

      return message.channel.send(slowmodeError4)
  }

  if (currentSlowmode === time) {
      const slowmodeError5 = new MessageEmbed()
          .setDescription(`<:tick:879611274428821555> Slowmode đã được đặt thành ${args[0]}`)
          .setColor('WHITE')
          .setTimestamp();
      return message.channel.send(slowmodeError5)
  }
  
  let slowmode = await message.channel.setRateLimitPerUser(time, reason)
  let afterSlowmode = message.channel.rateLimitPerUser
  if(afterSlowmode > 0) {
      const embed = new MessageEmbed()
      .addField(`<:tick:879611274428821555> Thời gian chế độ slowmode:`, args[0])
      .addField(`Lí do:`, reason)
      .setColor('WHITE')
      .setTimestamp();
      return message.channel.send(embed)
  } else if(afterSlowmode === 0) {
      return message.channel.send(slowmodeError3)
  }
}

}
