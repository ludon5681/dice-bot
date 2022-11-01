// TODO: ADD HEADER COMMENTS

// file stream
const fs = require('node:fs');
// path module
const path = require('node:path');
// discord.js requirements
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// bot token
const { token } = require('./config.json');

// collection extends js Maps; this creates a new collection called client.commands
client.commands = new Collection();

// find the directory called commands, find all files in it that end with .js
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// for all the files identified in the last block, set a command in client that refers to that command file
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

// when the bot is logged in and ready, alert the dev
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// when the client recieves an interaction and that interaction is a slash command, 
// execute the command file associated with that interaction
client.on('interactionCreate', async interaction => {
const command = interaction.client.commands.get(interaction.commandName);
    if (!interaction.isChatInputCommand()) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!'});
    }
});

// attempt to login using bot token
client.login(token);


