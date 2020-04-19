const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    let botpfp = bot.user.displayAvatarURL;
    let demoembed = new Discord.RichEmbed()
    .setThumbnail(botpfp)
    .setTitle("**All Commands**")
    .setColor("#808080")
    .addField("!queue", "Shows all the queue commands.")
    .addField("!userinfo", "Shows players info.")
    .addField("!serverinfo", "Shows servers info.")
    .addField("!riot (RiotName#ID)", "Link your riot account to our discord.")
    .setTimestamp()
    .setFooter('Vice Valorant 10mans/Scrims', botpfp);
    message.channel.send(demoembed);
}
    module.exports.help = {
        name: "commands"
    }