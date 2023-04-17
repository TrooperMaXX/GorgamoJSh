const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pin')
		.setDescription('Pin Message in this Channel')
		/* .addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel where the message is')
				.setRequired(true)) */
		.addStringOption(option =>
			option.setName('messageid')
				.setDescription('MessageID of zu Pinnende Message')
				.setRequired(true)),
	async execute(interaction) {
		const messageid = interaction.options.getString('messageid');
		await interaction.deferReply({ ephemeral: true });
		try {
			const message = await interaction.channel.messages.fetch(messageid);
			// Check if in 'Aktive Runden' Kategorie or User is Admin
			if (message.channel.parent == '1042924758116872301') {
				message.pin();
				await interaction.editReply(`Nachricht https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${messageid} angepinnt!`);
			}
			else {
				await interaction.editReply(`Leider hast du keine Rechte **HIER** die Nachricht https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${messageid} an zu pinnen!`);
			}
		}
		catch (error) {
			console.error(error);
			await interaction.editReply('Nachricht konnte nicht gefunden werden :( ! Bitte überprüfe die MessageID.');
		}


	},
};