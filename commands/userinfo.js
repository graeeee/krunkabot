const Discord = require("discord.js");
var moment = require('moment');

module.exports.run = async (client, message, args) => {
    

        let member = message.member.user.tag;
        let user = message.mentions.users.first() || message.author;
    
    let playerpfp = message.author.avatarURL;
    let botpfp = client.user.displayAvatarURL;
    let infoembed = new Discord.RichEmbed()
    .setThumbnail(botpfp)
    .setAuthor(`${member}'s Information`, playerpfp,)
    .setColor(`#808080`)
    .addField(`Username`, user.username, true)
    .addField("Account Created", moment(user.createdAt).format("MMMM Do YYYY, h:mm a", true))
    .addField(`Joined Server`, moment(message.guild.members.get(user.id.joinedAt)).format("MMMM Do YYYY, h:mm a", true))
    .setTimestamp();
    message.channel.send(infoembed);
}
    module.exports.help = {
        name: "userinfo"
    }
