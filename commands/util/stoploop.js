const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stoploop')
		.setDescription('Stoppt die Audiowiedergabe und lässt den Bot den Voice Channel verlassen.'),

	async execute(interaction) {
		// Wir machen die Antwort wieder ephemeral, um den Chat sauber zu halten
		await interaction.deferReply({ ephemeral: true });

		try {
			// Holt die aktuelle Voice-Verbindung des Bots auf diesem Server (Guild)
			const connection = getVoiceConnection(interaction.guild.id);

			// Prüfen, ob überhaupt eine Verbindung existiert
			if (!connection) {
				return interaction.editReply('Ich bin aktuell in gar keinem Voice Channel auf diesem Server aktiv.');
			}

			// Verbindung zerstören
			// Das beendet den Stream, räumt den Speicher auf und lässt den Bot den Channel verlassen
			connection.destroy();

			await interaction.editReply('Die Wiedergabe wurde gestoppt und ich habe den Voice Channel verlassen. 🛑');

		}
		catch (error) {
			console.error(error);
			await interaction.editReply('Es gab einen Fehler beim Versuch, den Voice Channel zu verlassen.');
		}
	},
};