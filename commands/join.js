const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    let botpfp = client.user.displayAvatarURL;
    let demoembed = new Discord.RichEmbed()
    .setTitle("**How to join 10mans**")
    .setColor("#fee354")
    .addField("**Step 1**", "Read all the rules on our website (https://vicevalorant.com/10mans)")
    .addField("**Step 2**", "After you are finished read the rules, send a message in the <#822290384964943873> channel saying you have read the rules fully.")
    .addField("**Step 3**", "Post your current riot name and id ***(e.g., username#1234)***, and thats it!")
    .addField("**Step 4**", "Patiently wait for a host to see your messages, and they will give you access to the lobby voice channels.")    
    .setTimestamp()
    .setFooter('This message will delete in 1 minute to prevent spam', botpfp);
    message.channel.send(demoembed);
    await message.delete(1000)
    await demoembed.delete(1000)
}
    module.exports.help = {
        name: "join"
    }
