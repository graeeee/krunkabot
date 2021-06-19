const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('message', (message) => {
    if(message.content == 'all good') {
        message.reply('All good.');
    }
    module.exports.help = {
        name: "allgood"
    }

