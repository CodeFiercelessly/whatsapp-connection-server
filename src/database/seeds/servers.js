import path from 'path';
import dotenv from 'dotenv';

import { serverRepository } from '../../repositories';
import { EVENT_TYPES } from '../../shared/constants';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const seed = (appEventContext) => {
	return Object.freeze({
		async process() {
			try {
				const servers = await serverRepository.all();
				if (servers && servers.length < 1) {
					await serverRepository.create({
						user_id: '1234',
						status: 'reconnect',
					});
				}
			} catch (error) {
				appEventContext.emit(EVENT_TYPES.SERVER_ERROR, error);
			}
		},
	});
};

module.exports = seed;
