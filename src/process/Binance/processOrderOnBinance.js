const { placeOrder } = require("./placeOrder");

const processOrderOnBinance = async (job, done) => {
	console.log(
		"------------------Order is Processing on Binance  ---------With job id",
		job?.id
	);
	const data = JSON.parse(job.data);
	const orderData = {
		symbol: data?.symbol,
		side: data?.side,
		quantity: data?.quantity,
		type: "MARKET",
	};
	await placeOrder(orderData);
	done();
};

module.exports = { processOrderOnBinance };
