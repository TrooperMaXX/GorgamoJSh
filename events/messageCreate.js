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
		else if (message.channelId == '1378712722950193202' && message.author.id == '1378712890898518176') {
			message.reply('Hier ein weiterer <@&1400752316130394184> \n Wenn dir die Rundenangebote auf dem Würfelturm nicht reichen, kannst du auf unserem befreundeten Server der [Kellerbiertaverne](https://discord.gg/kellerbiertaverne) bestimmt etwas finden! \n Schau doch gerne dort vorbei! Spiel mit, hab Spaß und lern neue Leute kennen <:wt_react_Herz:1065042806424481832> \n https://discord.com/channels/467835226689765376/478083673602916364')
				.then(() => console.log(`Replied to KBT message "${message.content}"`))
				.catch(console.error);
		}

	},
};