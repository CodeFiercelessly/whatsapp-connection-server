export class RequestValidationError extends Error {
	constructor(message) {
		super(message); // (1)
		this.name = 'RequestValidationError'; // (2)
	}
}
