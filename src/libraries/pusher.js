import path from 'path';
import dotenv from 'dotenv';
import Pusher from 'pusher';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const { PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER } = process.env;

export const pusher = new Pusher({
	appId: PUSHER_APP_ID,
	key: PUSHER_KEY,
	secret: PUSHER_SECRET,
	cluster: PUSHER_CLUSTER,
	useTLS: true,
});
