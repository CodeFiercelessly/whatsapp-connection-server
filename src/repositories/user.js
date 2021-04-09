import baseRepository from './base';
import { USER_STATUS, USER_ROLES } from '../shared/constants';
import { User } from '../models';
import { merge } from 'lodash';

export const userRepository = ((inherit) => ({
	model: User,
	...inherit,
	async getCustomerById(id, filters = {}) {
		filters.role = USER_ROLES.CUSTOMER;
		if (!filters?.status) filters.status = USER_STATUS.ACTIVE;
		const where = merge({ _id: id }, filters);
		return this.findOne(where);
	},
	async getCustomerByEmail(email, filters = {}) {
		filters.role = USER_ROLES.CUSTOMER;
		if (!filters?.status) filters.status = USER_STATUS.ACTIVE;
		const where = merge({ email }, filters);
		return this.findOne(where);
	},
}))(baseRepository);
