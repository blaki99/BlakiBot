const Discord = require("discord.js");
const config = require("../blakiconfig.json");

module.exports.run = async (blaki, message, args) => {
 
    let HOST = message.guild.roles.find("name", "🔌 » HOST");
 
    let pass = (args[0]);
    let game = args.slice(1).join(' ')
    let everyone = message.guild.defaultRole;
    const zasady0 = "> **» NIE** UŻYWAJ ROBOTÓW PODCZAS GRY !"
    const zasady1 = "> **» NIE** UDOSTĘPNIAJ NIKOMU HASŁA DO GRY !"
    const zasady2 = "> **» NIE** STREAMSNIPUJ INNYCH GRACZY !"
    const zasady3 = "> **» NIE** UŻYWAJ TRYBU ANONIMOWEGO PODCZAS GRY !"
    const zasady4 = "> **» NIE** BIJEMY SIĘ NA PIERWSZYCH MIEJSCÓWKACH !"
    const zasady5 = "> **» NIE** WALCZ DOPÓKI NIE ZAMKNIE SIĘ 2 STREFA!"
    const zasady6 = "> **» NIE** WALCZ PRZED 3 STREFĄ JEŚLI WŁĄCZY SIĘ STORM SURGE!"
    const zasady7 = "**NIESTOSOWANIE SIĘ DO POWYŻSZYCH ZASAD BĘDZIE KARANE !**"
    const react = '💛'
  
    if(!message.member.roles.has(HOST.id)) return message.reply("Ooops, nie posiadasz uprawnień!");
    if(!args[0]) return message.channel.send("❌ _Wprowadź prawidłowe wartości, **.solo hasło **_ ❌").then(() =>
    {
        message.channel.send("❌ _**Utwórz hasło, które nie będzie za krótkie!**_ ❌");
    })
    message.delete();
    let customEmbed = new Discord.RichEmbed()
    .setColor("#ffa500")
    .setThumbnail('https://i.imgur.com/rmxBcdK.png')
    .setTitle(`**ARENA SOLO CUSTOM - GAME #${game}**`)
    .setURL('https://discord.gg/u9W8euF')
    .addField("**HASŁO:**", `**${pass}**`, true)
    .addField("**HOST:**", `${message.author}`, true)
    .addField("**ZASADY:**", zasady0 + `\n` +zasady1 + `\n`+ zasady2 + `\n`+ zasady3 + `\n`+ zasady4 + `\n`+ zasady5 + `\n`+ zasady6 + `\n`+ `\n`+ zasady7)
    .setTimestamp(message.createdAt)
    .setFooter("Kliknij reakcje jeśli grasz", `${config.avatar}`);
    message.channel.send(everyone.toString());
    message.channel.send(customEmbed).then(function (message) {
        message.react(react)
    })
}
 
module.exports.help = {
    name: "solo"
}
