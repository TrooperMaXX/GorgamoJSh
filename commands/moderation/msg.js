const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
	cooldown:5,
	data: new SlashCommandBuilder()
		.setName('msg')
		.setDescription('Schreib eine Nachricht in DIESEN Channel als Gorgamosh!')
		.addStringOption(option =>
			option.setName('msgcontent')
				.setDescription('Inhalt der zu sendenden Nachricht. (Keine Absätze supported)')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const msgcontent = interaction.options.getString('msgcontent');
		await interaction.deferReply({ ephemeral: true });
		await interaction.channel.send(msgcontent);
		await interaction.editReply('Nachricht gesendet');
	},
};