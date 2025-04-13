const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jointeam')
		.setDescription('Tritt einem Team für die Discon 4 bei!'),
	async execute(interaction) {
		const disCon4Teams = ['Naturgeist', 'Donnerzwerg', 'Feuergoblin', 'Eisvampir'];

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


	},
};