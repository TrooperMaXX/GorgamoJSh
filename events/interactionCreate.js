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
			const disCon3Teams = ['Goldener Drache', 'Grüner Cthulhu', 'Roter Phönix', 'Lila Einhorn'];

			switch (interaction.customId) {
			case 'jointeam':

				if (!interaction.member.roles.cache.some(role => disCon3Teams.includes(role.name))) {


					const teamName = disCon3Teams[Math.floor(Math.random() * disCon3Teams.length)];
					const newRole = interaction.guild.roles.cache.find(role => role.name === teamName);

					await interaction.member.roles.add(newRole);
					const replyContent = `Du bist jetzt ein **${newRole.name}**`;
					await interaction.reply({ content: replyContent, ephemeral: true });

				}
				else {
					const team = interaction.member.roles.cache.find(role => disCon3Teams.includes(role.name));
					const replyContent = `Du bist schon ein **${team.name}**`;
					await interaction.reply({ content: replyContent, ephemeral: true });
				}

				break;

			default:
				await interaction.reply({ content: 'There was an error while executing this Button!', ephemeral: true });
				console.log(`Error: Button ${interaction.customId} noch nicht implemetiert.`);
				console.log(interaction);
			}
		}
		else if (interaction.isStringSelectMenu()) {
			// respond to the select menu
		}
	},
};