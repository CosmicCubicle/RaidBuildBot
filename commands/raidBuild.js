const { SlashCommandBuilder } = require('discord.js');

const {google} = require('googleapis');
//const {authenticate} = require('@google-cloud/local-auth');
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
		.addStringOption(option => option.setName('pokemon').setDescription('The Pokémon whose build you wish to retrieve'))
		.addStringOption(option => option.setName('role').setDescription('The role you are looking for, either Support, Damage, or Mixed'))
		.addStringOption(option => option.setName('type').setDescription('The type of build to get, either Team or Solo')),
	async execute(interaction) {
        sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: 'Raid Builds!I2:I', // A2 because i assume you got a title like "Name/Username" etc.
        },
		(err, res) => {
            if (err) return console.log("The API returned an error: " + err);

			console.log(res.data.values[0]);
        }
        );
		console.log(Bingo);

//		console.log(buildArray)
//		return interaction.reply(buildArray);
	},

};