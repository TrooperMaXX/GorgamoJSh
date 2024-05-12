const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jointeam')
		.setDescription('Tritt einem Team für die Discon 3 bei!'),
	async execute(interaction) {
		const disCon3Teams = ['Goldener Drache', 'Grüner Cthulhu', 'Roter Phönix', 'Lila Einhorn'];

		if (!interaction.member.roles.cache.some(role => disCon3Teams.includes(role.name))) {


			// Finde das Team mit den wenigsten Mitgliedern
			let smallestTeam = disCon3Teams[0];
			let smallestTeamSize = Infinity;
			for (const team of disCon3Teams) {
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
			const team = interaction.member.roles.cache.find(role => disCon3Teams.includes(role.name));
			const replyContent = `Du bist schon ein **${team.name}**`;
			await interaction.reply({ content: replyContent, ephemeral: true });
		}

	},
};