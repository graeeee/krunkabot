const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    let botpfp = client.user.displayAvatarURL;
    let demoembed = new Discord.RichEmbed()
    .setTitle("**Donate to the server**")
    .setColor("#808080")
    .setDescription("https://donatebot.io/checkout/698321471881347094?")
    .setTimestamp()
    .setFooter('Vice Valorant 10mans/Scrims');
    message.channel.send(demoembed);
}
    module.exports.help = {
        name: "donate"
    }
