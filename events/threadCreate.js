const { Events } = require('discord.js');

module.exports = {
	name: Events.ThreadCreate,
	async execute(thread) {
		try {
			const firstMessage = await thread.fetchStarterMessage();
			firstMessage.react('<:wtRaise:1055581587368058950>');
			// TODO: nach der DisCon3 firstMessage.react('<:wtTime:1055582504754622537>');
		}
		catch (error) {
			console.error('Fehler beim Hinzufügen des Emojis:', error);
		}

	},
};