import broadcast from './broadcast';
import { pusher } from '../../libraries/pusher';

module.exports = (appEventContext = null) => {
	if (appEventContext) {
		appEventContext.on('broadcast', (...args) => broadcast({ appEventContext, pusher }, ...args));
	}
};
