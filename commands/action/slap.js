const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const slaps = [
  "https://media.giphy.com/media/RXGNsyRb1hDJm/giphy.gif",
  "https://i.imgur.com/lYxSTLA.gif",
  "https://i.imgur.com/UXqzzab.gif",
  "https://i.imgur.com/1kJpP.gif",
  "https://media2.giphy.com/media/tX29X2Dx3sAXS/giphy.gif?cid=790b761116c03f3da6c03f4d3d2350712b04f4b40af77d51&rid=giphy.gif&ct=g",
  "https://media3.giphy.com/media/Gf3AUz3eBNbTW/giphy.gif?cid=790b7611f1c604a337e4f6d8cebebc5e0ca9801a8b93c5dc&rid=giphy.gif&ct=g",
  "https://media3.giphy.com/media/xUO4t2gkWBxDi/giphy.gif?cid=790b76119c1d2141350df5888e54ceecd3efa29cde407734&rid=giphy.gif&ct=g",
  "https://media2.giphy.com/media/xUNd9HZq1itMkiK652/giphy.gif?cid=790b76116533763afe6d81bda8f3d2a04c376069289e794c&rid=giphy.gif&ct=g",
  "https://media3.giphy.com/media/m6etefcEsTANa/giphy.gif?cid=790b7611e1ceab2b00eb4ce5914c816a73c9b252fb878fbd&rid=giphy.gif&ct=g",
  "https://media2.giphy.com/media/6VOssh7SuHIKA/giphy.gif?cid=790b76113d53ff5fea0afbbf180046730c3606a606d4a9c2&rid=giphy.gif&ct=g",
  "https://media2.giphy.com/media/LB1kIoSRFTC2Q/giphy.gif?cid=790b76112950787c8ebc797dc9170441b94711ef8f7aab50&rid=giphy.gif&ct=g",
  "https://media3.giphy.com/media/Zau0yrl17uzdK/200w.webp?cid=ecf05e475cuiyn9jve7qv5qritqlr2buw6mgfza5uzko2o1e&rid=200w.webp&ct=g",
  "https://media3.giphy.com/media/AlsIdbTgxX0LC/200w.webp?cid=ecf05e475cuiyn9jve7qv5qritqlr2buw6mgfza5uzko2o1e&rid=200w.webp&ct=g",
  "https://media2.giphy.com/media/6Fad0loHc6Cbe/200w.webp?cid=ecf05e475cuiyn9jve7qv5qritqlr2buw6mgfza5uzko2o1e&rid=200w.webp&ct=g",
  "https://media4.giphy.com/media/k1uYB5LvlBZqU/200w.webp?cid=ecf05e475cuiyn9jve7qv5qritqlr2buw6mgfza5uzko2o1e&rid=200w.webp&ct=g",
  "http://3.bp.blogspot.com/-CHYXl4bcgA0/UYGNzdDooBI/AAAAAAAADSY/MgmWVYn5ZR0/s400/2828+-+animated_gif+slap+umineko_no_naku_koro_ni+ushiromiya_maria+ushiromiya_rosa.gif",
  "https://i.imgur.com/Li9mx3A.gif",
  "https://hui3r.files.wordpress.com/2015/08/tumblr_mjpheaavj51s725bno1_500.gif",
  "http://media.giphy.com/media/Zau0yrl17uzdK/giphy.gif",
  "https://i.imgur.com/mIg8erJ.gif",
  "http://i.imgur.com/lYxSTLA.gif",
  "https://i.redd.it/fqihabfcffb01.gif",
  "https://data.whicdn.com/images/68281061/original.gif",
  "https://24.media.tumblr.com/tumblr_m4jl21EyuP1qjricxo1_500.gif",
  "https://38.media.tumblr.com/2c7281f46876dd1776aa5e642d046067/tumblr_n3dmf0in3K1snpm91o5_500.gif",
  "https://media.tumblr.com/tumblr_lx84j9KIBZ1qg12e8.gif",
  "https://33.media.tumblr.com/tumblr_ls57ox8e0K1qagrb6o1_500.gif",
];
module.exports = {
    config:{
  name: "slap",
  usage: `slap <@user>`,
  category: "Action",
  description: "Tát một người",
  args: true,
  cooldown: 2,
    },
  run: async (bot, message, args) => {
    //code
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!user)
      return message.channel.send(
        "<:cross:879611212097290240> Vui lòng đề cập một người dùng để thực hiện lệnh"
      );
    return message.channel.send(
      new MessageEmbed()
        .setColor("WHITE")
        .setImage(slaps[Math.floor(Math.random() * slaps.length)])
        .setDescription(`${message.author} đã tát ${user}:v`)
        .setFooter(`Yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
    );
  }
};