const { MessageEmbed } = require("discord.js");
const { MessageButton } = require("discord-buttons");
const db = require("quick.db");

let ticket = [];
module.exports = {
    config:{
  name: "ticket",
  category: "ticket",
  description: "create your ticket",
  cooldown: 5,
  permission: "",
  bot: ["MANAGE_CHANNELS", "VIEW_CHANNEL", "MANAGE_ROLES"],
    },
  run: async (bot, message, args) => {
    let btn1 = new MessageButton()
      .setStyle("blurple")
      .setLabel("🎫  Open a Ticket!")
      .setID("1");
    message.delete();
    let embed = new MessageEmbed()
      .addField(
        "Open a ticket!",
        `By reacting to this ticket, a message will be opened for you.`
      )
      .setColor("#468DFF")
      .setFooter(`Powered by dgh-bot.ddns.net`);

button.send(null, {
      channel: message.channel.id,
      embed: embed,
      buttons: [[btn1]]
    });
button.on("1", async button => {
      let btn2 = new MessageButton()
        .setStyle(`grey`)
        .setLabel(`🔒  Close`)
        .setID("2");
      let ch = db.get(
        `tickets_${message.guild.id}_${button.clicker.user.id}`
      );
      if (ch) {
        button.reply(
          "Your ticket is already there click <#" + ch + "> to see your ticket",
          { flags: 64 }
        );
      }
      if (!ch) {
        const channel = await button.guild.channels.create(
          `${button.clicker.user.username} ticket`,
          {
            topic: `Common Information:
Ticket Name: ${button.clicker.user.username}
Ticket ID: ${button.clicker.user.id}`,
            permissionOverwrites: [
              {
                id: button.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"]
              },
              {
                id: button.clicker.user.id,
                allow: ["VIEW_CHANNEL"]
              },
              {
                id: bot.user.id,
                allow: [
                  "VIEW_CHANNEL",
                  "MANAGE_CHANNELS",
                  "MANAGE_MESSAGES",
                  "SEND_MESSAGES"
                ]
              }
            ]
          }
        );
        button.reply(
          "Your ticket has been created click <#" +
            channel.id +
            "> to see your ticket",
          { flags: 64 }
        );
        const embedticket = new MessageEmbed()
          .setTimestamp()
          .setTitle("General Support")
          .setFooter(`Ticket opened at`)
          .setColor(0x5865f2)
          .setDescription(
            `Support will be with you soon.\nTo close this ticket, interact with 🔒`
          );
       button.send(`Welcome ${button.clicker.user}`, {
          channel: channel.id,
          embed: embedticket,
          buttons: [[btn2]]
        });
        db.set(
          `tickets_${message.guild.id}_${button.clicker.user.id}`,
          channel.id
        );
        db.set(
          `tickets_user_${message.guild.id}_${channel.id}`,
          button.clicker.user.id
        );
       button.on("2", async buttons => {
          let chs = db.get(
            `tickets_user_${message.guild.id}_${buttons.channel.id}`
          );
          if (chs !== buttons.clicker.user.id) {
            buttons.reply(
              `Sorry you don't have access to delete this channel, it's only <@${chs}> only`,
              { flags: 64 }
            );
          }
          if (chs === buttons.clicker.user.id) {
            buttons.reply("Deleting after 5 seconds", { flags: 64 });
            setTimeout(function() {
              db.delete(
                `tickets_${message.guild.id}_${button.clicker.user.id}`
              );
              db.delete(
                `tickets_user_${message.guild.id}_${buttons.channel.id}`
              );
              buttons.channel.delete();
            }, 5000);
          }
        });
      }
    });
  }
};