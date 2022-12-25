// Discord Setup
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const config = require('./config.json');

//Database Setup
const mongo = require('./database/mongo');

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

// this event will only trigger one time after logging in
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// login to Discord with your app's token
client.login(token);

//Add Commands
client.Commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.Commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

//Command Events
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


// Listen Messagesfor bad words
client.on('message', async message => {
	await mongo().then(mongoose => {
		useNewUrlParser: true;
		useUnifiedTopology: true;
		try {
			if (message.author.bot) {
				return;
			} 
			else{
				//Banned Word CHeck
				for (let i = 0; i < config.BannedWords.length; i++) {
					if (message.content.toLowerCase().includes(config.BannedWords[i])) {
						client.channels.cache.get("1055980674236043304").send(message.content);
						message.reply('You have used a banned word. Message Purged!');
						message.delete();
						return;
					}
				}
			}
		}finally{
			//always run
			mongoose.connection.close()
		}
	});
});
