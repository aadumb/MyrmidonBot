const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NjM2NDUwMTc2ODQ4MTAxNDA2.XcAuEA.CbTzYohdsH64MIEdeERQ4s6pQxQ";

client.login(token)

var cookie = "8128ED41C824D2C57A6702271D3AB65C822AA6DAEF5C543F88628C648414D9968B63844C51C5089A266EB973B3ED146952E0FF26D3E2771E5D53AA4B334FEC033FCABA791F2248A5C30487531393B4B5BA35BA23EB0BEAE6B1386B4FECFCD265588ABDBA1AC97E19DA5C0C4450470FA142E75085AB827FFEF46F2A2D610205E66F745292E91313CB29F191FEDDBB243895F256A80E5F674AFEB1A239CC8B965563ED79B6532612FDF40E6E40F094DDD1D99D882532DC73EF31D40BA2AE5701FA056FA6BB35E1CFF89F33D3FEE777BEE04E9BB5804C7BDA967A161F960FBDA5AC5EE374417C03112C3EF497909ABB517ED7417F31BF121FF225F75B17E1B444E7AEA7138906DA680739D0527EC0074BABC832DC2DC15B7C7340C1A1D2DDDF201E26AA9DCA";
var prefix = ';';

roblox.cookieLogin(cookie).catch(() => {console.log("Sorry, it failed.");});


client.on("ready", () => {
  client.user.setGame(`Watching over the Myrmidons`);
  console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let user = member.user
  console.log(`${user.tag} joined ${guild}`)
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  let user = member.user
  console.log(`${user.tag} left ${guild}`)
});

var prefix = ';';
var groupId = 4723844;
var maximumRank = 100;

function isCommand(command, message){
	var command = command.toLowerCase();
	var content = message.content.toLowerCase();
	return content.startsWith(prefix + command);
}

client.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('Myrmidon-Promote', message)){
		if(!message.member.roles.some(r=>["Myrmidon Officer"].includes(r.name)) )
			return message.reply("> You can't use this command.");
    	var username = args[1]
    	if (username){
    		message.channel.send(`> Checking ROBLOX for ${username}`)
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(4723844, id)
				.then(function(rank){
					if(maximumRank <= rank){
						message.channel.send(`> ${username} can not be promoted`)
					} else {
						roblox.promote(4723844, id)
						.then(function(roles){
							message.channel.send(`> ${username} has successfully been promoted`)
						}).catch(function(err){
							message.channel.send("> Failed to promote.")
						});
					}
				}).catch(function(err){
					message.channel.send("> Couldn't get him in the group.")
				});
			}).catch(function(err){ 
				message.channel.send(`> Sorry, but ${username} doesn't exist on ROBLOX.`)
			});
    	} else {
    		message.channel.send("> Please enter a username.")
    	}
    	return;
    }
	
	if(isCommand('Myrmidon-Demote', message)){
		if(!message.member.roles.some(r=>["Myrmidon Officer"].includes(r.name)) )
			return message.reply("> You can't use this command.");
    	var username = args[1]
    	if (username){
    		message.channel.send(`> Checking ROBLOX for ${username}`)
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(4723844, id)
				.then(function(rank){
					if(maximumRank <= rank){
						message.channel.send(`> ${username} can not demoted.`)
					} else {
						roblox.demote(4723844, id)
						.then(function(roles){
							message.channel.send(`> ${username} has successfully been demoted`)
						}).catch(function(err){
							message.channel.send("> Failed to demote.")
						});
					}
				}).catch(function(err){
					message.channel.send("> Couldn't get him in the group.")
				});
			}).catch(function(err){ 
				message.channel.send(`> Sorry, but ${username} doesn't exist on ROBLOX.`)
			});
    	} else {
    		message.channel.send("> Please enter a username.")
    	}
    	return;
    }
	
	 if(isCommand('Myrmidon-Exile', message)){
		if(!message.member.roles.some(r=>["Myrmidon Officer"].includes(r.name)) )
			return message.reply("> You can't use this command.");
    	var username = args[1]
    	if (username){
    		message.channel.send(`> Checking ROBLOX for ${username}`)
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(4723844, id)
				.then(function(rank){
					if(maximumRank <= rank){
						message.channel.send(`> ${username} can not be exiled`)
					} else {
						roblox.exile(4723844, id)
						.then(function(roles){
							message.channel.send(`> ${username} has successfully been exiled`)
						}).catch(function(err){
							message.channel.send("> Failed to exile.")
						});
					}
				}).catch(function(err){
					message.channel.send("> Couldn't get him in the group.")
				});
			}).catch(function(err){ 
				message.channel.send(`> Sorry, but ${username} doesn't exist on ROBLOX.`)
			});
    	} else {
    		message.channel.send("> Please enter a username.")
    	}
    	return;
    }

});


client.on('message', msg => {
const args = msg.content.slice(prefix.length).split(' ');
const command = args.shift().toLowerCase();


if (command === 'suggest'){
const channel = msg.guild.channels.find(ch => ch.name === 'suggestions');
channel.send('> __Suggestion__\n> ' + args.join(' '))
}     
});  
