const { binanceClient } = require("./client");

/**
 * This function is used to place an order with the specified order data.
 *
 * @param {Object} orderData - The order data object containing properties such as symbol, side, quantity, and price.
 * @returns {Promise} - A promise that resolves when the order is successfully placed or rejects with an error.
 *
 * @example
 * const orderData = {
    symbol: "XLMETH",
	side: "BUY",
	quantity: "1000",
	type: "MARKET",
 * };
 *
 * await placeOrder(orderData);
 */
const placeOrder=async (orderData) => {
	console.log(orderData);
	try {
		const details = await binanceClient.order(orderData);
		console.log("Order Placed details", JSON.stringify(details));
	} catch (error) {
		console.error("🚀 ~ placeOrder ~ error:", error);
	}
};
module.exports = { placeOrder };
