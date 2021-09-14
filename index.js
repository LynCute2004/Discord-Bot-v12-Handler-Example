//====================================================================================CONSTANTS REQUIRED ON READY=============================================================================================
const Discord = require("discord.js");
const { Client, Collection } = require('discord.js');
const { PREFIX, TOKEN } = require('./config');
const bot = new Client({ disableMentions: 'everyone' });
const fs = require("fs");
const db = require('quick.db');
require('discord-buttons')(bot);
const { MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
//============================================================================================================================================================================================================
// Reply message when bot join servers
bot.on('guildCreate', guild => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    const invitebot = new Discord.MessageEmbed()
        .setAuthor("<a:BlowKisses:879987745450262568> Thanks for inving me:3")
        .addField(`Hello! Tớ là ${bot.user.username}. Cảm ơn đã mời tớ vào máy chủ! Anna-san đã ở đây.`, `Prefix:  \`.\``)
        .addField(`Hãy bắt đầu sử dụng \`.help\` để nhận lệnh trợ giúp. Nếu có lỗi hoặc sai sót xin vui lòng gửi feedback cho tớ. Ngoài ra cũng có thể tham gia máy chủ support để hỗ trợ.`, `Sử dụng lệnh \`invite\` để mời bot & \`support\` tham gia server support!`)
        .setColor("#34fffa")
        .setTimestamp()
        .setFooter(`The letter from Anna❤️`);
       channel.send(invitebot)
       //join from a server
        const joinEmbed = new Discord.MessageEmbed()
          .setDescription(`${bot.user} đã join server **${guild.name}**. ID: ${guild.id}`)
          .setColor("#34fffa")
          .setTimestamp()
         bot.channels.cache.get(`885450097255661589`).send(joinEmbed);
       })
       
       //removed from a server
       bot.on("guildDelete", guild => {
        const leaveEmbed = new Discord.MessageEmbed()
          .setDescription(`${bot.user} đã leave server **${guild.name}**. ID: ${guild.id}`)
          .setColor("#34fffa")
          .setTimestamp()
          bot.channels.cache.get(`885450097255661589`).send(leaveEmbed);
       })

//====================================================================================COLLECTIONS REQUIRED ON READY===========================================================================================
bot.commands = new Collection();
bot.aliases = new Collection();

//============================================================================================================================================================================================================



//============================================================================================INITIALIZING====================================================================================================
["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handler/${x}`)(bot));

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

//============================================================================================================================================================================================================


//=========================================================================================MENTION SETTINGS===========================================================================================

bot.on('message', async message => {


    let prefix;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        
            } catch {
            prefix = PREFIX
    };
    try {
        if (message.mentions.has(bot.user.id) && !message.content.includes("@everyone") && !message.content.includes("@here")) {
          message.channel.send(`\n<a:anna_star:885353144761077762> Prefix của tớ trong **${message.guild.name}** là \`${prefix}\` Nhập \`${prefix}prefix [new prefix]\` để đổi prefix bot!`)
  .then(msg => {
    msg.delete({ timeout: 5000 })
  })
  .catch(console.error);
          } 
    } catch {
        return;
    };

});


//============================================================================================================================================================================================================
// Meme Img
const HuyAPI = require("huyapi")
const image = new HuyAPI
bot.on('clickButton', async (button) => {
await button.reply.defer()
if (button.id == 'meme_id') {
    let memeimg = await image.get.meme()
    let meme_embed = new MessageEmbed()
      .setImage(memeimg.url)
      .setColor("#6fc785")
      .setTimestamp()
    let meme_button = new MessageButton()
      .setStyle('green')
      .setLabel('Refresh')
      .setID('meme_id')
    button.message.edit({
      buttons: [meme_button],
      embed: meme_embed
    }) 
  }
// Girl Img
if (button.id == 'girl_id') {
    let girlimg = await image.get.girl()
    let girl_embed = new MessageEmbed()
      .setImage(girlimg.url)
      .setColor("WHITE")
      .setTimestamp()
    let girl_button = new MessageButton()
      .setStyle('green')
      .setLabel('Refresh')
      .setID('girl_id')
    button.message.edit({
      buttons: [girl_button],
      embed: girl_embed
    }) 
  }
  const Database = require("@replit/database")
  const db = new Database()
  if (button.id == 'dog_id') {
    let imgone = await image.get.dog()
    let embed = new MessageEmbed()
      .setImage(imgone.url)
      .setTimestamp()
      .setColor("#6fc785")
    let button1 = new MessageButton()
      .setStyle('green')
      .setLabel('Refresh')
      .setID('dog_id')
    button.message.edit({
      buttons: [button1],
      embed: embed
    }) 
  }
    if (button.id == 'cat_id') {
    let Catimg = await image.get.cat()
    let cat_embed = new MessageEmbed()
      .setImage(Catimg.url)
      .setTimestamp()
      .setColor("#6fc785")
    let cat_button = new MessageButton()
      .setStyle('green')
      .setLabel('Refresh')
      .setID('cat_id')
    button.message.edit({
      buttons: [cat_button],
      embed: cat_embed
    }) 
  }
});
bot.login(TOKEN);
