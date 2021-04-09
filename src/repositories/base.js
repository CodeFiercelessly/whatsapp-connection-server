import { merge } from 'lodash';

export default Object.freeze({
	first(filter) {
		return this.model.findOne(filter);
	},
	create(data) {
		return this.model.create(data);
	},
	get(filter) {
		return this.model.find(filter);
	},
	all() {
		return this.model.find();
	},
	async updateInstance(self, update) {
		merge(self, update);
		return self.save();
	},
});
