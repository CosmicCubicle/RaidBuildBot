const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,

	execute(client) {
		const guilds = client.guilds.cache;
		const guild = client.guilds.cache.get('1055920563178188820');
		const channel = guild.channels.cache.get('1068936939878752257');
		var message = '';

		console.log(`Ready! Logged in as ${client.user.tag}`);
		channel.send(`Ready! Logged in as ${client.user.tag}`);
		channel.send(`Test ${guilds.size}`);
		client.user.setActivity(`${guilds.size} Servers Raid`, {type: ActivityType.Watching});		
	},
};
