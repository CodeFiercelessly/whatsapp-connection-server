import { serverRepository } from '../../repositories';

export default async (_, user) => {
	try {
		const server = await serverRepository.first({
			user_id: user.id.toString(),
			status: 'disconnected',
		});
		if (server) {
			await serverRepository.updateInstance(server, { status: 'reconnect' });
		}
	} catch (error) {
		console.log({ error });
	}
};
