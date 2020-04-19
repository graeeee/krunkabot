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


    if(cmd === `${prefix}naqueue`)
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
      .setDescription (`${newMember.displayName} joined queue NA.`)
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

    if(cmd === `${prefix}euqueue`)
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

      //console.log('[DEBUG]Console: ' + newMember.displayName + ' joined voice channel 10 man queue #1.');
      let queue1embed = new Discord.RichEmbed()
      .setColor("#FF0000")
      .setDescription (`${newMember.displayName} joined queue EU.`)
      .setTimestamp();
          
      const m = newMember.guild.channels.get('698328958805999617').send(queue1embed)
              .then((msg) => {
                  getjointime[newMember] = msg.createdTimestamp;
      });
    }
});


//!riot command
client.msgs = require ("./msgs.json");
client.on("message", async message =>
{
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
let member;
if (message.mentions.users.first()) {
  member = message.mentions.users.first();
} else {
  member = message.author
}
if (message.content.startsWith (`${prefix}setriot`)) {
    editedmessage = message.content.slice (8);

    client.msgs [message.member.username] = {
      message: editedmessage
    }
    fs.writeFile ("./msgs.json", JSON.stringify (client.msgs, null, 4), err => {
      if (err) throw err;
      message.channel.send('**Your Riot Account has been linked to this discord account, if you messed up or changed accounts, you can redo the command at anytime**');
});
    }
    if(cmd === `${prefix}getriot`) {
    let _message = client.msgs [message.member.username].message;
    message.channel.send (`${member}'s Riot is:` + _message);
    }
});


//on join message
client.on("guildMemberAdd", function(message) {
    
    let guild = message.guild;
    let member = message;
    let membercount = client.users.size;
    let botpfp = client.user.displayAvatarURL;

    const joinembed = new Discord.RichEmbed()
    .setColor("#FF0000")
    .setDescription(`**Welcome ${member.user} to Vice Valorant 10mans/Scrims!**\nIf you have any questions or want to join our 10mans, send a message in our <#698332345916456972> chat including your Riot Name and ID. Have Fun!`)
    .setThumbnail(botpfp)
    .setFooter("Vice Valorant 10mans/Scrims")
    .setTimestamp;
    member.sendMessage(joinembed);
});

client.login(process.env.bot_token);
