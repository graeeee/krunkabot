const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    let botpfp = client.user.displayAvatarURL;
    let demoembed = new Discord.RichEmbed()
    .setTitle("**10man/Server Rules**")
    .setColor("#808080")
    .setDescription("https://vicevalorant.com/10mans/")
    .setTimestamp()
    .setFooter('Vice Valorant 10mans/Scrims');
    message.channel.send(demoembed);
}
    module.exports.help = {
        name: "rules"
    }
