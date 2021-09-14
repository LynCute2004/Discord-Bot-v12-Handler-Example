const db = require("quick.db");

module.exports = {
  config: {
    name: "setmuterole",
    aliases: ["setmute", "smrole", "smr"],
    description: "Cài đặt vai trò Mute để khóa mõm thành viên",
    usage: "[role name | role mention | role ID]",
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**"
      );
    if (!args[0]) {
      let b = await db.fetch(`muterole_${message.guild.id}`);
      let roleName = message.guild.roles.cache.get(b);
      if (message.guild.roles.cache.has(b)) {
        return message.channel.send(
          `<:cross:879611212097290240> Vai trò Mute trong máy chủ này là \`${roleName.name}\`!**`
        );
      } else
        return message.channel.send(
          "<:cross:879611212097290240> Vui lòng đề cập một vai trò hoặc nhập ID một vai trò"
        );
    }

    let role =
      message.mentions.roles.first() ||
      bot.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return message.channel.send("<:cross:879611212097290240> Vui lòng đề cập một vai trò hoặc nhập ID một vai trò");

    try {
      let a = await db.fetch(`muterole_${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send(
          "<:tick:879611274428821555> Đã cài đặt vai trò này làm role Mute!"
        );
      } else {
        db.set(`muterole_${message.guild.id}`, role.id);

        message.channel.send(
          `<:tick:879611274428821555> Đã cài đặt vai trò **\`${role.name}\` thành công!**`
        );
      }
    } catch (e) {
      return message.channel.send(
        "<:cross:879611212097290240> Thiếu quyền hoặc vai trò này không tồn tại trong máy chủ!",
        `\n${e.message}`
      );
    }
  }
};
