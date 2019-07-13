const Discord = require("discord.js");
const Fortnite = require("fortnite-publicapi");
const shop = require("../shop.json");

module.exports.run = async (blaki, message, args) => {
  message.delete().catch(O_o=>{});
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

            list.forEach(async element => {
               let bEmbed = new Discord.RichEmbed()
               .setColor("#18a6e8")
               .setTitle("shop.msg.replace(`{DATE}`, `**${data['date']}**`")
               .setDescription("**KOD W SKLEPIE BLAKI**")
               .setImage(`${element}`)
               .setTimestamp(message.createdAt)
               .setFooter('Wspieraj Najlepszego Twórcę!', 'https://i.imgur.com/cgF1hsE.png');
               await channel.send(bEmbed);
            });
          }
        }
      });
}

module.exports.help = {
  name: "sklep"
}