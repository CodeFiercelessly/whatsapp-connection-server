import mongoose, { Schema } from 'mongoose';
const serverSchema = new Schema(
	{
		user_id: {
			type: String,
			unique: true,
			required: true,
		},
		status: {
			type: String,
			enum: ['connected', 'disconnected', 'reconnect'],
			default: 'disconnected',
		},
		auth_config: String,
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export const Server = mongoose.model('Servers', serverSchema);
