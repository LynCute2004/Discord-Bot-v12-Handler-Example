const Discord = require("discord.js");
const ownerid = "573805531773272064";
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    config:{
    name: "setfeedback",
	description: "Cài đặt kênh gửi Feedback",
    category: "Owner",
    aliases : ["sfb"],
    usage: "[prefix]setfeedback <#channel>",
    authorPermission: ["MANAGE_GUILD"],
    },
    run: async (bot, message, args) => {
        if (message.author.id == ownerid) {
        if (!message.guild.me.hasPermission("MANAGE_GUILD"))
        message.channel.send("<:cross:879611212097290240> **Bạn không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền: `MANAGE_GUILD`")

        }
        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!Channel) return message.channel.send(`<:cross:879611212097290240> Vui lòng đề cập một kênh`);

        if (Channel.type === "voice") return message.channel.send(`<:cross:879611212097290240> Vui lòng đề cập một kênh text!`);

        await db.set(`feedback_${message.guild.id}`, Channel.id);

        let Embed1 = new MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`<:tick:879611274428821555> Kênh Feedback được đặt là: <#${Channel.id}>`)

        return message.channel.send(Embed1);

    }
};