const { Events } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,

	execute(client) {
		const guild = client.guilds.cache.get('1055920563178188820');
		const channel = guild.channels.cache.get('1068936939878752257');

		console.log(`Ready! Logged in as ${client.user.tag}`);
		channel.send(`Ready! Logged in as ${client.user.tag}`);
		channel.send(client.guilds.cache.map((guild) => guild.name).join('\n'));
	},
};
