const { Events, EmbedBuilder } = require('discord.js');
const { getAppliedTagsEmojis } = require('../helper/tagEmojiMapper.js');

module.exports = {
	name: Events.ThreadCreate,
	async execute(thread) {
		// wenn Post in Tempel des wissens --> dann keine Emojis drunter machen
		if (thread.parentId == '1327666879640240149') return;

		async function sleep(ms) {
			return await new Promise(r => setTimeout(r, ms));
		}
		await sleep(2000);

		if (thread.parentId == '1362071059326701578' || thread.parentId == '1362064707552542760' || thread.parentId == '1362053334433009835') {
			try {
				const firstMessage = await thread.fetchStarterMessage();
				firstMessage.react('<:wtRaise:1055581587368058950>');
			}
			catch (error) {
				console.error('Fehler beim Hinzufügen des Emojis:', error);
			}
		}
		if (thread.parentId == '1225437647586066473') {

			try {
				const firstMessage = await thread.fetchStarterMessage();
				firstMessage.react('<:wtRaise:1055581587368058950>');
				firstMessage.react('<:wtTime:1055582504754622537>');
				// const forum_channel = thread.client.channels.cache.get('1042924195576823858');
				const forum_channel = thread.client.channels.cache.get('1238834482681745487');
				const emojis = getAppliedTagsEmojis(thread.appliedTags);
				const msgContent = `## Neue Runde am Schwarzen Brett\n ## ${emojis}\n ${firstMessage.url} `;

				const adventureRegex = {
					name: /\*\*(Abenteuername):\*\*\s*(.+)/,
					datetime: /\*\*(Datum & Uhrzeit):\*\*\s*(.+)/,
					system: /\*\*(Regelwerk und Regelkenntnisse):\*\*\s*(.+)/,
					description: /\*\*(Beschreibung):\*\*\s*([\s\S]+?)(?:\*\*Webcam:|\*\*Virtual Tabletop:|\*\*zusätzliche Voraussetzungen:|\*\*Dauer:|\*\*Angemeldete Spieler:innen:|\*\*Inhaltswarnung:|\*\*Anmerkungen:)/,
					webcam: /\*\*(Webcam):\*\*\s*(.+)/,
					notes: /\*\*(Anmerkungen):\*\*\s*(.+)/,
				};

				const adventure = {};

				for (const [key, regex] of Object.entries(adventureRegex)) {
					const match = firstMessage.content.match(regex);
					if (match) {
						adventure[key] = match[2].trim();
					}
				}

				const exampleEmbed = new EmbedBuilder()
					.setColor(0xff8800)
					.setAuthor({ name: firstMessage.author.globalName, iconURL: firstMessage.author.avatarURL() })
					.setTitle(thread.name)
					.setURL(firstMessage.url)
					.addFields(
						{
							name: 'Beschreibung',
							value: adventure['description'],
							inline: false,
						},
						{
							name: 'Regelwerk',
							value: adventure['system'],
							inline: false,
						},
						{
							name: 'Datum & Uhrzeit',
							value: adventure['datetime'],
							inline: true,
						},
						{
							name: 'Webcam',
							value: adventure['webcam'],
							inline: true,
						},
						{
							name: 'Anmerkungen',
							value: adventure['notes'],
							inline: false,
						},
					)
					.setTimestamp();

				forum_channel.send({ content: msgContent, embeds: [exampleEmbed] });
			}
			catch (error) {
				console.error('Fehler beim Hinzufügen des Emojis:', error);
				const spam_channel = thread.client.channels.cache.get('1055577596726870057');
				spam_channel.send({ content: `Hey <@238563435049123840> \nFehler!! \n \`\`\`js \n ${error}\`\`\`` });
			}
		}

	},
};