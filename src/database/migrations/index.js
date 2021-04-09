import path from 'path';
import fs from 'fs';
import { migrationRepository } from '../../repositories';
export default async () => {
	try {
		const availableMigrations = {};
		fs.readdirSync(__dirname)
			.filter((file) => {
				return file.indexOf('.') !== 0 && file.slice(-3) === '.js' && file !== 'index.js';
			})
			.map((migrationName) => {
				availableMigrations[migrationName.substring(0, migrationName.length - 3)] = migrationName;
			});

		const ranMigrations = await migrationRepository.all();
		ranMigrations.map(({ name }) => delete availableMigrations[name]);
		const migrations = Object.values(availableMigrations);

		const run = async (index = 0) => {
			const file = migrations[index];
			if (!file) return;
			const migration = require(path.join(__dirname, file));
			await migrationRepository.create({ name: file.substring(0, file.length - 3) });
			await migration.process();
			if (migrations[index + 1]) return await run(index + 1);
			return Promise.resolve();
		};

		await run();
		console.log('==== Done Running Migrations ==== ');
	} catch (error) {
		console.error(error);
	}
};
