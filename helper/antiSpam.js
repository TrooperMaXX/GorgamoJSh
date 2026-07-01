const { EmbedBuilder, PermissionsBitField } = require('discord.js');

const SCAMMER_ROLE_ID = '1286835950227423272';
const BESCHWERDE_CHANNEL_ID = '1086800284023529532';
const MOD_PING = '<@&1042922106326876170>';
// eslint-disable-next-line no-inline-comments
const TIMEOUT_MS = 24 * 60 * 60 * 1000; // 1 Tag
const noop = (err) => console.error('[antiSpam]', err);
/**
 * Prueft eine Nachricht auf das bekannte Scam-Muster
 * (Rollen-Ping + >= 2 Bildanhaenge + faktisch kein Text).
 * Bei Treffer: loeschen, Scammer-Rolle vergeben, Timeout, Mods informieren.
 * @returns {Promise<boolean>} true, wenn als Spam behandelt
 */
async function handleSpam(message) {
	// Bots und DMs ignorieren
	if (message.author.bot || !message.guild || !message.member) return false;

	// Staff (Manage Messages) nie filtern
	if (message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return false;

	// Guenstige Checks zuerst (Short-Circuit)
	const hasRolePing = message.mentions.roles.size > 0;
	if (!hasRolePing) return false;

	const imageCount = message.attachments.filter(
		a => a.contentType?.startsWith('image/'),
	).size;
	if (imageCount < 2) return false;

	const textWithoutPings = message.content.replace(/<@&?\d+>/g, '').trim();
	if (textWithoutPings.length >= 15) return false;

	// ---- Ab hier: Treffer ----

	// Inhalt sichern, bevor geloescht wird
	const fileNames = message.attachments
		.filter(a => a.contentType?.startsWith('image/'))
		.map(a => a.name);
	const originalContent = message.content || '(kein Text)';
	const channelMention = `<#${message.channelId}>`;
	const author = message.author;

	// 1. Nachricht loeschen
	await message.delete().catch(() => {noop;});

	// 2. Scammer-Rolle vergeben + Timeout
	await message.member.roles.add(SCAMMER_ROLE_ID).catch(() => {noop;});
	await message.member.timeout(TIMEOUT_MS, 'Auto: Scam-Spam erkannt').catch(() => {noop;});

	// 3. Mods informieren
	const beschwerdeChannel = message.client.channels.cache.get(BESCHWERDE_CHANNEL_ID);
	if (beschwerdeChannel) {
		const embed = new EmbedBuilder()
			.setColor(0xff0000)
			.setTitle('Scam-Spam automatisch entfernt')
			.setAuthor({ name: author.tag, iconURL: author.displayAvatarURL() })
			.addFields(
				{ name: 'User', value: `<@${author.id}> (${author.id})` },
				{ name: 'Channel', value: channelMention },
				{ name: 'Inhalt', value: originalContent.slice(0, 1024) },
				{ name: 'Anhänge', value: fileNames.join('\n').slice(0, 1024) || '(keine)' },
				{ name: 'Aktion', value: 'Geloescht, Scammer-Rolle vergeben, 24h Timeout' },
			)
			.setTimestamp();


		await beschwerdeChannel.send({
			content: `${MOD_PING} bitte pruefen/bannen (Timeout laeuft in 24h ab).`,
			embeds: [embed],
		}).catch(() => {noop;});

	}

	return true;
}

module.exports = { handleSpam };