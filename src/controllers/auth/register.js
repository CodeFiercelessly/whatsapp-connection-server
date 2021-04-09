import { userRepository } from '../../repositories';
import { validate, handleErrorException } from '../../utils';
import bcrypt from 'bcryptjs';

const validateRequest = (data) => {
	return validate(data, {
		email: {
			type: ['string'],
			required: [true],
			execute: [(value) => value.length >= 8, () => `Minimum length of password must be 8 characters.`],
		},
		password: {
			type: ['string'],
			required: [true, 'Password must be provided'],
			execute: [(value) => value.length >= 8, () => `Minimum length of password must be 8 characters.`],
		},
	});
};

export const register = async (req, res) => {
	try {
		const userData = await validateRequest(req?.body);
		const userExist = await userRepository.first({ email: userData.email, role: userData.role });
		if (userExist) return res.status(409).json({ message: 'User already exists' });
		try {
			userData.password = bcrypt.hashSync(userData?.password, 10);
			const user = await userRepository.create(userData);
			req.appEventContext.emit('createUserWhatsAppConnectionObject', user);
			return res.json({ success: true });
		} catch (error) {
			return handleErrorException(error, {
				appEventContext: req.appEventContext,
				res,
			});
		}
	} catch (error) {
		return handleErrorException(error, {
			appEventContext: req.appEventContext,
			res,
		});
	}
};
