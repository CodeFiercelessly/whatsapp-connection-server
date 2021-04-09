import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const { MONGO_CONNECTION_STRING } = process.env;

export default {
	connect: () =>
		new Promise(async (resolve, reject) => {
			try {
				mongoose.connect(
					MONGO_CONNECTION_STRING,
					{
						useNewUrlParser: true,
						useUnifiedTopology: true,
						useFindAndModify: false,
						useCreateIndex: true,
					},
					(err, db) => {
						if (err) return reject(err);
						return resolve(db);
					},
				);
			} catch (error) {
				return reject(error);
			}
		}),
};

const myCustomLabels = {
	totalDocs: 'itemCount',
	limit: 'perPage',
	page: 'currentPage',
	nextPage: 'next',
	prevPage: 'prev',
	totalPages: 'pageCount',
	pagingCounter: 'slNo',
	meta: 'paginator',
};

mongoosePaginate.paginate.options = {
	lean: true,
	customLabels: myCustomLabels,
};

mongooseAggregatePaginate.options = {
	lean: true,
	customLabels: myCustomLabels,
};
