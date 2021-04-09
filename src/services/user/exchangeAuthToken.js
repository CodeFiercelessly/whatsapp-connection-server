import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userRepository } from '../../repositories';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const { JWT_SECRET } = process.env;

export default async (token) => {
	try {
		const { identifier } = jwt.verify(token, JWT_SECRET);
		const user = await userRepository.getUserByEmail(identifier);
		if (!user) throw new Error('Invalid token');
		return user;
	} catch (error) {
		throw error;
	}
};
