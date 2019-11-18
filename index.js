const botconfig =require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const ms = require("ms");

client.on("ready", async () => {
  console.log(`${client.user.username} is online!`);

  client.user.setActivity("the Official Krunker Krosshair Discord!", {type: "WATCHING"});

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
       
    if(cmd === `${prefix}mute`)
    {
       
        let tempUser = message.mentions.members.first();
        let tempTime = args[1];
        let tempRole = message.guild.roles.find(role => role.name === "Muted");
       
        if(message.member.roles.find(role => role.name === "Founders") ||
            (message.member.roles.find(role => role.name === "Moderators") ))
        {
            if(!tempUser)
                return message.channel.send('Invalid Usage, **!mute <@User#1234> <time>**');
           
            if(!tempTime)
                return message.channel.send('Invalid Usage, **!mute <@User#1234> <time>**');
           
            await(tempUser.addRole(tempRole.id).catch(console.error));
           
            message.channel.send(`<@${tempUser.id}> has been muted for ${tempTime}.`)
           
            setTimeout(function()
            {
                tempUser.removeRole(tempRole.id);
            }, ms(tempTime));
        }
        else
        {
            return;
        }
      }
});
client.on("message", async message => {
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let information = (`${prefix}adfasfasdfasdfasdieno`)
             
              if(cmd === information){
                if(message.member.roles.find(role => role.name === "Founders"))
    let botpfp = client.user.displayAvatarURL;
    let demoembed = new Discord.RichEmbed()
    .setThumbnail(botpfp)
    .setTitle("**Discord Information**")
    .setColor("#FEE267")
    .addField("<:raidboss:392574240643219456> **Channel Information**", "\n<#644966571235868685> - Just what it suggests, a general chat. Please no images or videos here.\n\n<#645077178953891850> - List of frequently asked questions, if a question is not answered that you would like to ask create a ticket or DM a mod/founder.\n\n<645098695926218762> - Have a question? Use this channel and react to the message to create a support ticket.\n\n<#645407049462710282> - Any important updates to the discord or special messages we need to get out to the discord server.")
    .addBlankField()
    .addField("<:raidboss:392574240643219456> **Roles Information**", "\n<@&645071126539534336> - The creators/founders of the discord, otherwise known as owners.\n\n<@&645073100874186764> - The moderators of the discord, keeps the discord nice and tidy.\n\n<@&645364639798132846> - Discord server booster, given special role for their generosity.\n\n<@&645072655967453188> - Image verified users, can post pictures in the Verified Images category.")
    .addBlankField()
    .addField("<:raidboss:392574240643219456> **Basic Rules (Not all included)**", "\n**1 -** No racism\n\n**2 -**No doxing\n\n**3 -** No spam\n\n**4 -** No NSFW images/chats (porn, gore etc.)\n\n**5 -** No harassment")
    .setTimestamp()
    .setFooter('Krunker Krosshair', botpfp);
    message.channel.send(demoembed);
              }
});
client.login(process.env.bot_token);
