const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    let botpfp = client.user.displayAvatarURL;
    let demoembed = new Discord.RichEmbed()
    .setThumbnail(botpfp)
    .setTitle("**What you need to do to join our 10mans**")
    .setColor("#808080")
    .setDescription("**(Step 1)** - Read all the rules on our website (https://vicevalorant.com/10mans)\n",
                    "**(Step 2)** - After you are finished read the rules, send a message in the <#822290384964943873> channel,",
                    "mentioning  <@826514977099481099> or <@698333343485395004> telling them you have read the rules fully.\n"
                    "**(Step 3)** - Post your current riot name and id ***(e.g., username#1234)***, and thats it!\n\n",
                    "Patiently wait for a host to see your messages, and they will give you access to the lobby voice channels.")
    .setTimestamp()
    .setFooter('Vice Valorant 10mans/Scrims', botpfp);
    message.channel.send(demoembed);
}
    module.exports.help = {
        name: "howtoplay"
    }
