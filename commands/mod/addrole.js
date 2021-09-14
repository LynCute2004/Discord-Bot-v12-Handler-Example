const { MessageEmbed } = require("discord.js");
const { ownerID } = require("../../owner.json")
module.exports = {
  config: {
    name: "roleadd",
    description: "Add a role to a member",
    usage: "m/roleadd <member mention/id> <role mention/role id>",
    aliases: ['role add', 'radd', 'add']
  },
  run: async (client, message, args) => {
    if(!message.member.hasPermission('MANAGER_ROLES')) {
      const noPerms = new MessageEmbed()
      .setDescription("<:cross:879611212097290240> **Bạn không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền: `MANAGE_ROLES`")
      .setColor("RED")
      return message.channel.send(noPerms)
  }
  if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      const noPerms1 = new MessageEmbed()
      .setDescription("<:cross:879611212097290240> **Tôi không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền của tôi: `MANAGE_ROLES`")
      .setColor("RED")
      return message.channel.send(noPerms1)
  }
  const member = message.mentions.members.first()
  if(!member) {
      const addroleError = new MessageEmbed()
      .setDescription(`<:errormsg:879611212097290240> Vui lòng đề cập đến một thành viên để giao cho họ vai trò`)
      .setColor("RED")
      return message.channel.send(addroleError)
  }
  args.shift()
  let roleToGive = message.mentions.roles.first()
  
  if(!roleToGive) {
      const addroleError2 = new MessageEmbed()
      .setDescription(`<:cross:879611212097290240> Không có vai trò nào`)
      .setColor("RED")
      return message.channel.send(addroleError2)
  }

  const mentionedPosition = member.roles.highest.position
  const memberPosition = message.member.roles.highest.position
  const botPosition = message.guild.me.roles.highest.position

  if(member <= mentionedPosition) {  
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
  
  
  if(member.roles.cache.get(roleToGive.id)) {
      const addroleError3 = new MessageEmbed()
      .setDescription(`<:cross:879611212097290240> Thành viên đã sở hữu vai trò này`)
      .setColor("RED")
      return message.channel.send(addroleError3)
  }
  member.roles.add(roleToGive)
  const embed = new MessageEmbed()
  .setDescription(`<:tick:879611274428821555> Vai trò ${roleToGive} đã được thêm cho ${member}`)
  .setColor("YELLOW")

  message.channel.send(embed)

}
  
}
