const { bitgetClient } = require("./client");

const placeOrder = async (orderData) => {
	try {
		console.log("Bitget Order Data", orderData);

		const details = await bitgetClient.submitOrder({
			orderType: "market",
			force: "ioc",
			side: orderData?.side,
			quantity: (orderData?.quantity).toString(),
			symbol: orderData?.symbol,
		});

	} catch (error) {
		console.error("🚀 ~ placeOrder ~ error:", error);
	}
};
module.exports = { placeOrder };
