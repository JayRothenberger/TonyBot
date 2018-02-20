// Load up the discord.js library
const Discord = require("discord.js");
var owjs = require('overwatch-js');
const client = new Discord.Client();
const config = require("./config.json");


// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.


// Here we load the config.json file that contains our token and our prefix values. 

// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`on ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`on ${client.guilds.size} servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  //message.channel.send("message: "+message.content);
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
   // message.channel.send("command: "+command)
   // message.channel.send("arguments: "+args)
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  if(command.toLowerCase() === "thanks"){
      
      message.reply("No problem.")
      
      
  }
  if(command === "ping") {
                owjs
                .get('pc', 'na', 'Nothx-11270')
                .then((data) => console.log(data) );
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
      console.log(message.author.username + ";" + message.author.discriminator)
  }
    
    if(command === "what"|| command === "what's"){
        console.log(command + " " +args.join(" ").toLowerCase())
        console.log(args.join(" ").toLowerCase().match(RegExp('[a-z.]*')))
        
        var r = RegExp('is my sr\?[A-Za-z]*(-|#)[0-9]*');
        var tagR = RegExp('[A-Za-z]*(-|#)[0-9]*');
        
        
        if(args.join(" ").toLowerCase().substr(0,11) === "is my rank?" || args.join(" ").toLowerCase().substr(0,9) === "is my sr?" || args.join(" ").toLowerCase().substr(0,8) === "my rank?" || 
            args.join(" ").toLowerCase().substr(0,6) === "my sr?"){
            
            var tag = args.join(" ").match(tagR)[0];
            console.log(typeof tag);
            tag = String(tag).replace("#","-");
            tag = tag.charAt(0).toUpperCase()+tag.substr(1);
            console.log(tag);
            owjs
                .get('pc', 'na', tag)
                .then((data) => message.reply(data.profile.rank) );
    }
    }
        if(command === "who"|| command === "who's"){
        console.log(command + " " +args.join(" ").toLowerCase())
        console.log(args.join(" ").toLowerCase().substr(0,12))
        
        var r = RegExp('is my sr\?[A-Za-z]*(-|#)[0-9]*');
        var tagR = RegExp('[A-Za-z]*(-|#)[0-9]*');
        
        
        if(args.join(" ").toLowerCase().substr(0,17) === "has gold healing?" || args.join(" ").toLowerCase().substr(0,17) === "got gold healing?" || args.join(" ").toLowerCase().substr(0,13) === "gold healing?"){
            
            var tag = args.join(" ").match(tagR)[0];
            var tag2 = args.join(" ").match(tagR)[1];
            
            tag = String(tag).replace("#","-");
            tag = tag.charAt(0).toUpperCase()+tag.substr(1);
            
            tag2 = String(tag).replace("#","-");
            tag2 = tag2.charAt(0).toUpperCase()+tag2.substr(1);
            
            var heal = 0;
            var heal2 = 0;

            try{

            owjs
                .get('pc', 'na', tag)
                .then((data) => {console.log(data.competitive.global.healing_done);
                                 heal = data.competitive.global.healing_done;
                                 owjs
                                .get('pc', 'na', tag2)
                                .then((data) => {console.log(data.competitive.global.healing_done);
                                                heal2 = data.competitive.global.healing_done;
                                                console.log(heal2);
                                                console.log(heal);
                                                                if(heal > heal2){
                    
                                                                        message.reply(tag + " has gold healing at: " + heal + " points.");
                    
                                                                }else{
                    
                                                                message.reply(tag2 + " has gold healing at: " + heal2 + " points.");
                    
                                                                }
                                                });
                                });
                
            }catch(err){
                
                message.reply("error")
                
                
            }
    }
                    if(args.join(" ").toLowerCase().substr(0,15) === "has gold elims?" || args.join(" ").toLowerCase().substr(0,14) === "got gold elims?" || args.join(" ").toLowerCase().substr(0,13) === "gold eliminations" || args.join(" ").toLowerCase().substr(0,22) === "has gold eliminations?" || args.join(" ").toLowerCase().substr(0,11) === "gold elims?"){
            
            var tag = args.join(" ").match(tagR)[0];
            var tag2 = args.join(" ").match(tagR)[1];
            
            tag = String(tag).replace("#","-");
            tag = tag.charAt(0).toUpperCase()+tag.substr(1);
            
            tag2 = String(tag).replace("#","-");
            tag2 = tag2.charAt(0).toUpperCase()+tag2.substr(1);
            
            var elim = 0;
            var elim2 = 0;

            try{

            owjs
                .get('pc', 'na', tag)
                .then((data) => {console.log(data.competitive.global.eliminations);
                                 elim = data.competitive.global.eliminations;
                                 owjs
                                .get('pc', 'na', tag2)
                                .then((data) => {console.log(data.competitive.global.eliminations);
                                                elim2 = data.competitive.global.eliminations;
                                                console.log(elim2);
                                                console.log(elim);
                                                                if(elim > elim2){
                    
                                                                        message.reply(tag + " has gold eliminations at: " + elim + ".");
                    
                                                                }else{
                    
                                                                message.reply(tag2 + " has gold eliminations at: " + elim2 + ".");
                    
                                                                }
                                                });
                                });
                
            }catch(err){
                
                message.reply("error")
                
                
            }
    }
    }
  
  if(command === "purge" || command === "clean" || command === "clear") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

if(command === "where" || command === "where's"){
    if(args.join(" ") === "is monika?" || args.join(" ") === "monika"){
    message.channel.send("Here I am", {
    file: "./monika.chr" // Or replace with FileOptions object
});

}

else{
    message.channel.send("Just Monika");
    
}


    


}
    if(command === "help"){
    message.author.send("```Here's what I can do for you: \n say <insert message> \n purge <number of messages to purge> \n where is monika? <finds monika> \n what's my rank? (Battletag): returns your NA comp sr \n Thanks:  thank tony \n ping: latency for tony \n who's gold elims? (Battletag1) (Battletag2): returns the player with the greater competitive eliminations \n who's gold healing (Battletag1) (Battletag2): returns the player with the greater competitive healing total. \n ``` ")
 
}
});

client.login(config.token);