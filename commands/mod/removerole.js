const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

    module.exports = {
        config:{
        name: 'removerole',
        description: "Xóa vai trò của thành viên",
        usage: "[prefix]]removerole <@user/member id> <@role/role id>",
        aliases: ['remove', 'rrole', 'remove'],
        category: "Admin",
        },
        run: async(bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.channel.send("<:cross:879611212097290240> **Bạn không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền: `MANAGE_ROLES`")
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      const noPerms1 = new MessageEmbed()
      .setDescription("<:cross:879611212097290240> **Tôi không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền của tôi: `MANAGE_ROLES`")
      .setColor("RED")
      return message.channel.send(noPerms1)
  }

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!rMember) return message.channel.send("<:cross:879611212097290240> Vui lòng đề cập một người dùng để xóa một vai trò")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
    if(!role) return message.channel.send("<:cross:879611212097290240> Vui lòng cung cấp một vai trò để xóa khỏi người dùng dã định") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("<:cross:879611212097290240> **Tôi không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền của tôi: `MANAGE_ROLES`")
    const memberPosition = message.member.roles.highest.position
    const botPosition = message.guild.me.roles.highest.position
  
    if(memberPosition < memberPosition) {  
        const kickerr = new MessageEmbed()
        .setDescription("<:cross:879611212097290240> Bạn không thể xóa vai trò cho thành viên này vì vai trò của họ cao hơn bạn")
        .setColor('RED')
        
        return message.channel.send(kickerr)
    } else if (botPosition < memberPosition) {
        const kickerr2 = new MessageEmbed()
        .setDescription("<:cross:879611212097290240> Tôi không thể xóa vai trò cho thành viên này vì vai trò của họ cao hơn tôi.\nVui lòng kéo vai trò của tôi cao hơn với những vai trò quản lí.")
        .setColor('RED')
  
        return message.channel.send(kickerr2)
    }
    if(!rMember.roles.cache.has(role.id)) {
      let rolDEL_err = new MessageEmbed()
      .setColor(`RED`)
      .setDescription(`<:cross:879611212097290240> ${rMember.displayName}, Không có vai trò này!`);

      return message.channel.send(rolDEL_err)
    
    } else {

      await rMember.roles.remove(role.id).catch(e => console.log(e.message))
      
      let rolDEL = new MessageEmbed()
      .setColor(`YELLOW`)
      .setDescription(`<:tick:879611274428821555> ${rMember} đã bị xóa khỏi vai trò **${role}**`)

      message.channel.send(rolDEL)
    
    }
  }
        };