const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  config:{
  name: "clyde",
  description: "Hãy để clyde nói điều gì đó",
  category: "Fun",
  },
  run : async (bot , message, args) => {
    const text = args.join(" ");
    if (!text) return message.reply("<:cross:879611212097290240> Vui lòng nhập một câu nói");

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`
    ).then((res) => res.json());

    const embed = new MessageEmbed()
      .setTitle("Clyde")
      .setImage(data.message)
      .setFooter(message.author.username)
      .setColor("WHITE")
      .setDescription(
        `[Click vào đây để xem ảnh!](${data.message})`
      );

    message.channel.send(embed);
  },
};