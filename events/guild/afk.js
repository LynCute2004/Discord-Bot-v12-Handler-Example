const db = require("quick.db");
const format = require(`humanize-duration`);
const { PREFIX } = require("../../config.js");
module.exports = async bot => {
bot.on("message", async message => {
    if (message.author.bot || !message.guild || message.webhookID) return;
    if (message.content.startsWith(PREFIX + "afk")) return;
    let status = db.get(`afkstatus_${message.guild.id}_${message.author.id}`);
    let reason;
    if (status === true) {
    let nick = db.get(`nick_${message.guild.id}_${message.author.id}`);
      db.set(`afkstatus_${message.guild.id}_${message.author.id}`, false);
      db.delete(`afk_${message.guild.id}_${message.author.id}`);
      message.member.setNickname(nick).catch(err => {}).then(db.delete(`nick_${message.guild.id}_${message.author.id}`));
      return message.channel.send(`**Welcome Back ${message.author}**`, message);
    }
    if (status === message.author.id) {
    let nick = db.get(`nick_${message.guild.id}_${message.author.id}`);
      db.set(`afkstatus_${message.guild.id}_${message.author.id}`, false);
      db.delete(`afk_${message.guild.id}_${message.author.id}`);
      message.member.setNickname(nick).catch(err => {}).then(db.delete(`nick_${message.guild.id}_${message.author.id}`));
      return message.channel.send(`**Welcome Back ${message.author}**`, message);
    }
    if (message.mentions.users.size) {
      let mentions = message.mentions.users;
      mentions = mentions.filter(mention => mention.id !== message.author.id);
      if (mentions.size) {
        let victim = mentions.find(mention =>
          db.get(`afk_${message.guild.id}_${mention.id}`)
        );
        if (victim) {
          status = db.get(`afkstatus_${message.guild.id}_${victim.id}`);
          reason = db.get(`afk_${message.guild.id}_${victim.id}`);
          let time = db.get(`time_${message.guild.id}_${victim.id}`);
          time = Date.now() - time;
          return message.channel.send(
            `**${victim.username} is currently AFK - ${reason} - ${format(
              time
            )} ago**`,
            message
          );
        }
      }
    }
  });
}