const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
	cooldown:5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		// alles was unter 3 Sek ist ok ansonsten s.u.
		// await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
		// await wait(2000);
		// await interaction.deferReply();
		// geheim
		await interaction.deferReply({ ephemeral: true });
		// await wait(4000);
		await interaction.editReply('Pong!');
		await wait(4000);
		await interaction.followUp('Pong again!');
	},
};