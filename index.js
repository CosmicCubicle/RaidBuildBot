const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
const { token } = require('./config.json');
const config = require('./config.json');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

const {google} = require('googleapis');
const auth = new google.auth.GoogleAuth({
	keyFile: "keys.json", //the key file
	//url to spreadsheets API
	scopes: "https://www.googleapis.com/auth/spreadsheets", 
});
const sheets = google.sheets({ version: 'v4', auth });
const { sheetId } = require('./config.json');

global.builddata = {};
function getBuildData() {
	sheets.spreadsheets.values.get({
		spreadsheetId: sheetId,
		range: 'Raid Builds!B2:S',
	},
	(err, res) => {
		if (err) return console.log("The API returned an error: " + err);
		let data = {
			BuildType : [],
			EventBuild : [],
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
			data.EventBuild.push(row[3]);
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
		builddata = data;
		//console.log(builddata);
	});
};

setInterval(getBuildData, 60000);
getBuildData();

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}



client.login(token);
