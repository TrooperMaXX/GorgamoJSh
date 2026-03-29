const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('postrolebutton')
		.setDescription('Postet die Nachricht, bei der die Usys ihre DisCon V Rolle wählen können'),
	async execute(interaction) {
		const joinrole1 = new ButtonBuilder()
			.setCustomId('joinrole1')
			.setLabel('⚔️ RitterIn')
			.setStyle(ButtonStyle.Secondary);

		const joinrole2 = new ButtonBuilder()
			.setCustomId('joinrole2')
			.setLabel('🌿 Naturkundige:r')
			.setStyle(ButtonStyle.Secondary);

		const joinrole3 = new ButtonBuilder()
			.setCustomId('joinrole3')
			.setLabel('🪄 Zaubernde:r')
			.setStyle(ButtonStyle.Secondary);

		const joinrole4 = new ButtonBuilder()
			.setCustomId('joinrole4')
			.setLabel('🙏 Geistliche:r')
			.setStyle(ButtonStyle.Secondary);
		
		const joinrole5 = new ButtonBuilder()
			.setCustomId('joinrole5')
			.setLabel('☠️ PiratIn')
			.setStyle(ButtonStyle.Secondary);
	
		const joinrole6 = new ButtonBuilder()
			.setCustomId('joinrole6')
			.setLabel('🔍 ForscherIn')
			.setStyle(ButtonStyle.Secondary);
		
		const joinrole7 = new ButtonBuilder()
			.setCustomId('joinrole7')
			.setLabel('🎨 KünstlerIn')
			.setStyle(ButtonStyle.Secondary);


		const row1 = new ActionRowBuilder()
			.addComponents(joinrole2, joinrole3, joinrole4);

		const row2 = new ActionRowBuilder()
			.addComponents(joinrole5, joinrole1,joinrole6,joinrole7);
			


		await interaction.reply({
			content: 'Wähle deine Rolle!',
			components: [row1,row2],
		});
	},
};