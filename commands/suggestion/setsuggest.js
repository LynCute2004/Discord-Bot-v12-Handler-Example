const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    config:{
    name: "setsuggest",
	description: "Cài đặt kênh gửi góp ý",
    category: "Suggestion",
    aliases : ["ssgt"],
    usage: "[prefix]setsuggest <#channel>",
    authorPermission: ["MANAGE_GUILD"],
    },
    run: async (bot, message, args) => {
if (!message.member.hasPermission("MANAGE_GUILD")) {
    const Perms = new MessageEmbed()
    .setDescription("<:cross:879611212097290240> **Bạn không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền: `MANAGE_GUILD`")
    .setColor("RED")
    return message.channel.send(Perms)
        }
        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!Channel) return message.channel.send(`<:cross:879611212097290240> Vui lòng đề cập một kênh`);

        if (Channel.type === "voice") return message.channel.send(`<:cross:879611212097290240> Vui lòng đề cập một kênh text!`);

        await db.set(`suggestion_${message.guild.id}`, Channel.id);

        let Embed = new MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`<:tick:879611274428821555> Kênh suggest được đặt là: <#${Channel.id}>`)

        return message.channel.send(Embed);

    }
};