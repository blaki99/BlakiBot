const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

    let Szefuncio = message.guild.roles.find("name", "HOST 🔌");

    let msg = (args[0]);
    let msg2 = args.slice(1).join(' ')
    const ramka = "```"
    const check = '577121399043522560'

    if(!message.member.roles.has(Szefuncio.id)) return message.reply("oops");
    if(!args[0]) return message.channel.send("❌ _Wprowadź prawidłowe wartości, **!late hasło tryb**_ ❌").then(() =>
    {
        message.channel.send("❌ _**Hasło musi posiadać dokładnie 7 znaków!**_ ❌");
    })
    message.delete();
    let msgEmbed = new Discord.RichEmbed()
    .setColor("#000000")
    .setDescription(`**POWIADOMIENIE OD:** ${message.author}`)
    .addField("__**INFORMACJA**__", `${ramka}${msg}${msg2}${ramka}`)
    .setTimestamp(message.createdAt)
    .setFooter("Kliknij reakcje jeśli przeczytałeś", "https://i.imgur.com/7xm6SSI.png");
    message.channel.send(msgEmbed).then(function (message) {
        message.react(check)
    })
}

module.exports.help = {
    name: "msg"
}
