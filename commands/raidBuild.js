const { SlashCommandBuilder, Message } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('raidbuild')
		.setDescription('Retrieve a Pokémon Scarlet/Violet Raid Build')
		.addStringOption(option => option.setName('pokemon').setDescription('The Pokémon whose build you wish to retrieve')
		.setRequired(true)),
	async execute(interaction) {
		
			var datafind = {
				indexes: []
			};
			builddata.Pokemon.filter(function (element, index){
				if (element.toLowerCase() == interaction.options.getString('pokemon').toLowerCase()) {
					this.indexes.push(index);
					return true;
				}
			}, datafind);
			console.log(datafind.indexes);
			if (datafind.indexes.length == 0){
				return interaction.reply('No Results found for ' + interaction.options.getString('pokemon') + '. Please make sure you have spelled the name of the pokemon correctly. You can manually check the sheet by visiting:  https://docs.google.com/spreadsheets/d/1bMaLkMyy4cs7O5RXLNMS95xPtVz-FVhUB_Q-4B9a-UE/edit?usp=sharing');
			}
			else
			{
				var response = ""
				for (var i = 0; i < datafind.indexes.length; i++){
					var ind = datafind.indexes[i];
					if (builddata.Strategy[ind] == null ){
						builddata.Strategy[ind] = "N/A"
					};
					let IgnoreIvs = builddata.IgnoreIv[ind].replace("/", ", ").replace("SP", "Speed").replace("AT", "Attack").replace("SA", "Special Attack").replace(/\/$/, "");
					
					var response = response + `This Pokemon is rated in Tier: ${builddata.Grade[ind]}\n\nYour ${builddata.Role[ind]} ${builddata.BuildType[ind]} Build is: \n\n${builddata.Pokemon[ind]} @ ${builddata.HeldItem[ind]}\nAbility: ${builddata.Ability[ind]}\nLevel: 100\nTera Type: ${builddata.TeraType[ind]}\nEVs: ${(builddata.EVs[ind].split('\n'))[0]} / ${(builddata.EVs[ind].split('\n'))[1]} / ${(builddata.EVs[ind].split('\n'))[2]}\n${builddata.Nature[ind]} Nature\n- ${builddata.MoveSets[ind].split('\n')[0]}\n- ${builddata.MoveSets[ind].split('\n')[1]}\n- ${builddata.MoveSets[ind].split('\n')[2]}\n- ${builddata.MoveSets[ind].split('\n')[3]}\n\nYou can ignore the Following IVs when training this Pokemon:\n${IgnoreIvs}\n\nStrategy and Build Notes:\n${builddata.Strategy[ind]}\n -----------------------------------------------\n`;
				}
				return interaction.reply(response)
			}
		}
	}
;
