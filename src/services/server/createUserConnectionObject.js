import { serverRepository } from '../../repositories';

export default async (_, user) => {
	try {
		await serverRepository.create({
			user_id: user.id.toString(),
		});
	} catch (error) {
		console.log({ error });
	}
};
