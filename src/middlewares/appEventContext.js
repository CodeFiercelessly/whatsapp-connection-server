const EventEmitter = require('events');

const appEmitter = new EventEmitter();

const exposedEventContext = {
	emit: appEmitter.emit,
	on: appEmitter.on,
	off: appEmitter.off,
};

export const addEventContext = (req, _, next) => {
	req.appEventContext = exposedEventContext;
	return next();
};

export const appEventContext = exposedEventContext;
