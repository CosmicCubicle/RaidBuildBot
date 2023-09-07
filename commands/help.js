const { SlashCommandBuilder, Message } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get Help'),
	async execute(interaction) {
		
		var response = 'Using the Tera Raid Builds Bot:\n\nThe Bot consists of 2 commands:\n/help\n/raidbuild\n\nEXAMPLE:\n/raidbuild pokemon:Charizard\n\nResponse:\nThis Pokemon is rated in Tier: B\n\nYour SOLO/TEAM DAMAGE PHYSICAL Build is:\n\nCharizard @ Sitrus Berry\n\nAbility: Blaze\nLevel: 100\nTera Type: Flying\nEVs: 252 HP / 252 Atk / 4 Def\nAdamant Nature\n- Belly Drum\n- Acrobatics\n- Fire Punch\n- Outrage\n\nYou can ignore the Following IVs when training this Pokemon:\nSpeed, Special Attack\n\nStrategy and Build Notes:\nNeeds Support for Cinderace Event\n-----------------------------------------------\n\n\n\nFor additional support please contact on Discord at \nhttps://discord.gg/eeQsc6FyqS\n\nOr via email at\ncontact@cosmiccubicle.com\n'
		return interaction.reply(response)

		}
	}
;
