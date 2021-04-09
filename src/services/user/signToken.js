import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const { JWT_SECRET, ACTIVE_SESSION_HOURS } = process.env;

export default (payload) => {
	const expireDate = new Date();
	expireDate.setHours(expireDate.getHours() + ACTIVE_SESSION_HOURS);
	expireDate.setHours(0, 0, 0, 0);
	const todayDate = new Date();
	return jwt.sign(payload, JWT_SECRET, { expiresIn: Math.round((expireDate - todayDate) / 1000) + 5 });
};
