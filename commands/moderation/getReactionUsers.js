const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getreactionusers')
		.setDescription('Get All Users who reacted on one Post')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel where the message is')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('messageid')
				.setDescription('MessageID of')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('emojiid')
				.setDescription('EmojiID of')
				.setRequired(true)),
	async execute(interaction) {
		const channel = interaction.options.getChannel('channel');
		const messageid = interaction.options.getString('messageid');
		const emojiid = interaction.options.getString('emojiid');
		await interaction.deferReply();
		const message = await channel.messages.fetch(messageid);
		const reaction = message.reactions.cache.get(emojiid);

		let allUsers = {};


		const users = await reaction.users.fetch({ limit:100 });
		allUsers = users;

		const userArray = Array.from(users);

		if (users.size >= 100) {
			const users2 = await reaction.users.fetch({ limit:100, after:userArray[99][0] });
			console.log(users);
			console.log(users2);
			allUsers = allUsers.concat(users2);
			console.log(allUsers);

		}
		let response = '';
		async function callback() {
			console.log('all done');
			console.log(response);
			const fs = require('fs');
			fs.writeFile('/var/www/vhosts/troopermaxx.de/gorgamosh.troopermaxx.de/Usys.txt', response, err => {
				if (err) {
					console.error(err);
					return;
				}
			});
			const file = new AttachmentBuilder('/var/www/vhosts/troopermaxx.de/gorgamosh.troopermaxx.de/Usys.txt');
			await interaction.followUp({ files: [file] });
		}

		let itemsProcessed = 0;

		await allUsers.each(async (user) => {
			// get the member object as users don't have roles
			try {
				/* const member = */
				await message.guild.members.fetch(user.id);
				response += user.username + '#' + user.discriminator + '\n';
				// console.log(user.username+"#"+ user.discriminator)
			}
			catch (error) {
				console.log(user.username + ' ' + user.id + ' ' + error);
			}
			itemsProcessed++;
			if (itemsProcessed === allUsers.size) {
				callback();
			}

		});

	},
};