const blakiconfig = require("./blakiconfig.json");
const Fortnite = require("fortnite-publicapi");
const Discord = require('discord.js');
const blaki = new Discord.Client({disableEveryone: false});
const shop = require("./shop.json");
require('dotenv-flow').config();

const fs = require("fs");
blaki.commands = new Discord.Collection();

const config = {
    token: process.env.TOKEN
};

let date = require('date-and-time');

const aktywnosc = [
    "KOD BLAKI W SKLEPIE 🖤", 
    "KOD BLAKI W SKLEPIE 🍁", 
    "KOD BLAKI W SKLEPIE 💚",
    "KOD BLAKI W SKLEPIE 💛",
    "KOD BLAKI W SKLEPIE 💜",
    "KOD BLAKI W SKLEPIE 💗",
    "KOD BLAKI W SKLEPIE 💝"
];


blaki.on('ready', async () => 
{
  console.log(`${blaki.user.username} jest online!`);
  setInterval(function() {
        var actID = Math.floor(Math.random() * Math.floor(aktywnosc.length));
        blaki.user.setActivity(aktywnosc[actID], {type: 'WATCHING'});
    }, 10000);
  
    setInterval(async () => {
      Fortnite.FortniteStore('en', async (data) => {
        data = JSON.parse(data);
        let channel = blaki.channels.find('id', shop.channelid);
        if(channel) {
          if(channel.topic !== data['date']){
            channel.setTopic(data['date']);
            var list = [];
            data['items'].forEach(async element => {
              await list.push(element.item.images.information);
            });
            channel.bulkDelete("50");
            list.forEach(async element => {
               let bEmbed = new Discord.RichEmbed()
               .setColor("#ff005c")
               .setTitle(`**SKLEP ${data['date']}**`)
               .setDescription("**KOD W SKLEPIE BLAKI**")
               .setImage(`${element}`)
               .setFooter('Wspieraj Najlepszego Twórcę!', `${blakiconfig.avatar}`);
               await channel.send(bEmbed);
            });
          }
        }
      });
    }, shop.refresh*1000);
    
  const guild = blaki.guilds.get('535089879420502017');
  setInterval(function() 
  {
    let now = new Date();
    const DateChannel = blaki.channels.get("569618740631699486");
    const HumansChannel = blaki.channels.get("535591376373678084");
    const OnlineChannel = blaki.channels.get("535591322430734349");
    var HumansCount = guild.memberCount;
    var OnlineCount = guild.members.filter(member => member.presence.status == 'online' || member.presence.status == 'idle' || member.presence.status == 'dnd').size
    DateChannel.setName("📅 " + date.format(now, 'DD.MM.YYYY'));
    OnlineChannel.setName("💚 Aktywni: " + OnlineCount);
    HumansChannel.setName("👑 Jest Nas: " + HumansCount);
  }, 20000)
});

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`Poprawnie załadowano ${f}!`);
    blaki.commands.set(props.help.name, props);
  });

});

blaki.on("message", async message => {
    
    if(message.author.blaki) return;
    if(message.channel.type === "dm") return;

    let content = message.content.toLowerCase().split(" ")[0];
    let kanal = blaki.channels.get("535153796129619969");
    if(content === "siema" || content === "hejka" || content === "elo" || content === "hi" || content === "yo" || content === "witam" || content === "hej"){
        kanal.send("Hejkaa " + message.author);
    }
    if(content === "dobranoc"){
        kanal.send("Dobranooc i Kolorowych Snów ! 💖")
    }

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: blakiconfig.prefix
      };
    }

    let prefix = prefixes[message.guild.id].prefixes;
    if(!message.content.startsWith(prefix)) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
    let commandfile = blaki.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(blaki,message,args);
});

blaki.on('guildMemberAdd', async (member) => {
    const ramka = "``"
    const rangi = `> Na kanale ${ramka}📂 ➜ ᴏᴅʙɪᴇʀᴢ ʀᴏʟᴇ${ramka} odbierasz rangi klikając w reakcję!`
    let WitamyKanal = blaki.channels.get("535152553248423946");
    let Witamy = new Discord.RichEmbed()
    .setColor("#FFA500")
    .setTitle(`**WITAMY NA SERWERZE** ${ramka}${member.guild.name}${ramka}`)
    .addField("**NOWY UŻYTKOWNIK!**", `> Baw się dobrze **${member}** 💕` + `\n` + `\n` + rangi)
    .setFooter("Zapoznaj się również z Regulaminem Serwera!", `${blakiconfig.avatar}`);
    WitamyKanal.send(Witamy);
});

blaki.login(config.token);
