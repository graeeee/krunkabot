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

  client.user.setActivity("Vice's Valorant Discord!", {type: "WATCHING"});

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


    if(cmd === `${prefix}queue`)
    {

      let membersInChannel = message.guild.members.filter(n => n.voiceChannelID === "698323056484941914");
      let membersInQueue = membersInChannel.map(n =>  `(` + moment(getjointime[n]).format('LTS') + `) ` + n.displayName);
   
      const embed = new Discord.RichEmbed()
        .setTitle("Queue NA (EST)")
        .setColor("#FF0000")
        .setDescription(membersInQueue.join(`\n`))
        .setFooter('Vice Valorant 10mans/Scrims ');
    return message.channel.send({embed});
    }
});
//queue1
client.on('voiceStateUpdate', (oldMember, newMember) =>
{
    if(oldMember.voiceChannel === undefined || oldMember.voiceChannelID !== newMember.voiceChannelID)
    {
      if(newMember.voiceChannel === undefined || newMember.voiceChannelID !== "698323056484941914")
        return;

      //console.log('[DEBUG]Console: ' + newMember.displayName + ' joined voice channel 10 man queue #1.');
      let queue1embed = new Discord.RichEmbed()
      .setColor("#FF0000")
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

    if(cmd === `${prefix}queue2`)
    {
      let membersInChannel = message.guild.members.filter(n => n.voiceChannelID === "698323700025524345");
      let membersInQueue = membersInChannel.map(n =>  " (" + moment(getjointime[n]).format('LTS') + ") " + n.displayName);

      const embed = new Discord.RichEmbed()
        .setTitle("Queue EU (EST)")
        .setColor("#FF0000")
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
      if(newMember.voiceChannel === undefined || newMember.voiceChannelID !== "698323700025524345")
        return;

      //console.log('[DEBUG]Console: ' + newMember.displayName + ' joined voice channel 10 man queue #2.');
      let queue1embed = new Discord.RichEmbed()
      .setColor("#FF0000")
      .setDescription (`${newMember.displayName} joined queue 2.`)
      .setTimestamp();
          
      const m = newMember.guild.channels.get('698328958805999617').send(queue1embed)
              .then((msg) => {
                  getjointime[newMember] = msg.createdTimestamp;
      });
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
        message.member.roles.find(role => role.name === "Captains"))
    {
       
        const embed = new Discord.RichEmbed()
            .addField(`**Server Bumped**`, `Disboard has been bumped. Starting 2 hour timer`)
            .setColor("#FF0000");
        message.channel.send({embed})
       
        setTimeout(function()
        {
            message.channel.send(`@here, The server bump has expired. use the command **!d bump** to re-bump!`);
        }, ms(tempTime));
      }
    } 
    });

channel.send({ embed });

});
 client.on("message", async message => {
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if(message.channel.id === '698328586096214098'){
      if(message.author.bot) return;
      if (message.content.includes ("!riot")) {
          message.member.setNickname(message.content.replace("!riot", ''));     
         msg.channel.type === ("dm") + msg.author.sendMessage("Nickname set in Vice Valorant Scrims Discord.");
         await message.member.delete(5000)
      }
      else{
        return;
        }
      }
    });

client.login(process.env.bot_token);
