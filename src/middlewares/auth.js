import userService from '../services/user';
import { extractTokenFromRequest } from '../utils/extractTokenFromRequest';

export const auth = (req, res, next) => {
	try {
		const token = extractTokenFromRequest(req);
		if (!token) throw new Error('Not authorized');
		const user = userService?.().exchangeAuthToken?.(token);
		if (!user) throw new Error('Not authorized');
		req.session = { user };
		return next();
	} catch (error) {
		return res.status(401).json({ success: false, message: error });
	}
};
