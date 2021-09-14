const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js");
	module.exports = {
        config:{
		name : "ping",
		description: "Hiện độ trễ của bot!",
		aliases : ["ping", "pong", "uptime"],
		ussage : (`[prefix]ping`),
		category: "Utility",
		cooldown: 1,
        },
		run: async(bot,message, args) => {
			const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp; 
			const msg = await message.channel.send("<a:Loading:879982133454704680> Checking the ping...");
			msg.edit(`<:tick:879611274428821555> Pong! Độ trễ: **${Math.floor(msg.createdTimestamp - timestamp)} ms**`)
	 }
	}
	
