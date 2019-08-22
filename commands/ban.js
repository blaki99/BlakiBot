const Discord = require("discord.js");
const config = require("../blakiconfig.json");

module.exports.run = async (blaki, message, args) => {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("❌ **Nie można wykonać akcji** ❌");
    if(args[0] == "help"){
      message.reply("Użycie: !ban <user> <reason>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("❌ **Nie znaleziono użytkownika** ❌");
    let bReason = args.join(" ").slice(22);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ **Nie można zbanować tego użytkownika** ❌");
    
    message.delete().catch(O_o=>{});
    
    try{
        let DMbanEmbed = new Discord.RichEmbed()
        .setColor("#ffa500")
        .setTitle("__**ZOSTAŁEŚ ZBANOWANY**__")
        .addField("Serwer", `**${message.guild.name}**`)
        .addField("Zbanowany Przez", `<@${message.author.id}>`)
        .addField("Powód", bReason)
        .setTimestamp(message.createdAt)
        .setFooter('Zostałeś zbanowany!', `[config.avatar]`);
        await bUser.send(DMbanEmbed)
    }catch(e){
        message.channel.send(`Użytkownik został zbanowany na **BlaKi's Discord** ale niestemy ma zablokowane wiadomości prywatne.`)
    }

    let banEmbed = new Discord.RichEmbed()
    .setColor("#ffa500")
    .addField("Zbanowany Użytkownik", `${bUser}`)
    .addField("Zbanowany Przez", `<@${message.author.id}>`)
    .addField("Zbanowany Na", message.channel)
    .addField("Powód", bReason)
    .setTimestamp(message.createdAt)
    .setFooter('Zbanowano Użytkownika', `[config.avatar]`);

    let incidentchannel = message.guild.channels.find(`name`, "📕  »  ᴅᴢɪᴇɴɴɪᴋ  ᴢᴅᴀʀᴢᴇɴ");
    if(!incidentchannel) return message.channel.send("❌ **Proszę utworzyć kanał zdarzeń** ❌");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
