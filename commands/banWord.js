const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('banword')
		.setDescription('Adds a word to the banned list'),
	async execute(interaction) {
		return interaction.reply('Pong!');
	},
};