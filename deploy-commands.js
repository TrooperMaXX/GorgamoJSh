const { REST, Routes, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		commands.push(command.data.toJSON());
	}
}

// Add ContexMenuCommands
const message2ServerInfo = new ContextMenuCommandBuilder()
	.setName('Send 2 Server-Info')
	.setType(ApplicationCommandType.Message);
commands.push(message2ServerInfo.toJSON());

// Add ContexMenuCommands
const reactWithWTRAISE = new ContextMenuCommandBuilder()
	.setName('React mit wtRaise')
	.setType(ApplicationCommandType.Message);
commands.push(reactWithWTRAISE.toJSON());

// Add ContexMenuCommands
const regenerateRundenInfo = new ContextMenuCommandBuilder()
	.setName('Regenerate Runden Info')
	.setType(ApplicationCommandType.Message);
commands.push(regenerateRundenInfo.toJSON());

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();