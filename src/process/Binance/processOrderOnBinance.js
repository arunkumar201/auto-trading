const { placeOrder } = require("./placeOrder");

const processOrderOnBinance = async (job, done) => {
	console.log(
		"------------------Order is Processing on Binance  ---------With job id",
		job?.id
	);
	
	const orderData=JSON.parse(job.data);
	
	if (!orderData) {
		console.log("No Order Data provided");
		done();
	}
	await placeOrder(orderData);
	done();
};

module.exports = { processOrderOnBinance };
