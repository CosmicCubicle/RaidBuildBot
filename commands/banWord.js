const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('banword')
		.setDescription('Adds a word to the banned list')
		.addUserOption(option => option.setName('word').setDescription('The user\'s avatar to show'))
		.addUserOption(option => option.setName('reason').setDescription('The user\'s avatar to show'))
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
	async execute(interaction) {
		const newWord = {

		}
		return interaction.reply('Pong!');

	},

};