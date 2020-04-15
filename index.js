const botconfig =require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const ms = require("ms");
//10man ban command
//
client.on("ready", async () => {
  console.log(`${client.user.username} is online!`);

  client.user.setActivity("Vice's Valorant Discord!", {type: "WATCHING"});

});
client.on("message", async message =>
{
    if(message.author.bot)
        return;
    if(message.channel.type == "dm")
        return;
       
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
       
    if(cmd === `${prefix}gameban`)
    {
       
        let tempUser = message.mentions.members.first();
        let tempTime = args[1];
        let tempRole = message.guild.roles.find(role => role.name === "gameban");
        let tempReason = args[2];
       
        if(message.member.roles.find(role => role.name === "Founders") ||
            message.member.roles.find(role => role.name === "Admins"))
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
});





//information channel
//
client.on("message", async message => {
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let information = (`${prefix}adfasfasdfasdfasdieno`)
             
              if(cmd === information){
    let botpfp = client.user.displayAvatarURL;
    let demoembed = new Discord.RichEmbed()
    .setThumbnail(botpfp)
    .setTitle("**Raidboss Information**")
    .setColor("#808080")
    .addField("**Channel Information**", "\n<#187595606573842432> - Just what it suggests, a general chat. Please no images or videos here.\n\n<#421469485610958848> - Use the support Channel for any requests or support needs (unbans, reports, 10 man roles, etc)\n\n<#397912711524253696> - Use this channel to find people to play or to get involved in a 10 man\n\n<#372976620257935360> - All memes, images, videos, and other off-topic stuff")
    .addBlankField()
    .addField("**Roles Information**", "\n<@&190805090464956416> - The Mad King\n\n<@&339524053146664960> - Head Admins\n\n <@&190805575523762176> - Admins (5v5)\n\n<@&445925181966516244> - Admins (surf)\n\n<@&496135647870844928> - 10 man Hosts\n\n<@&482947162947190802> - 10man Regulars/Long Time Players\n\n<@&563707849784426506> - 10man Players\n\nAny other roles, are self assigned, in this channel <#524911345708171285>.")
    .addBlankField()
    .addField("**Important Links**", "\nCommunity Rules - [__raidboss.org/rules__](http://raidboss.org/rules)\nServer Lineup - [__raidboss.org/servers__](http://raidboss.org/servers)\nServer Demos - [__raidboss.org/demos__](http://raidboss.org/demos)\nSever Bans - [__raidboss.org/bans__](http://raidboss.org/bans)\nAll-time Stats - [__raidboss.org/stats__](http://raidboss.org/stats)\n5v5 Monthly Ladder - [__raidboss.org/ladder__](http://raidboss.org/ladder)\n10 Man Rules - [__raidboss.org/10man__](http://raidboss.org/10man)\nVIP/Donation - [__raidboss.org/vip__](http://raidboss.org/donate)\nApply for Admin - [__raidboss.org/membership__](https://raidboss.org/membership)")
    .setTimestamp()
    .setFooter('Raidboss', botpfp);
    message.channel.send(demoembed);
              }
});
//queue 1
// Added by SeaC

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

    if(cmd === `${prefix}queue1`)
    {
      let membersInChannel = message.guild.members.filter(n => n.voiceChannelID === "698323056484941914");
      let membersInQueue = membersInChannel.map(n => n.displayName + " (" + cleanDate(getjointime[n]) + ")");

      const embed = new Discord.RichEmbed()
        .setTitle("Queue #1")
        .setColor("#FF0000")
        .setDescription(membersInQueue.join("\n"))
        .setTimestamp()
    if(!membersInQueue) return message.channel.send({embed});
      else message.channel.send("No perms");
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
      .setDescription (`${newMember.displayName} joined queue #1.`)
      .setTimestamp();
          
      const m = newMember.guild.channels.get('698328958805999617').send(queue1embed)
              .then((msg) => {
                  getjointime[newMember] = msg.createdTimestamp;
      });
    }
});
//queue 2
// Added by SeaC

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

    if(cmd === `${prefix}queue2`)
    {
      let membersInChannel = message.guild.members.filter(n => n.voiceChannelID === "698323700025524345");
      let membersInQueue = membersInChannel.map(n => n.displayName + " (" + cleanDate(getjointime[n]) + ")");

      const embed = new Discord.RichEmbed()
        .setTitle("Queue #2")
        .setColor("#FF0000")
        .setDescription(membersInQueue.join("\n"))
        .setTimestamp()

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
      .setDescription (`${newMember.displayName} joined queue #2.`)
      .setTimestamp();
          
      const m = newMember.guild.channels.get('698328958805999617').send(queue1embed)
              .then((msg) => {
                  getjointime[newMember] = msg.createdTimestamp;
      });
    }
});

client.login(process.env.bot_token);
