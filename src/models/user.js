import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { USER_ROLES, VERIFICATION_STATES, USER_STATUS } from '../shared/constants';

const profileSchema = new Schema(
	{
		avatar: {
			type: String,
		},
		first_name: {
			type: String,
		},
		last_name: {
			type: String,
		},
		phone_number: {
			type: String,
		},
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
		},
		verification: {
			state: {
				type: String,
				enum: Object.values(VERIFICATION_STATES),
				default: VERIFICATION_STATES.PENDING,
			},
			reason: {
				type: String,
			},
			email_verified: {
				type: Boolean,
				default: false,
			},
		},
		profile: profileSchema,
		role: {
			type: String,
			enum: Object.values(USER_ROLES),
			default: USER_ROLES.CUSTOMER,
			required: true,
		},
		settings: {
			require_2fa: {
				type: Boolean,
				required: true,
				default: false,
			},
		},
		status: {
			type: String,
			enum: Object.values(USER_STATUS),
			default: USER_STATUS.ACTIVE,
		},
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

userSchema.plugin(mongoosePaginate);

export const User = mongoose.model('Users', userSchema);
