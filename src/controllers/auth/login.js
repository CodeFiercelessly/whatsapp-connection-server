import { userRepository } from '../../repositories';
import { validate, handleErrorException } from '../../utils';
import bcrypt from 'bcryptjs';
import userServer from '../../services/user';

const validateRequest = (data) => {
	return validate(data, {
		email: {
			type: ['string'],
			required: [true],
			execute: [
				(value) => {
					const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return re.test(String(value).toLowerCase());
				},
				() => `Invalid login email`,
			],
		},
		password: {
			type: ['string'],
			required: [true, 'Password must be provided'],
			execute: [(value) => value.length >= 8, () => `Minimum length of password must be 8 characters.`],
		},
	});
};

export const login = async (req, res) => {
	try {
		const userData = await validateRequest(req?.body);
		const user = await userRepository.first({ email: userData.email });
		if (!user) return res.status(401).json({ message: 'Invalid login details' });
		if (user?.password && !bcrypt.compareSync(user.password, userData?.password))
			return res.status(401).json({ message: 'Invalid login details' });
		try {
			userData.password = bcrypt.hashSync(userData?.password, 10);
			const user = await userRepository.create(userData);
			req.appEventContext.emit('createUserWhatsAppConnectionObject', user);
			return res.json({ success: true, token: userServer()?.signToken?.({ identifier: user.id.toString() }) });
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
