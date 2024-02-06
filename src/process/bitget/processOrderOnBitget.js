const { placeOrder } = require("./placeOrder");

const processOrderOnBitget = async (job, done) => {
	console.log(
		"------------------Order is Processing on Bitget  ---------With job id",
		job?.id
	);
	const data = JSON.parse(job.data);
	const orderData = {
		symbol: data?.symbol,
		side: data?.side,
		quantity: data?.quantity,
	};
	await placeOrder(orderData);
	done();
};

module.exports = { processOrderOnBitget };
