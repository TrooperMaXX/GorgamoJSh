const { Events, EmbedBuilder } = require('discord.js');
const { getAppliedTagsEmojis } = require('../helper/tagEmojiMapper.js');

module.exports = {
	name: Events.ThreadCreate,
	async execute(thread) {
		try {
			// Wenn Post in Tempel des Wissens --> dann keine Emojis drunter machen
			if (thread.parentId === '1327666879640240149') return;

			// Warte bis der Thread und die erste Nachricht vollständig geladen sind
			await new Promise(resolve => setTimeout(resolve, 2000));

			const parentIds = ['1362071059326701578', '1362064707552542760', '1362053334433009835'];
			if (parentIds.includes(thread.parentId)) {
				try {
					const firstMessage = await thread.fetchStarterMessage();
					await firstMessage.react('<:wtRaise:1055581587368058950>');
				}
				catch (error) {
					console.error('Fehler beim Hinzufügen des Emojis:', error);
				}
				return;
			}

			if (thread.parentId === '1225437647586066473') {
				const firstMessage = await thread.fetchStarterMessage();

				// Reagiere mit Emojis
				await Promise.all([
					firstMessage.react('<:wtRaise:1055581587368058950>').catch(console.error),
					firstMessage.react('<:wtTime:1055582504754622537>').catch(console.error),
				]);

				const forum_channel = thread.client.channels.cache.get('1238834482681745487');
				if (!forum_channel) throw new Error('Forum channel nicht gefunden!');

				const emojis = getAppliedTagsEmojis(thread.appliedTags);
				const msgContent = `## Neue Runde am Schwarzen Brett\n## ${emojis}\n${firstMessage.url}`;

				const adventureRegex = {
					name: /\*\*(Abenteuername):\*\*\s*(.+)/,
					datetime: /\*\*(Datum & Uhrzeit):\*\*\s*(.+)/,
					system: /\*\*(Regelwerk und Regelkenntnisse):\*\*\s*(.+)/,
					description: /\*\*(Beschreibung):\*\*\s*([\s\S]+?)(?=\*\*Webcam:|\*\*Virtual Tabletop:|\*\*zusätzliche Voraussetzungen:|\*\*Dauer:|\*\*Angemeldete Spieler:innen:|\*\*Inhaltswarnung:|\*\*Anmerkungen:|$)/,
					webcam: /\*\*(Webcam):\*\*\s*(.+)/,
					notes: /\*\*(Anmerkungen):\*\*\s*([\s\S]+)/,
				};

				const adventure = {};
				for (const [key, regex] of Object.entries(adventureRegex)) {
					const match = firstMessage.content.match(regex);
					adventure[key] = match ? match[2].trim() : '*Nicht angegeben*';
				}

				const exampleEmbed = new EmbedBuilder()
					.setColor(0xff8800)
					.setAuthor({
						name: firstMessage.author.globalName || firstMessage.author.username,
						iconURL: firstMessage.author.displayAvatarURL(),
					})
					.setTitle(thread.name)
					.setURL(firstMessage.url)
					.addFields(
						{ name: 'Beschreibung', value: adventure.description, inline: false },
						{ name: 'Regelwerk', value: adventure.system, inline: false },
						{ name: 'Datum & Uhrzeit', value: adventure.datetime, inline: true },
						{ name: 'Webcam', value: adventure.webcam, inline: true },
						{ name: 'Anmerkungen', value: adventure.notes, inline: false },
					)
					.setTimestamp();

				await forum_channel.send({
					content: msgContent,
					embeds: [exampleEmbed],
				});
			}
		}
		catch (error) {
			console.error('Fehler im ThreadCreate Event:', error);
			const spam_channel = thread.client.channels.cache.get('1055577596726870057');
			if (spam_channel) {
				spam_channel.send({
					content: `Hey <@238563435049123840> \nFehler!! \n\`\`\`js\n${error.stack || error}\`\`\``,
				});
			}
		}
	},
};