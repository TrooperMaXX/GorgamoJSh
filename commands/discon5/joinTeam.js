const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jointeam')
		.setDescription('Tritt einem Team für die Discon V bei!'),
	async execute(interaction) {
		const disCon5Teams = ['Rubin', 'Saphir', 'Smaragd'];

		// Prüfen, ob der Nutzer bereits eine Team-Rolle hat
		const userRoles = interaction.member.roles.cache;
		const hasTeamRole = userRoles.some(role => disCon5Teams.includes(role.name));

		if (hasTeamRole) {
			return interaction.reply({
				content: 'Du bist bereits in einem Team!',
				ephemeral: true,
			});
		}

		// Alle Rollen im Server suchen
		const guildRoles = await interaction.guild.roles.fetch();
		const teamRoles = guildRoles.filter(role => disCon5Teams.includes(role.name));

		// Rollen nach Mitgliederzahl sortieren (am wenigsten besetzte Rolle zuerst)
		const sortedRoles = teamRoles.sort((a, b) => a.members.size - b.members.size);

		// Die Rolle mit den wenigsten Mitgliedern auswählen
		const targetRole = sortedRoles.first();

		// Rolle dem Nutzer geben
		await interaction.member.roles.add(targetRole);

		await interaction.reply({
			content: `Du bist jetzt ein **${targetRole.name}**!`,
			ephemeral: true,
		});
	},
};