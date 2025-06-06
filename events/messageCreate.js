const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (!message.guild && message.author.id != '1055607090523152456') {
			const bot_pn_channel = message.client.channels.cache.get('1055621502290120714');

			if (message.attachments.first()) {
				const exampleEmbed = new EmbedBuilder()
					.setColor(0xff8800)
					.setAuthor({ name: message.author.globalName, iconURL: message.author.avatarURL() })
					.setDescription(` ${message.content}`)
					.setImage(message.attachments.first().url)
					.setTimestamp();

				bot_pn_channel.send({ content: `Hey <@&1042922106326876170> \nPN von <@${message.author.id}>`, embeds: [exampleEmbed] });
			}
			else {
				const exampleEmbed = new EmbedBuilder()
					.setColor(0xff8800)
					.setAuthor({ name: message.author.globalName, iconURL: message.author.avatarURL() })
					.setDescription(`${message.content} `)
					.setTimestamp();

				bot_pn_channel.send({ content: `Hey <@&1042922106326876170> \nPN von <@${message.author.id}>`, embeds: [exampleEmbed] });
			}


		}
		else if (message.channelId == '1055621502290120714' && message.reference && message.author.id != '1055607090523152456') {
			message.channel.messages.fetch(message.reference.messageId)
				.then(ref => ref.mentions.members.first().send(message.content))
				.catch(console.error);
		}
		else if (message.mentions.users.has('1055607090523152456') && message.author.id != '1055607090523152456') {
			const bot_pn_channel = message.client.channels.cache.get('1055621502290120714');
			if (message.attachments.first()) {
				const exampleEmbed = new EmbedBuilder()
					.setColor(0xff8800)
					.setAuthor({ name: message.author.globalName, iconURL: message.author.avatarURL() })
					.setDescription(` ${message.content}`)
					.setImage(message.attachments.first().url)
					.setTimestamp();

				bot_pn_channel.send({ content: `Hey <@&1042922106326876170> \nPing von <@${message.author.id}>\n${message.url}`, embeds: [exampleEmbed] });
			}
			else {
				const exampleEmbed = new EmbedBuilder()
					.setColor(0xff8800)
					.setAuthor({ name: message.author.globalName, iconURL: message.author.avatarURL() })
					.setDescription(`${message.content} `)
					.setTimestamp();

				bot_pn_channel.send({ content: `Hey <@&1042922106326876170> \nPing von <@${message.author.id}>\n${message.url}`, embeds: [exampleEmbed] });
			}
		}
		else if (message.channelId == '1238834482681745487') {
			try {
				message.crosspost();
			}
			catch (error) {
				const spam_channel = message.client.channels.cache.get('1055577596726870057');
				spam_channel.send({ content: `Hey <@238563435049123840> \nFehler beim Crossposten!! \n \`\`\`js \n ${error}\`\`\`` });
			}
		}
	},
};