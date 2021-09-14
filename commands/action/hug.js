const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const slaps = [
  "https://media.tumblr.com/tumblr_m68m3wjllW1qewqw2.gif",
  "https://33.media.tumblr.com/e9fae5fd165029c63c6963f855238c1b/tumblr_ncq9kwWdjW1sy4pr2o1_500.gif",
  "https://38.media.tumblr.com/b22e5793e257faf94cec24ba034d46cd/tumblr_nldku9v7ar1ttpgxko1_500.gif",
  "http://25.media.tumblr.com/tumblr_mad9v0FbLA1r6bk7qo2_500.gif",
  "http://33.media.tumblr.com/510818c33b426e9ba73f809daec3f045/tumblr_n2bye1AaeQ1tv44eho1_500.gif",
  "http://25.media.tumblr.com/tumblr_m0fuxezxqu1ql02n0o1_500.gif",
  "http://static.tumblr.com/rgjkzhi/Qd5m7n1nj/tumblr_m7jbdcogab1qh0jlh.gif  ",
  "https://media.giphy.com/media/XEmhUht7W2CNq/giphy.gif",
  "http://mrwgifs.com/wp-content/uploads/2013/04/Ouran-High-School-Host-Club-Love-Hug-Gif.gif",
  "https://31.media.tumblr.com/e66b45dc71f2b4e29b9834034eba47cf/tumblr_mvo14g0ZX91rypg9ro1_500.gif",
  "http://31.media.tumblr.com/tumblr_m2rq4kT2eY1qkb6keo1_500.gif",
  "https://media.giphy.com/media/49mdjsMrH7oze/giphy.gif",
  "http://25.media.tumblr.com/2a3ec53a742008eb61979af6b7148e8d/tumblr_mt1cllxlBr1s2tbc6o1_500.gif",
  "https://31.media.tumblr.com/57653f6ce67d5f96767c6642906a5c88/tumblr_n32xk1JA2G1tvuu8no1_500.gif",
  "http://i.imgur.com/1gvENc3.gif  ",
  "https://33.media.tumblr.com/c0189fa705b0894dd12a0cb948064e14/tumblr_mn9608uJLM1sqb4xeo1_500.gif",
  "http://37.media.tumblr.com/66c19998360481a17ca928283006297c/tumblr_n4i4jvTWLe1sg0ygjo1_500.gif",
  "http://25.media.tumblr.com/668e4508190fb9f62ea9b5eb1d112531/tumblr_mw41ntelfK1s6ghcbo1_500.gif",
  "http://24.media.tumblr.com/ab7dd4617a37ed5b22606117f8428003/tumblr_n3ojd0CoI61txgib0o1_500.gif",
  "http://media.tumblr.com/tumblr_m1oqhy8vrH1qfwmvy.gif",
  "https://31.media.tumblr.com/5e86bb5906d5d5603351e9dbea007dea/tumblr_inline_n998n40b2q1sx8vac.gif",
  "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif",
  "http://media.giphy.com/media/143v0Z4767T15e/giphy.gif",
  "http://31.media.tumblr.com/c63a48856edab67f2e5c9b9c8a10d21e/tumblr_mkglr72JO61s7y044o1_500.gif",
  "http://media.tumblr.com/tumblr_mewo9gcfj21rvon2g.gif",
  "http://media.tumblr.com/tumblr_mabh68A9Xd1qfkm7e.gif",
  "http://25.media.tumblr.com/tumblr_m3d52tBC8H1rtrb2fo1_500.gif",
  "http://media3.giphy.com/media/DjczAlIcyK1Co/giphy.gif",
  "http://media.giphy.com/media/aD1fI3UUWC4/giphy.gif  ",
  "http://i.imgur.com/8ruodNJ.gif",
  "http://38.media.tumblr.com/91b578f5c95575f088f05be5ee0f284a/tumblr_n1ot2zAWgW1t8zoigo1_500.gif",
  "http://images6.fanpop.com/image/photos/32700000/Clannad-Gifs-clannad-32781225-500-281.gif",
  "http://31.media.tumblr.com/a4119e7feb02c0094a6628e6b7cf3924/tumblr_mvqfcgI5eQ1s2p1gco1_500.gif",
  "http://31.media.tumblr.com/3f9570ee1019d79a5570b9017fecb601/tumblr_mpy92bYeVC1qbvovho1_500.gif",
  "http://i1.kym-cdn.com/photos/images/original/000/931/030/394.gif  ",
  "https://31.media.tumblr.com/646e81a4d0b42d332507511b624cd9b5/tumblr_nhq1ggeWna1u3dv1jo2_500.gif",
  "http://i.imgur.com/rlOJqHL.gif"
];
module.exports = {
    config:{
  name: "hug",
  usage: `hug <@user>`,
  category: "Actionn",
  description: "Ôm một người",
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
        .setDescription(`${message.author} đã ôm ${user}^^`)
        .setFooter(`Yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
    );
  }
};