const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    let botpfp = client.user.displayAvatarURL;
    let demoembed = new Discord.RichEmbed()
    .setThumbnail(botpfp)
    .setTitle("**Queue Commands**")
    .setColor("#808080")
    .setDescription("**!queue1**\nShows Queue 1 players and when they joined.\n\n**!queue2**\nShows Queue 2 players and when they joined.")
    .setTimestamp()
    .setFooter('Vice Queue System', botpfp);
    message.channel.send(demoembed);
}
    module.exports.help = {
        name: "queue"
    }
