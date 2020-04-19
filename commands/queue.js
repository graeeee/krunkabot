const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    let botpfp = client.user.displayAvatarURL;
    let demoembed = new Discord.RichEmbed()
    .setThumbnail(botpfp)
    .setTitle("**Queue Commands**")
    .setColor("#808080")
    .setDescription("**!naqueue**\nShows NA queue players and when they joined.\n\n**!euqueue**\nShows EU queue players and when they joined.")
    .setTimestamp()
    .setFooter('Vice Queue System', botpfp);
    message.channel.send(demoembed);
}
    module.exports.help = {
        name: "queue"
    }
