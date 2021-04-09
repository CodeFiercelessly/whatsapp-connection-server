import initiateUserConnection from './initiateUserConnection';
import createUserConnectionObject from './createUserConnectionObject';

module.exports = (appEventContext = null) => {
	if (appEventContext) {
		appEventContext.on('createUserWhatsAppConnectionObject', (...args) =>
			createUserConnectionObject({ appEventContext }, ...args),
		);
		appEventContext.on('initiateUserWhatsAppServerConnection', (...args) =>
			initiateUserConnection({ appEventContext }, ...args),
		);
	}
};
