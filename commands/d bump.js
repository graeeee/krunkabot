const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

 
const ms = require("ms");

module.exports.run = async (client, message, args) => {
 
let tempTime = ms('1m');

       
const embed = new Discord.RichEmbed()
    .setColor("#FF0000")
    .setThumbnail(tempUser.user.avatarURL)
    .addField(`Server Bumped`, `The server was recently bumped. Timer has been reset`, true)
    .setTimestamp();
message.channel.send({embed})

setTimeout(function()
{
    message.channel.send("@ here, do the command **!d bump** as soon as possible. Thanks!");
}, ms(tempTime));


module.exports.help = {
name: "d bump"
}
