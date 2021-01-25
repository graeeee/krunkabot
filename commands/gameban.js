const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
 
    let tempUser = message.mentions.members.first();
    let tempTime = args[1];
    let tempRole = message.guild.roles.find(role => role.name === "gameban");
    let tempReason = args[2];
   
    if(message.member.roles.find(role => role.name === "Owners") ||
        message.member.roles.find(role => role.name === "Staff"))
    {
        if(!tempUser)
            return message.channel.send('Invalid Usage, `!gameban <@User#1234> <time> <reason>`');
       
        if(!tempTime)
            return message.channel.send('Invalid Usage, `!gameban <@User#1234> <time> <reason>`');

        if(!tempReason)
        {
            tempReason = "N/A";
        }
       
        await(tempUser.addRole(tempRole.id).catch(console.error));
       
        const embed = new Discord.RichEmbed()
            .setTitle(`User has been banned from 10mans`)
            .setColor("#FF0000")
            .setThumbnail(tempUser.user.avatarURL)
            .addField(`User:`, `<@${tempUser.id}>`, true)
            .addField(`Admin:`, `${message.author}`, true)
            .addField(`Length:`, `${tempTime}`, true)
            .addField(`Reason:`, `${tempReason}`, true)
        message.channel.send({embed})
        const DMembed = new Discord.RichEmbed()
            .setColor("#008000")
            .setDescription(`**You have been banned from 10mans, if you would like to appeal or have any questions about the ban, please contact any admins, mods, or owner about your situation in <#698332345916456972> **\n\n**Length:** ${tempTime}\n\n**Admin/Mod:** ${message.author}\n\n**Reason:** ${tempReason}`);
        tempUser.sendMessage(DMembed);
       
        setTimeout(function()
        {
            tempUser.removeRole(tempRole.id);
            message.channel.send(`<@${tempUser.id}>'s ban has now expired.`);
        }, ms(tempTime));
    }
    else
    {
        message.channel.send("No permission.");
    }
}

module.exports.help = {
    name: "gameban"
}
