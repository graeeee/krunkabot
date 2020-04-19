const Discord = require("discord.js");
var moment = require('moment');

module.exports.run = async (client, message, args) => {
    

        let member = message.member.user.tag;
        let user = message.mentions.users.first() || message.author;
    
    let playerpfp = message.author.avatarURL;
    let botpfp = client.user.displayAvatarURL;
    let infoembed = new Discord.RichEmbed()
    .setThumbnail(botpfp)
    .setAuthor(`Vice Valorant Server Information`)
    .setColor(`#808080`)
    .addField(`Server Created`, moment(message.guild.createdAt).format("MMMM Do YYYY, h:mm a"))
    .addField(`Owner/Creator`, `${message.guild.owner}`)
    .addField(`Role Count`, `${message.guild.roles.size}`)
    .addField(`Member Count`, `${message.guild.memberCount}`)
    .setFooter(`Vice Valorant 10mans/Scrims`, client.user.displayAvatarURL)
    .setTimestamp();
    message.channel.send(infoembed);
}
    module.exports.help = {
        name: "serverinfo"
    }
