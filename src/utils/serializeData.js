export const serializeData = (data) => (typeof data === 'object' ? JSON.parse(JSON.stringify(data)) : data);
