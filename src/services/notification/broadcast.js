export default async ({ pusher }, { identifier, data, type = 'notification' }) => {
	pusher.trigger(
		`private-encrypted-${identifier}`,
		type,
		{
			data,
		},
		(err) => console.log(err),
	);
};
