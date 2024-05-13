const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
		else if (interaction.isButton()) {
			// respond to the button
			switch (interaction.customId) {
			case 'jointeam':
				await interaction.reply({ content: 'Man kan keinen Teams mehr beitreten! Lang leben die **Siegreichen Phönixe**', ephemeral: true });
				break;

			default:
				await interaction.reply({ content: 'There was an error while executing this Button!', ephemeral: true });
				console.log(`Error: Button ${interaction.customId} noch nicht implemetiert.`);
				console.log(interaction);
			}
		}
		else if (interaction.isMessageContextMenuCommand()) {
			console.log(interaction);
			const spam_channel = interaction.client.channels.cache.get('1042921282699792396');
			switch (interaction.commandName) {
			case 'Send 2 Server-Info':
				await interaction.reply({ content: 'Nachricht wird in <#1042921282699792396> gepostet', ephemeral: true });
				spam_channel.send({ content: interaction.targetMessage.content });
				break;

			default:
				await interaction.reply({ content: 'There was an error while executing this MessageContextMenuCommand!', ephemeral: true });
				console.log(`Error: MessageContextMenuCommand ${interaction.commandName} noch nicht implemetiert.`);
				console.log(interaction);
			}
		}
		else if (interaction.isStringSelectMenu()) {
			// respond to the select menu
		}
	},
};