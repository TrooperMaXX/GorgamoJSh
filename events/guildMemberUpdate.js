const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.GuildMemberUpdate,
	async execute(oldMember, newMember) {

		if (!oldMember.roles.cache.some(role => role.name === 'Server Neuling') && newMember.roles.cache.some(role => role.name === 'Server Neuling')) {
			const buddyChannel = newMember.client.channels.cache.get('1225754090299064340');
			const helpTxts = [ 'braucht Hilfe!', 'hat sich im Wald verirrt :o', 'hat eine Nat 1 auf Orientierung gewürfelt!', 'findet nicht die Richtigen Würfel', 'hat nicht einmal den Quantumoger gefunden', 'Möchte aus dem Bälleparadies abgeholt werden', 'Ist im Turm gefangen'];
			const choosenHelpTxt = helpTxts[Math.floor(Math.random() * helpTxts.length)];
			const exampleEmbed = new EmbedBuilder()
				.setColor(0xff8800)
				.setAuthor({ name: newMember.displayName, iconURL: newMember.displayAvatarURL() })
				.setDescription(`<@${newMember.id}> ${choosenHelpTxt}`)
				.setTimestamp();

			buddyChannel.send({ content: 'Hey <@&1230570229369667584>', embeds: [exampleEmbed] });
		}

		if (!oldMember.roles.cache.some(role => role.name === 'Scammer') && newMember.roles.cache.some(role => role.name === 'Scammer')) {
			const buddyChannel = newMember.client.channels.cache.get('1286838131349262387');
			const helpTxts = [ 'will leute scammen'];
			const choosenHelpTxt = helpTxts[Math.floor(Math.random() * helpTxts.length)];
			const exampleEmbed = new EmbedBuilder()
				.setColor(0xff8800)
				.setAuthor({ name: newMember.displayName, iconURL: newMember.displayAvatarURL() })
				.setDescription(`<@${newMember.id}> ${choosenHelpTxt}`)
				.setTimestamp();

			buddyChannel.send({ content: '', embeds: [exampleEmbed] });
		}

	},
};