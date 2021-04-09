import path from 'path';
import fs from 'fs';

export default async (appEventContext) => {
	try {
		const availableSeeds = {};
		fs.readdirSync(__dirname)
			.filter((file) => {
				return file.indexOf('.') !== 0 && file.slice(-3) === '.js' && file !== 'index.js';
			})
			.map((seedName) => {
				availableSeeds[seedName.substring(0, seedName.length - 3)] = seedName;
			});

		const seeds = Object.values(availableSeeds);

		const run = async (index = 0) => {
			const file = seeds[index];
			if (!file) return;
			const seed = require(path.join(__dirname, file))(appEventContext);
			await seed.process();
			if (seeds[index + 1]) return await run(index + 1);
			return Promise.resolve();
		};

		await run();
		console.log('==== Done Seeding Database ==== ');
	} catch (error) {
		console.error(error);
	}
};
