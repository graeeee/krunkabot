const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {


    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let kickeduser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kickeduser) message.channel.send("No user found.");
    let kickedreason = args.join(" ").slice(22);
    if (!kickedreason) message.channel.send("No reason listed.");


    if(message.member.roles.find(role => role.name === "Founders") ||
    message.member.roles.find(role => role.name === "Staff"))
    {


    let botpfp = client.user.displayAvatarURL;
    let kickembed = new Discord.RichEmbed()
    .setTitle(`User Kicked`)
    .setColor("#FF0000")
    .addField(`Kicked User`, `${kickeduser}`)
    .addField(`Kicked By`, `${message.author}`)
    .addField(`Reason`, `${kickedreason}`)
    .setTimestamp()
    .setFooter('Kick System', botpfp);

    message.channel.send(kickembed);

    message.guild.member(kickeduser).kick(kickedreason);
}
else
{
    message.channel.send("No permission.");
}
}
module.exports.help = {
    name: "kick"
}
