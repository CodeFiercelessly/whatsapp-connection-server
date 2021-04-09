import { EVENT_TYPES } from '../shared/constants';
import { RequestValidationError } from '../shared/error';

export const handleErrorException = (error, { appEventContext, res }) => {
	if (error?.name == 'ValidationError') return res.status(422).json({ message: error.message });
	if (error instanceof RequestValidationError) return res.status(400).json({ message: error.message });
	appEventContext.emit(EVENT_TYPES.SERVER_ERROR, error);
	return res.status(500).json({
		message: error?.message || error,
	});
};
