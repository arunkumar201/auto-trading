const { bitgetClient } = require("./client");

const placeOrder = async (orderData) => {
	try {
		const details = await bitgetClient.submitOrder({
			orderType: "market",
			force: "ioc",
			side: orderData?.side,
			quantity: (orderData?.quantity).toString(),
			symbol: orderData?.symbol,
		});

		console.log("Order Placed details", JSON.stringify(details));
	} catch (error) {
		console.error("🚀 ~ placeOrder ~ error:", error);
	}
};
module.exports = { placeOrder };
