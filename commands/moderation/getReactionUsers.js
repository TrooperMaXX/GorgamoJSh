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
		// console.log(userArray)

		const userArray = Array.from(users);

		if (users.size >= 100) {
			// console.log(userArray[99][0])
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

		// Kram für Reaction <-> Role Sync
		// const channel = await interaction.guild.channels.fetch('1042925594205241354')
		// const message = await channel.messages.fetch('1058013636674719804')
		// const reaction = message.reactions.cache.get('1058012971298717766');

		// console.log(channel);
		// console.log(message);
		/* const channel = await interaction.guild.channels.fetch('1055577596726870057')
                const message = await channel.messages.fetch('1087178536416202914')
                const reaction = message.reactions.cache.get('1058012971298717766');*/


		/* allUsers.each(async (user) => {
                        // get the member object as users don't have roles
                        try {
                                const member = await message.guild.members.fetch(user.id)
                        member.roles.add('1055576838283464774')
                        } catch (error) {
                                console.log(user.username + " " +user.id + " " + error )
                        }
                })*/


		// const users2 = await reaction.users.fetch({after: users[24].key})
		/* const userKeys=users.keys()
        console.log(userKeys)
        console.log(Object.keys(userKeys)[99])


        for (const [key, value] of users) {
                console.log(`${key} goes ${value}`);
              }*/
		// console.log(Math.max(users.keys()))
		// console.log(users)
		// await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
		// await interaction.editReply("Erfolgreich alle Schäfchen gezählt");


	},
};