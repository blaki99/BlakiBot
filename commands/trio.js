const Discord = require("discord.js");
const config = require("../blakiconfig.json");

module.exports.run = async (blaki, message, args) => {
    
    message.delete().catch(O_o=>{});
    let TrioEmbed = new Discord.RichEmbed()
    .setColor("#FF0000")
    .addField("__**TRIO SQUAD:**__", "• BlaKi" + `\n` + "• Matek" + `\n` + "• Kogutzz")
    .setTimestamp(message.createdAt)
    .setImage('https://i.imgur.com/DBQt3ci.jpg')
    .setFooter("Kiedyś będziemy TOP #1", `${config.avatar}`);

    message.channel.send(TrioEmbed);
}

module.exports.help = {
  name:"trio"
}
