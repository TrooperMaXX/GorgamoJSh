const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('postrolebutton')
		.setDescription('Postet die Nachricht, bei der die Usys ihre DisCon V Rolle wählen können'),
	async execute(interaction) {
		const joinrole1 = new ButtonBuilder()
			.setCustomId('joinrole1')
			.setLabel('⚔️ Ritter')
			.setStyle(ButtonStyle.Secondary);

		const joinrole2 = new ButtonBuilder()
			.setCustomId('joinrole2')
			.setLabel('🌿 Naturotto')
			.setStyle(ButtonStyle.Secondary);

		const joinrole3 = new ButtonBuilder()
			.setCustomId('joinrole3')
			.setLabel('🪄 Zauberer')
			.setStyle(ButtonStyle.Secondary);

		const joinrole4 = new ButtonBuilder()
			.setCustomId('joinrole4')
			.setLabel('🙏 Geistlicher')
			.setStyle(ButtonStyle.Secondary);
		
		const joinrole5 = new ButtonBuilder()
			.setCustomId('joinrole5')
			.setLabel('☠️ Pirat')
			.setStyle(ButtonStyle.Secondary);
	
		const joinrole6 = new ButtonBuilder()
			.setCustomId('joinrole6')
			.setLabel('🔍 Forscher')
			.setStyle(ButtonStyle.Secondary);
		
		const joinrole7 = new ButtonBuilder()
			.setCustomId('joinrole7')
			.setLabel('🎨 Künstler')
			.setStyle(ButtonStyle.Secondary);


		const row1 = new ActionRowBuilder()
			.addComponents(joinrole1,joinrole2, joinrole3, joinrole4, joinrole5);

		const row2 = new ActionRowBuilder()
			.addComponents(joinrole6,joinrole7);
			

		const roleSelector = new StringSelectMenuBuilder()
            .setCustomId('select-role')
            .setPlaceholder('Wähle hier deine DisCon V Rolle...')
            .addOptions([
                { label: 'Ritter', emoji: '⚔️', value: 'joinrole1' },
                { label: 'Naturotto', emoji: '🌿', value: 'joinrole2' },
                { label: 'Zauberer', emoji: '🪄', value: 'joinrole3' },
				{ label: 'Geistlicher', emoji: '🙏', value: 'joinrole4' },
                { label: 'Pirat', emoji: '☠️', value: 'joinrole5' },
                { label: 'Forscher', emoji: '🔍', value: 'joinrole6' },
                { label: 'Künstler', emoji: '🎨', value: 'joinrole7' },
            ]);
		
		const row3 = new ActionRowBuilder().addComponents(roleSelector);

		await interaction.reply({
			content: 'Wähle deine Rolle!',
			components: [row1,row2,row3],
		});
	},
};