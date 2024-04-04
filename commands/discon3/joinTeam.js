const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jointeam')
		.setDescription('Tritt einem Team für die Discon 3 bei!'),
	async execute(interaction) {
		const disCon3Teams = ['Goldener Drache', 'Grüner Cthulhu', 'Roter Phönix', 'Lila Einhorn'];

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

	},
};