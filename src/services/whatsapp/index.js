import { WAConnection } from '@adiwajshing/baileys';
import fs from 'fs';

async function connectToWhatsApp() {
	const conn = new WAConnection();
	conn.on('qr', (qr) => {
		// Now, use the 'qr' string to display in QR UI or send somewhere
	});
	// called when WA sends chats
	// this can take up to a few minutes if you have thousands of chats!
	conn.on('chats-received', async ({ hasNewChats }) => {
		console.log(`you have ${conn.chats.length} chats, new chats available: ${hasNewChats}`);

		const unread = await conn.loadAllUnreadMessages();
		console.log('you have ' + unread.length + ' unread messages');
	});
	// called when WA sends chats
	// this can take up to a few minutes if you have thousands of contacts!
	conn.on('contacts-received', () => {
		console.log('you have ' + Object.keys(conn.contacts).length + ' contacts');
	});

	// this will be called as soon as the credentials are updated
	conn.on('credentials-updated', () => {
		// save credentials whenever updated
		console.log(`credentials updated!`);
		const authInfo = conn.base64EncodedAuthInfo(); // get all the auth info we need to restore this session
		fs.writeFileSync('./auth_info.json', JSON.stringify(authInfo, null, '\t')); // save this info to a file
	});
	conn.loadAuthInfo('./auth_info.json');
	await conn.connect();
	conn.on('chat-update', (chatUpdate) => {
		// `chatUpdate` is a partial object, containing the updated properties of the chat
		// received a new message
		if (chatUpdate.messages && chatUpdate.count) {
			const message = chatUpdate.messages.all()[0];
			console.log(message);
		} else console.log(chatUpdate); // see updates (can be archived, pinned etc.)
	});
}

const launch = async () => {
	console.log('In here');
	const conn = new WAConnection();
	conn.on('qr', (qr) => {
		console.log({ qr });
	});
	await conn.connect();
};

module.exports = (appEventContext = null) => {
	if (appEventContext) {
		appEventContext.on('launchWhatsAppConnection', async (...args) => await launch(appEventContext, ...args));
	}
};
