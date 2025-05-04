const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jointeam')
		.setDescription('Tritt einem Team für die Discon 4 bei!'),
	async execute(interaction) {
		const disCon4Teams = ['Naturgeist', 'Donnerzwerg', 'Feuerteufel', 'Eisvampir'];

		// Prüfen, ob der Nutzer bereits eine Team-Rolle hat
		const userRoles = interaction.member.roles.cache;
		const hasTeamRole = userRoles.some(role => disCon4Teams.includes(role.name));

		if (hasTeamRole) {
			return interaction.reply({
				content: 'Du bist bereits in einem Team!',
				ephemeral: true,
			});
		}

		// Alle Rollen im Server suchen
		const guildRoles = await interaction.guild.roles.fetch();
		const teamRoles = guildRoles.filter(role => disCon4Teams.includes(role.name));

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