const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('postteambutton')
		.setDescription('Postet die Nachricht, bei der die Usys das Team "Wählen" können'),
	async execute(interaction) {
		const jointeam = new ButtonBuilder()
			.setCustomId('jointeam')
			.setLabel('Tritt einem Team beil!')
			.setStyle(ButtonStyle.Primary);

		const row = new ActionRowBuilder()
			.addComponents(jointeam);

		await interaction.reply({
			content: 'Klick unten um einem Team Beizutreten!',
			components: [row],
		});
	},
};