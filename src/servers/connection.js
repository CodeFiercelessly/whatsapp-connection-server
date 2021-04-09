import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
var glob = require('glob');

import { addEventContext, appEventContext } from '../middlewares';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const { PORT } = process.env;

const startServer = () => {
	const app = express();

	app.use(addEventContext);

	app.get('/launch', (req, res) => {
		req.appEventContext.emit('launchWhatsAppConnection');
		res.status(200).end();
	});

	app.listen(PORT || 8000, () => {
		console.log(`Connection server is listening to port ${PORT || 8000}`);
	});
};

const registerAppServiceEvents = (appEventContext) => {
	const servicesDirectory = __dirname + '/../services/';
	glob(servicesDirectory + '/**/*.js', function (err, files) {
		if (err) throw err;
		files
			.filter((fileName) => {
				return fileName.indexOf('.') !== 0 && fileName.slice(-3) === '.js' && fileName !== 'index.js';
			})
			.forEach((fileName) => {
				const service = require(path.join(fileName));
				if (typeof service === 'function') service(appEventContext);
			});
	});
};

(async () => {
	try {
		registerAppServiceEvents(appEventContext);
		startServer();
	} catch (error) {
		console.error({ error });
	}
})();
