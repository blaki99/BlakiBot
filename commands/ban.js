const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("❌ **Nie można wykonać akcji** ❌");
    if(args[0] == "help"){
      message.reply("Użycie: !ban <user> <reason>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("❌ **Nie znaleziono użytkownika** ❌");
    let bReason = args.join(" ").slice(22);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ **Nie można wyrzucić tego użytkownika** ❌");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("BANICJA")
    .setColor("#ff3300")
    .addField("Zbanowany Użytkownik", `${bUser} with ID ${bUser.id}`)
    .addField("Zbanowany Przez", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Zbanowany Na", message.channel)
    .addField("Reason", bReason)
    .setTimestamp(message.createdAt)
    .setFooter('Zbanowano Użytkownika', 'https://i.imgur.com/7xm6SSI.png');

    let incidentchannel = message.guild.channels.find(`name`, "📕  »  ᴅᴢɪᴇɴɴɪᴋ  ᴢᴅᴀʀᴢᴇɴ");
    if(!incidentchannel) return message.channel.send("❌ **Proszę utworzyć kanał zdarzeń** ❌");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
