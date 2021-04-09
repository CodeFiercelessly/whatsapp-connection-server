import baseRepository from './base';
import { Migration } from '../models';

export const migrationRepository = ((inherit) =>
	Object.freeze({
		model: Migration,
		...inherit,
	}))(baseRepository);
