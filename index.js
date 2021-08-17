const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const ms = require("ms");
const fs = require("fs");
client.commands = new Discord.Collection();
var moment = require('moment');



fs.readdir("./commands/", (err, files) => {
   if(err) console.log(err);

   let jsfile = files.filter(f => f.split(".").pop() === "js")
   if(jsfile.length <= 0){
     console.log("Couldn't Find Commands.");
     return;
   }

   jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded.`);
    client.commands.set(props.help.name, props);
   });


});
client.on("ready", async () => {
  console.log(`${client.user.username} is online!`);

  client.user.setActivity("Vice Discord!", {type: "WATCHING"});

});

  
  client.on("message", async message => {
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);

  });

//queue 1

let getjointime = [0];

function cleanDate(a)
{
  var d = new Date(a);
  var c = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  return c;
}

client.on("message", async message =>
{
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];


    if(cmd === `${prefix}lobby1`)
    {

      let membersInChannel = message.guild.members.filter(n => n.voiceChannelID === "698323056484941914");
      let membersInQueue = membersInChannel.map(n =>  `(` + moment(getjointime[n]).format('LTS') + `) ` + n.displayName);
   
      const embed = new Discord.RichEmbed()
        .setTitle("Lobby 1 - Player List")
        .setColor("#FEE354")
        .setDescription(membersInQueue.join("\n"))
        .setFooter('Vice Valorant 10mans/Scrims ');
    return message.channel.send({embed});
    }
});
client.on('voiceStateUpdate', (oldMember, newMember) =>
{
    console.log('voiceStateUpdate enterance');
    if(oldMember.voiceChannel === undefined || oldMember.voiceChannelID !== newMember.voiceChannelID)
    {
      console.log('voiceStateUpdate inside 1st if');
      if(newMember.voiceChannel === undefined || newMember.voiceChannelID !== "698323056484941914")
        return;

      //console.log('[DEBUG]Console: ' + newMember.displayName + ' joined voice channel 10 man queue #1.');
      let queue1embed = new Discord.RichEmbed()
      .setColor("#FEE354")
      .setDescription (`${newMember.displayName} joined queue 1.`)
      .setTimestamp();
          
      const m = newMember.guild.channels.get('698328958805999617').send(queue1embed)
              .then((msg) => {
                  getjointime[newMember] = msg.createdTimestamp;
      });
    }
});



//queue EUUUUU
// Added by SeaC


client.on("message", async message =>
{
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;


    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];

    if(cmd === `${prefix}lobby2`)
    {
      let membersInChannel = message.guild.members.filter(n => n.voiceChannelID === "822288145374511114");
      let membersInQueue = membersInChannel.map(n =>  " (" + moment(getjointime[n]).format('LTS') + ") " + n.displayName);

      const embed = new Discord.RichEmbed()
        .setTitle("Lobby 2 - Player List")
        .setColor("#FEE354")
        .setDescription(membersInQueue.join("\n"))
        .setFooter('Vice Valorant 10mans/Scrims');

      return message.channel.send({embed});
    }
});
//queue2
client.on('voiceStateUpdate', (oldMember, newMember) =>
{
    if(oldMember.voiceChannel === undefined || oldMember.voiceChannelID !== newMember.voiceChannelID)
    {
      if(newMember.voiceChannel === undefined || newMember.voiceChannelID !== "822288145374511114")
        return;

      //console.log('[DEBUG]Console: ' + newMember.displayName + ' joined voice channel 10 man queue #2.');
      let queue1embed = new Discord.RichEmbed()
      .setColor("#FEE354")
      .setDescription (`${newMember.displayName} joined queue 2.`)
      .setTimestamp();
          
      const m = newMember.guild.channels.get('698328958805999617').send(queue1embed)
              .then((msg) => {
                  getjointime[newMember] = msg.createdTimestamp;
      });
    }
});
//RIOT COMMAND
 client.on("message", async message => {
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    
    let botpfp = client.user.displayAvatarURL;
    const correctcommand = new Discord.RichEmbed()
    .setThumbnail(botpfp)
    .setColor("00FF00")
    .addField("**Riot Nickname Set**", "Your nickname has been changed in Vice Valorant 10mans/Scrims\nif you made an error while entering your name and id, you can redo the command at anytime. ")
    .setTimestamp()
    .setFooter('Vice Valorant 10mans/Scrims');
           
    const notcorrectcommand = new Discord.RichEmbed()
    .setThumbnail(botpfp)
    .setColor("DC143C")
    .addField("**Riot Nickname Error**", "You incorrectly used the !riot command, please retry the command with the following arguments \n**!riot (Username)#(Clientid)**")
    .setTimestamp()
    .setFooter('Vice Valorant 10mans/Scrims');
    
    if(message.channel.id === '808936463416557589'){
      if(message.author.bot) return;
      if (message.content.includes ("!riot")) {
          message.member.setNickname(message.content.replace("!riot", ''));     
         message.channel.type === ("dm") + message.author.sendMessage(correctcommand);
         await message.delete(5000)
      }
      else{
        if (message.content.includes != "!riot");
        await message.delete()
          message.channel.type === ("dm") + message.author.sendMessage(notcorrectcommand);
        }
      }
    });
//D BUMP COMMAND



client.on("message", async message => {
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let hours = ("2h");
  let dbump = (`${prefix}d`)
  if(cmd === dbump){
 
    let tempTime = hours;
   
    if(message.member.roles.find(role => role.name === "Owners") ||
        message.member.roles.find(role => role.name === "Staff") ||
        message.member.roles.find(role => role.name === "Hosts"))
    {
       
        const embed = new Discord.RichEmbed()
            .addField(`**Server Bumped**`, `Disboard has been bumped. Starting 2 hour timer`)
            .setColor("#FF0000");
        message.channel.send({embed})
       
        setTimeout(function()
        {
            message.channel.send(`@here, The server bump has expired. use the command **!d bump** to re-bump!\nalso bump here! https://discordservers.com/server/698321471881347094/bump`);
        }, ms(tempTime));
      }
    } 
    });
 client.on("message", async message => {
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let thecommand = (`${prefix}alkdfjaoeanoaoelancei`)
    if(cmd === thecommand){
       
    let botpfp = client.user.displayAvatarURL;
    const test= new Discord.RichEmbed()
    .setThumbnail(botpfp)
    .setColor("F8C300")
    .addField("**Set Your Riot Name**", "\nSet your nickname so players can find you easily by using the command \n\n***!riot (Username)#(Clientid)***")
    .setTimestamp()
    .setFooter('Vice Valorant 10mans/Scrims');
    message.channel.send(test)
    }
});


client.on('message', (message) => {
    if(message.content == 'all good') {
        message.reply('All good.');
    }
});
   if(cmd === `${prefix}testlobby`)
	{
		let membersInChannel = message.guild.members.cache.filter(n => n.voice.channelID === "822288145374511114");
		let membersInQueue = membersInChannel.map(n => n.displayName + " (" + cleanDate(getjointime[n]) + ")");

		const embed = new Discord.MessageEmbed()
		.setTitle("Current Queue #1")
		.setColor("#FEE354")
        .setDescription(membersInQueue.join("\n"))
        .setTimestamp()

		return message.channel.send({embed});
	}

bot.on('voiceStateUpdate', (oldState, newState) =>
{	
	if(newState.member.voice.channelID === "822288145374511114") // Voice channel for queue
	{
		console.log('[DEBUG]Console: ' + newState.member.displayName + ' joined lobby 1.');
		const m = newState.member.guild.channels.cache.get('771545218642214924').send(newState.member.displayName + ' joined lobby 1.')
              .then((msg) => {
                  getjointime[newState.member] = msg.createdTimestamp;
      });
	}
});

client.login(process.env.bot_token);
