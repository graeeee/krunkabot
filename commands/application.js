const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    const questions = [
      "What is your discord name and ID? Ex. (username#4321)",
      "What is your riot name and ID? Ex. (username#1234)",
      "Have you read the rules on our website? ( https://vicevalorant.com/10mans )?",
      ];
    
    let collectCounter = 0;
    let endCounter = 0;
    
    const filter = (m) => m.author.id = message.author.id;
    
    const appStart = await message.author.send(questions[collectCounter++]);
    const channel = appStart.channel;
    
    const collector = channel.createMessageCollector(filter);
    
    collector.on("collect", () => {
      if(collectCounter < questions.length) {
        channel.send(questions[collectCounter++]);
      } else {
        channel.send("Your Application has been sent, please wait till a host or admin recieves your request.");
        collector.stop("fullfilled");
      }
    });
    
    const appsChannel = client.channel.cache.get((ch) => ch.name === '10-man-apps');
    collector.on("end", (collected, reason) => {
              if (reason === "fulfilled") {
                 let index = 1;
                 const mappedResponses = collected.map((msg) => {
                     return `${index++}) ${questions[endCounter++]}\n-> ${msg.content}`
                 }).join("\n\n");
              }
  
            appsChannel.send(
                new MessageEmbed()
                  .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
                  .setTitle("User applied for 10man")

                  .setDescription(mappedResponses)
                  .setColor("#ffd253")
                  .setTimestamp()
                        );
                 });
            },
    module.exports.help = {
        name: "apply"
    }

