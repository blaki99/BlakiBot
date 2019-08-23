const Discord = require("discord.js");
const config = require("../blakiconfig.json");

module.exports.run = async (blaki, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ **Nie można wykonać akcji** ❌");
    if(args[0] == "help"){
      message.reply("Użycie: !kick <user> <reason>");
      return;
    }
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("❌ **Nie znaleziono użytkownika** ❌");
    let kReason = args.join(" ").slice(22);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ **Nie można wyrzucić tego użytkownika** ❌");
    message.delete().catch(O_o=>{});
    try{
        let DMkickEmbed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setTitle("__**ZOSTAŁEŚ WYRZUCONY**__")
        .addField("Serwer", `**${message.guild.name}**`)
        .addField("Wyrzucony Przez", `<@${message.author.id}>`)
        .addField("Powód", kReason)
        .setTimestamp(message.createdAt)
        .setFooter('Zostałeś wyrzucony!', `${config.avatar}`);
        await kUser.send(DMkickEmbed)
    }catch(e){
        message.channel.send(`Użytkownik został zbanowany na **BlaKi's Discord** ale niestemy ma zablokowane wiadomości prywatne.`)
    }
    
    let kickEmbed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .addField("Wyrzucony Użytkownik", `${kUser}`)
    .addField("Wyrzucony przez", `<@${message.author.id}>`)
    .addField("Wyrzucony na", message.channel)
    .addField("Powód", kReason)
    .setTimestamp(message.createdAt)
    .setFooter('Wyrzucono Użytkownika', `${config.avatar}`);

    let kickChannel = message.guild.channels.find(`name`, "📕  »  ᴅᴢɪᴇɴɴɪᴋ  ᴢᴅᴀʀᴢᴇɴ");
    if(!kickChannel) return message.channel.send("❌ **Proszę utworzyć kanał zdarzeń** ❌");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}
