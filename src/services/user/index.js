import signToken from './signToken';
import exchangeAuthToken from './exchangeAuthToken';

module.exports = (appEventContext = null) => {
	return Object.freeze({
		signToken,
		exchangeAuthToken,
	});
};
