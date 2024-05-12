const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jointeam')
		.setDescription('Tritt einem Team für die Discon 3 bei!'),
	async execute(interaction) {
		const replyContent = 'Man kan keinen Teams mehr beitreten! Lang leben die **Siegreichen Phönixe**';
		await interaction.reply({ content: replyContent, ephemeral: true });

	},
};