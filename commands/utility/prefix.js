const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { PREFIX } = require("../../config")

module.exports = {
    config: {
        name: "prefix",
        description: "Xem/Thay đổi prefix bot trong máy chủ",
        usage: "m/prefix <new prefix>",
        example: "1) m/prefix = \n2) m/prefix reset",
        aliases: ["prefix"]
    },

    run: async (bot, message, args) => {
        let option = args[0];

            //PERMISSION
     if(!message.member.hasPermission("MANAGE_GUILD")) {
                return message.channel.send("You are not allowed or do not have permission to change prefix")
              }
            
            if(!option) {
                prefix = db.fetch(`prefix_${message.guild.id}`)
                if (!prefix) prefix = PREFIX;
                let prefEmbed = new MessageEmbed()
                .setColor('YELLOW')
                .setThumbnail(message.guild.iconURL())
                .setDescription(`**\nMy prefix for \`${message.guild.name}\`  is  **` + `  \`${prefix}\` \n**Type \`${prefix}help\` for help**`)
              
              message.channel.send(prefEmbed);
            }

            
            if(args[1]) {
              return message.channel.send("You can not set prefix a double argument")
            }
            
            if(args[0].length > 4) {
              return message.channel.send("<:cross:879611212097290240> Vui lòng đặt prefix nhỏ hơn 4 kí tự")
            }
            
            if(args.join("") === PREFIX) {
              db.delete(`prefix_${message.guild.id}`)
             return await message.channel.send("<:tick:879611274428821555> Đã reset lại prefix bot")
            }
            
            db.set(`prefix_${message.guild.id}`, args[0])
          await message.channel.send(`<:tick:879611274428821555> Prefix hiện tại đã được đặt thành \`${args[0]}\``)
            

        }
        
    }