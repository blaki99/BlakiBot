const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("❌ **Nie można wykonać akcji** ❌");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("❌ **Nie znaleziono użytkownika** ❌");
  let role = message.guild.roles.find(role => role.name === "MUTED");
  let gRole = message.guild.roles.find(role => role.name === "VERIFIED 🔶️");

  if(!rMember.roles.has(role.id)) return message.reply("❌ **Ten użytkownik nie jest wyciszony** ❌");
  await(rMember.removeRole(role.id));
  await(rMember.addRole(gRole.id));
  
  message.delete().catch(O_o=>{});
  
  try{
    await rMember.send(`Twoje wyciszenie na serwerze **BlaKi's Discord** zostało zjdęte!`)
  }catch(e){
    message.channel.send(`<@${rMember.id}> ma zablokowane wiadomośći prywatne ale wyciszenie zostało zdjęte!`)
  }
  
  let unmuteembed = new Discord.RichEmbed()
  .setDescription(`Wyciszenie zostało zdjęte przez ${message.author}`)
  .setColor("#ff3300")
  .addField("Zdjęto Użytkownikowi", rMember)
  .addField("Zdjęto na", message.channel)
  .setTimestamp(message.createdAt)
  .setFooter('Zdjęto Wyciszenie', 'https://i.imgur.com/7xm6SSI.png');

  let incidentschannel = message.guild.channels.find(`name`, "📕  »  ᴅᴢɪᴇɴɴɪᴋ  ᴢᴅᴀʀᴢᴇɴ");
  if(!incidentschannel) return message.reply("❌ **Proszę utworzyć kanał zdarzeń** ❌");
  incidentschannel.send(unmuteembed);
  
}

module.exports.help = {
  name: "unmute"
}