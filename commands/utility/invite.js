const { MessageEmbed } = require("discord.js");
const { MessageButton } = require("discord-buttons");

module.exports = {
    config: {
  name: 'invite',
  aliases: [],
  guildOnly: true,
  category: "Info",
  description: 'Nhận link thêm bot',
  clientPermissions: [ 'EMBED_LINKS' ],
  examples: [
    'invite'
  ],
},
  run: async (bot, message) => {
      const FirstEmbed = new MessageEmbed()
        .setTitle(`Invite ${ bot.user.username}`)
        .setDescription(`[Click here to invite bot](https://discord.com/api/oauth2/authorize?client_id=766853625967935508&permissions=261993005047&scope=bot)`)
        .setColor(`#34fffa`)
        .setFooter(`Thanks to use my bot!❤️`)
        const invite = new MessageButton()
        .setStyle(`url`)
        .setLabel(`Invite Bot`)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=766853625967935508&permissions=261993005047&scope=bot`)
        message.channel.send({ button: invite, embed: FirstEmbed })

    }
};
