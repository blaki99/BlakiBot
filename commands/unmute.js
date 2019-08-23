const Discord = require("discord.js");
const config = require("../blakiconfig.json");

module.exports.run = async (blaki, message, args) => {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("❌ **Nie można wykonać akcji** ❌");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("❌ **Nie znaleziono użytkownika** ❌");
  let role = message.guild.roles.find(role => role.name === "🔇 » MUTED");
  let gRole = message.guild.roles.find(role => role.name === "🔶️ » VERIFIED");

  if(!rMember.roles.has(role.id)) return message.reply("❌ **Ten użytkownik nie jest wyciszony** ❌");
  await(rMember.removeRole(role.id));
  await(rMember.addRole(gRole.id));

  message.delete().catch(O_o=>{});
  try{
        let DMUnMuteEmbed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setTitle("__**ZDJĘTO WYCISZENIE**__")
        .addField("Serwer", `**${message.guild.name}**`)
        .addField("Wyciszenie zdjął", `<@${message.author.id}>`)
        .setTimestamp(message.createdAt)
        .setFooter('Zdjęto wyciszenie!', `${config.avatar}`);
        await rMember.send(DMUnMuteEmbed)
    }catch(e){
        message.channel.send(`<@${rMember.id}> ma zablokowane wiadomośći prywatne ale wyciszenie zostało zdjęte!`)
  }
  
  let unmuteembed = new Discord.RichEmbed()
  .setDescription(`Wyciszenie zostało zdjęte przez ${message.author}`)
  .setColor("#ff0000")
  .addField("Zdjęto Użytkownikowi", rMember)
  .addField("Zdjęto na", message.channel)
  .setTimestamp(message.createdAt)
  .setFooter('Zdjęto Wyciszenie', `${config.avatar}`);

  let incidentschannel = message.guild.channels.find(`name`, "📕  »  ᴅᴢɪᴇɴɴɪᴋ  ᴢᴅᴀʀᴢᴇɴ");
  if(!incidentschannel) return message.reply("❌ **Proszę utworzyć kanał zdarzeń** ❌");
  incidentschannel.send(unmuteembed);
  
  message.channel.send(`<@${rMember.id}> ponownie ma prawo głosu!`);
  
}

module.exports.help = {
  name: "unmute"
}
