/* eslint-disable no-case-declarations */
const { Events, EmbedBuilder } = require('discord.js');
const { getAppliedTagsEmojis } = require('../helper/tagEmojiMapper.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
		else if (interaction.isButton()) {
			// respond to the button
			const disCon4Teams = ['Naturgeist', 'Donnerzwerg', 'Feuerteufel', 'Eisvampir'];

			switch (interaction.customId) {
			case 'jointeam':

				// Prüfen, ob der Nutzer bereits eine Team-Rolle hat
				const userRoles = interaction.member.roles.cache;
				const hasTeamRole = userRoles.some(role => disCon4Teams.includes(role.name));

				if (hasTeamRole) {
					return interaction.reply({
						content: 'Du bist bereits in einem Team!',
						ephemeral: true,
					});
				}

				// Alle Rollen im Server suchen
				const guildRoles = await interaction.guild.roles.fetch();
				const teamRoles = guildRoles.filter(role => disCon4Teams.includes(role.name));

				// Rollen nach Mitgliederzahl sortieren (am wenigsten besetzte Rolle zuerst)
				const sortedRoles = teamRoles.sort((a, b) => a.members.size - b.members.size);

				// Die Rolle mit den wenigsten Mitgliedern auswählen
				const targetRole = sortedRoles.first();

				// Rolle dem Nutzer geben
				await interaction.member.roles.add(targetRole);

				await interaction.reply({
					content: `Du bist jetzt ein **${targetRole.name}**!`,
					ephemeral: true,
				});
				break;

			default:
				await interaction.reply({ content: 'There was an error while executing this Button!', ephemeral: true });
				console.log(`Error: Button ${interaction.customId} noch nicht implemetiert.`);
				console.log(interaction);
			}
		}
		else if (interaction.isMessageContextMenuCommand()) {
			console.log(interaction);
			const spam_channel = interaction.client.channels.cache.get('1042921282699792396');
			switch (interaction.commandName) {
			case 'Send 2 Server-Info':
				await interaction.reply({ content: 'Nachricht wird in <#1042921282699792396> gepostet', ephemeral: true });
				spam_channel.send({ content: interaction.targetMessage.content });
				break;
			case 'React mit wtRaise':
				console.log(interaction);

				const react = await interaction.targetMessage.react('<:wtRaise:1055581587368058950>');
				if (react) {
					return interaction.reply({
						content: 'reagiert mit <:wtRaise:1055581587368058950> !',
						ephemeral: true,
					});
				}
				break;
			case 'Regenerate Runden Info':
				if (interaction.channelId == '1055577596726870057') {
					try {
						await interaction.deferReply({ ephemeral: true });

						const targetMessage = interaction.targetMessage;
						const messageContent = targetMessage.content;
						const urlMatch = messageContent.match(/https:\/\/discord\.com\/channels\/\d+\/\d+\/\d+/);

						if (!urlMatch) {
							return await interaction.editReply({ content: 'Kein gültiger Link zur Originalnachricht gefunden.' });
						}

						const originalMessageUrl = urlMatch[0];
						const urlParts = originalMessageUrl.split('/');
						const originalChannelId = urlParts[5];
						const originalMessageId = urlParts[6];

						// Hole den Original-Channel und die Original-Nachricht
						const originalChannel = await interaction.client.channels.fetch(originalChannelId);
						const originalMessage = await originalChannel.messages.fetch(originalMessageId);

						// WICHTIG: Hole den Thread, falls die Nachricht in einem Thread ist
						let thread = originalChannel;
						if (originalChannel.isThread()) {
							thread = originalChannel;
						}
						else if (originalMessage.thread) {
							// Falls die Nachricht einen Thread erstellt hat
							thread = await originalMessage.thread.fetch();
						}

						// Hole die aktuellen appliedTags vom Thread
						const currentAppliedTags = thread.appliedTags || [];

						// Generiere die Emojis NEU mit den aktuellen Tags
						const emojis = getAppliedTagsEmojis(currentAppliedTags);

						// Parse die Originalnachricht
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
							const match = originalMessage.content.match(regex);
							adventure[key] = match ? match[2].trim() : '*Nicht angegeben*';
						}

						// Erstelle das neue Embed
						const exampleEmbed = new EmbedBuilder()
							.setColor(0xff8800)
							.setAuthor({
								name: originalMessage.author.globalName || originalMessage.author.username,
								iconURL: originalMessage.author.displayAvatarURL(),
							})
							// Verwende den Thread-Namen
							.setTitle(thread.name)
							.setURL(originalMessage.url)
							.addFields(
								{ name: 'Beschreibung', value: adventure.description, inline: false },
								{ name: 'Regelwerk', value: adventure.system, inline: false },
								{ name: 'Datum & Uhrzeit', value: adventure.datetime, inline: true },
								{ name: 'Webcam', value: adventure.webcam, inline: true },
								{ name: 'Anmerkungen', value: adventure.notes, inline: false },
							)
							.setTimestamp();

						// Aktualisiere die Nachricht mit NEUEN Emojis
						await targetMessage.edit({
							content: `## Neue Runde am Schwarzen Brett\n## ${emojis}\n${originalMessage.url}`,
							embeds: [exampleEmbed],
						});

						await interaction.editReply({ content: 'Nachricht wurde erfolgreich aktualisiert!' });

					}
					catch (error) {
						console.error('Fehler beim Regenerieren der Nachricht:', error);
						await interaction.editReply({
							content: `Fehler beim Aktualisieren: ${error.message}`,
						});
					}
					break;
				}
				else {
					await interaction.reply({
						content: 'Bitte Nachricht in <#1238834482681745487> auswählen',
						ephemeral: true,
					});
					break;
				}


			default:
				await interaction.reply({ content: 'There was an error while executing this MessageContextMenuCommand!', ephemeral: true });
				console.log(`Error: MessageContextMenuCommand ${interaction.commandName} noch nicht implemetiert.`);
				console.log(interaction);
			}
		}
		else if (interaction.isStringSelectMenu()) {
			// respond to the select menu
		}
	},
};