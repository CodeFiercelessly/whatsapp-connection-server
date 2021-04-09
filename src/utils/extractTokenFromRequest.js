export const extractTokenFromRequest = (req) => {
	const { authorization = null } = req?.headers;
	if (authorization && typeof authorization === 'string') {
		const [tokenType, token] = authorization.split(' ');
		if (tokenType !== 'Bearer') return null;
		return token;
	}
	const { token = null } = req?.query;
	return token;
};
