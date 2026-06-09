const { SlashCommandBuilder } = require('discord.js');
const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	AudioPlayerStatus,
	NoSubscriberBehavior,
} = require('@discordjs/voice');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loopaudio')
		.setDescription('Tritt dem Voice Channel bei und spielt Audio im Loop ab.'),

	async execute(interaction) {
		// Prüfen, ob der User in einem Voice Channel ist
		const voiceChannel = interaction.member.voice.channel;

		if (!voiceChannel) {
			// Hier direkt ephemeral setzen, falls der User in keinem Channel ist
			return interaction.reply({ content: 'Du musst zuerst einem Voice Channel beitreten!', ephemeral: true });
		}

		// WICHTIG: Das Warten (Defer) auf ephemeral setzen
		await interaction.deferReply({ ephemeral: true });

		try {
			// 1. Verbindung zum Voice Channel herstellen
			const connection = joinVoiceChannel({
				channelId: voiceChannel.id,
				guildId: interaction.guild.id,
				adapterCreator: interaction.guild.voiceAdapterCreator,
			});

			// 2. Audio-Player erstellen
			const player = createAudioPlayer({
				behaviors: {
					// Verhindert, dass der Player stoppt, wenn niemand zuhört
					noSubscriber: NoSubscriberBehavior.Play,
				},
			});

			// Dein definierter Pfad zur Audiodatei
			const audioFilePath = path.join(__dirname, '../../assets/ZeitloserMoment.mp3');

			// Funktion zum Erstellen und Abspielen der Ressource
			const playLoop = () => {
				const resource = createAudioResource(audioFilePath);
				player.play(resource);
			};

			// 3. Loop-Logik: Wenn der Player 'Idle' (fertig) ist, einfach neu starten
			player.on(AudioPlayerStatus.Idle, () => {
				playLoop();
			});

			// 4. Player mit der Verbindung koppeln und ersten Play-Vorgang starten
			connection.subscribe(player);
			playLoop();

			// Da das Defer ephemeral war, ist dieser Edit nun auch nur für dich sichtbar
			await interaction.editReply(`Bin dem Kanal **${voiceChannel.name}** beigetreten und spiele Audio im Loop ab! 🎵`);

		}
		catch (error) {
			console.error(error);
			// Auch die Fehlermeldung bleibt ephemeral
			await interaction.editReply('Es gab einen Fehler beim Versuch, das Audio abzuspielen.');
		}
	},
};