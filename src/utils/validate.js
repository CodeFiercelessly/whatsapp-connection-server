import { RequestValidationError } from '../shared/error';

export const validate = (data = {}, rules) => {
	if (typeof data !== 'object' || typeof rules !== 'object') Promise.reject('Validation Input Error');
	const validated = {};
	for (const rule of Object.keys(rules)) {
		if (rules?.[rule]?.required) {
			if (!Array.isArray(rules?.[rule]?.required)) return Promise.reject('Validation Input Error');
			const [required, requiredError] = rules?.[rule]?.required;
			if (typeof required !== 'boolean') return Promise.reject('Validation Input Error');
			if (!(required && !!data?.[rule]))
				return Promise.reject(
					new RequestValidationError(
						requiredError ?? (rules?.[rule]?.message?.(data?.[rule] || '') || `${rule} is required!`),
					),
				);
		}

		if (rules?.[rule]?.type) {
			if (!Array.isArray(rules?.[rule]?.type)) return Promise.reject('Validation Input Error');
			const [type, typeError] = rules?.[rule]?.type;
			if (typeof type !== 'string') return Promise.reject('Validation Input Error');
			if (typeof data?.[rule] !== type)
				return Promise.reject(
					new RequestValidationError(
						typeError ?? (rules?.[rule]?.message?.(data?.[rule] || '') || `Invalid type ${rule}`),
					),
				);
		}

		const [passed, failedError] = [
			rules?.[rule]?.execute?.[0]?.(data?.[rule], rule, data) ?? true,
			rules?.[rule]?.execute?.[0]?.(data?.[rule] || ''),
		];
		if (!passed) return Promise.reject(new RequestValidationError(`${rule}: validation failed`));
		validated[rule] = data?.[rule];
	}
	return Promise.resolve(validated);
};
