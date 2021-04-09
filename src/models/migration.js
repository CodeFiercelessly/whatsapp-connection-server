import mongoose, { Schema } from 'mongoose';
const migrationSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export const Migration = mongoose.model('Migrations', migrationSchema);
