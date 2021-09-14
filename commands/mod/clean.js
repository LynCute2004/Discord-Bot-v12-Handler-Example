const { ownerID } = require('../../owner.json') 

module.exports = {
    config: {
        name: "clean",
        aliases: [`purge`,`clear`],
        category: "moderation",
        description: "Xóa tin nhắn trong kênh",
        usage: "[prefix] [amount of messages]"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<:cross:879611212097290240> **Bạn không có quyền sử dụng lệnh này**. Vui lòng kiểm tra lại quyền: `MANAGE_MESSAGES`")
        
        if (isNaN(args[0]))
            return message.channel.send('<:cross:879611212097290240> Vui lòng nhập một số hợp lệ để xóa tin nhắn');

        if (args[0] > 100)
            return message.channel.send("<:cross:879611212097290240> Vui lòng nhập một số nhỏ hơn 100");

        if (args[0] < 1)
            return message.channel.send("<:cross:879611212097290240> Vui lòng nhập một số lớn hơn 1");

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`<:tick:879611274428821555> Đã xóa **${messages.size}/${args[0]}** tin nhắn trong ${message.channel}`).then(msg => msg.delete({ timeout: 5000 }))).catch(() => null)
    }
}