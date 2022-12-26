const { SlashCommandBuilder, Message } = require('discord.js');
const {google} = require('googleapis');
const auth = new google.auth.GoogleAuth({
	keyFile: "keys.json", //the key file
	//url to spreadsheets API
	scopes: "https://www.googleapis.com/auth/spreadsheets", 
});
const sheets = google.sheets({ version: 'v4', auth });
const { sheetId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('raidbuild')
		.setDescription('Retrieve a Pokémon Scarlet/Violet Raid Build')
		.addStringOption(option => option.setName('pokemon').setDescription('The Pokémon whose build you wish to retrieve')),
	async execute(interaction) {
        sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: 'Raid Builds!B2:S', // A2 because i assume you got a title like "Name/Username" etc.
        },
		(err, res) => {
            if (err) return console.log("The API returned an error: " + err);
			let data = {
				BuildType : [],
				Role : [],
				Grade : [],
				Pokemon : [],
				HeldItem : [],
				Ability : [],
				TeraType : [],
				Nature : [],
				IgnoreIv : [],
				EVs : [],
				MoveSets : [],
				Strategy : []
			  }
			const rows = res.data.values;
			rows.map((row) => {
				data.BuildType.push(row[0]);
				data.Role.push(row[1]);
				data.Grade.push(row[2]);
				data.Pokemon.push(row[7]);
				data.HeldItem.push(row[10]);
				data.Ability.push(row[11]);
				data.TeraType.push(row[12]);
				data.Nature.push(row[13]);
				data.IgnoreIv.push(row[14]);
				data.EVs.push(row[15]);
				data.MoveSets.push(row[16]);
				data.Strategy.push(row[17]);
			});
			var datafind = {
				indexes: []
			};
			data.Pokemon.filter(function (element, index){
				if (element.toLowerCase() == interaction.options.getString('pokemon').toLowerCase()) {
					this.indexes.push(index);
					return true;
				}
			}, datafind);
			console.log(datafind.indexes);
			if (datafind.indexes.length == 0){
				return interaction.reply('No Results found, Please make sure you have spelled the name of the pokemon correctly. You can manually check the sheet by visiting:  https://docs.google.com/spreadsheets/d/1bMaLkMyy4cs7O5RXLNMS95xPtVz-FVhUB_Q-4B9a-UE/edit?usp=sharing')
			}
			else
			{
				var response = ""
				for (var i = 0; i < datafind.indexes.length; i++){
					var ind = datafind.indexes[i];
					if (data.Strategy[ind] == null ){
						data.Strategy[ind] = "N/A"
					};
					let IgnoreIvs = data.IgnoreIv[ind].replace("/", ", ").replace("SP", "Speed").replace("AT", "Special Attack").replace("SA", "Special Attack").replace(/\/$/, "");
					
					var response = response + `This Pokemon is rated in Tier: ${data.Grade[ind]}\n\nYour ${data.Role[ind]} ${data.BuildType[ind]} Build is: \n\n${data.Pokemon[ind]} @ ${data.HeldItem[ind]}\nAbility: ${data.Ability[ind]}\nLevel: 100\nTera Type: ${data.TeraType[ind]}\nEVs: ${(data.EVs[ind].split('\n'))[0]} / ${(data.EVs[ind].split('\n'))[1]} / ${(data.EVs[ind].split('\n'))[2]}\n${data.Nature[ind]} Nature\n- ${data.MoveSets[ind].split('\n')[0]}\n- ${data.MoveSets[ind].split('\n')[1]}\n- ${data.MoveSets[ind].split('\n')[2]}\n- ${data.MoveSets[ind].split('\n')[3]}\n\nYou can ignore the Following IVs when training this Pokemon:\n${IgnoreIvs}\n\nStrategy and Build Notes:\n${data.Strategy[ind]}\n -----------------------------------------------\n`;
				}
				return interaction.reply(response)
			}
		});
	},
};
