const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

	const args = message.content.split(/ +/g);
    const command = args.shift().slice(config.prefix.length).toLowerCase();
	
	if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
		message.channel.send('Error 69');
		return;
	}

	if (!message.member.permissions.has('MANAGE_MESSAGES')) {
		message.channel.send('Oops, nie posiadasz uprawnień do zarządzania wiadomościami!');
		return;
	}

	if (!args[0] || !args[1]) {
		message.channel.send('Usage: !move <docelowy kanał> <id wiadomości> <kanał początkowy>');
		return;
	}

	if (!Discord.MessageMentions.CHANNELS_PATTERN.test(args[0])) {
		message.channel.send('Nieprawidłowy kanał!');
		return;
	}

	var toChannel = message.guild.channels.get(args[0].replace(/<#|>/g, ''));
	if (!toChannel) {
		message.channel.send('Nie znaleziono oznaczonego kanału!');
		return;
	}

	if (toChannel.type !== 'text') {
		message.channel.send('Oznaczony kanał nie istnieje');
		return;
	}

	/*if (!toChannel.permissionsFor(message.member).has('SEND_MESSAGES')) {
		message.channel.send('Nie możesz przenieść wiadomości na kanał, do którego nie masz uprawnień!');
		return;
	}*/

	var fromChannel = message.channel;
	if (args[2]) {
		fromChannel = message.guild.channels.get(args[2].replace(/<#|>/g, ''));
		if (!fromChannel || fromChannel.type !== 'text') fromChannel = message.channel;
	}

	var m = await message.channel.send('Moving message...');

	fromChannel.messages.fetch(args[1]).then(async (message) => {
		var wbs = await toChannel.fetchWebhooks();
		if (wbs.size < 1) var wb = await toChannel.createWebhook('Move Message');
		else var wb = wbs.first();

		wb.send(message.content || '', { username: message.author.tag, avatarURL: message.author.avatarURL(), embeds: message.embeds, files: message.attachments.array() }).then(() => {
		  m.edit('Moved message from user ' + Discord.Util.escapeMarkdownw(message.author.tag) + ' from ' + fromChannel.toString() + ' to ' + toChannel.toString());
		}).catch((e) => {
		  m.edit(e.message || 'Unknown Error');
		})
	}).catch((e) => {
			m.edit(e.message || 'Unknown Error');
	});
});

module.exports.help = {
  name: "move"
}
