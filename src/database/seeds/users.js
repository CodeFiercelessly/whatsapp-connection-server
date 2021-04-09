import path from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import { userRepository } from '../../repositories';
import { EVENT_TYPES, USER_ROLES, USER_STATUS, VERIFICATION_STATES } from '../../shared/constants';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

const seed = (appEventContext) => {
	const checkIfAdminExist = () => userRepository.first({ email: ADMIN_EMAIL });

	const createAdminUser = () => {
		const defaultAdminData = {
			email: ADMIN_EMAIL,
			password: bcrypt.hashSync(ADMIN_PASSWORD, 10),
			role: USER_ROLES.ADMIN,
			verification: {
				state: VERIFICATION_STATES.ACCEPTED,
				email_verified: true,
			},
			profile: {
				first_name: 'System',
				last_name: 'Administrator',
			},
			status: USER_STATUS.ACTIVE,
		};
		return userRepository.create(defaultAdminData);
	};

	return Object.freeze({
		async process() {
			try {
				const adminExist = await checkIfAdminExist();
				!adminExist ? await createAdminUser() : null;
			} catch (error) {
				appEventContext.emit(EVENT_TYPES.SERVER_ERROR, error);
			}
		},
	});
};

module.exports = seed;
