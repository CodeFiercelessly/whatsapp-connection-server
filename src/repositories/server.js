import baseRepository from './base';
import { Server } from '../models';

export const serverRepository = ((inherit) =>
	Object.freeze({
		model: Server,
		...inherit,
	}))(baseRepository);
