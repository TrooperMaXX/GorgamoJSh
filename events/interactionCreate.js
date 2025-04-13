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
			const disCon4Teams = ['Naturgeist', 'Donnerzwerg', 'Feuergoblin', 'Eisvampir'];

			switch (interaction.customId) {
			case 'jointeam':
				if (!interaction.member.roles.cache.some(role => disCon4Teams.includes(role.name))) {


					// Finde das Team mit den wenigsten Mitgliedern
					let smallestTeam = disCon4Teams[0];
					let smallestTeamSize = Infinity;
					for (const team of disCon4Teams) {
						const role = interaction.guild.roles.cache.find(roley => roley.name === team);
						console.log(role);
						const teamSize = interaction.guild.roles.fetch(role.id)
							.then(rolex => console.log(`Anz: ${rolex.members.size}`))
							.catch(console.error);
						console.log(teamSize);

						// const teamSize = role.members.size;
						console.log(`${role.name}**${role.members.size}`);
						if (teamSize < smallestTeamSize) {
							smallestTeamSize = teamSize;
							smallestTeam = team;
						}
					}
					const newRole = interaction.guild.roles.cache.find(role => role.name === smallestTeam);


					// await interaction.member.roles.add(newRole);
					const replyContent = `Du bist jetzt ein **${newRole.name}**`;
					await interaction.reply({ content: replyContent, ephemeral: true });

				}
				else {
					const team = interaction.member.roles.cache.find(role => disCon4Teams.includes(role.name));
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