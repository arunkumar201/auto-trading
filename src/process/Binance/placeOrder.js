const { spotClient, binanceClient } = require("./client");

/**
 * This function is used to place an order with the specified order data.
 *
 * @param {Object} orderData - The order data object containing properties such as symbol, side, quantity, and type.
 * @returns {Promise} - A promise that resolves when the order is successfully placed or rejects with an error.
 */

const placeOrder = async (data) => {
	const orderData = {
		symbol: data?.symbol,
		side: data?.side,
		quantity: data?.quantity,
		type: "MARKET",
	};
	try {
		const response = await spotClient.newOrder(
			orderData.symbol,
			orderData.side,
			orderData.type,
			{
				quoteOrderQty: data?.quantity,
			}
		);
		spotClient.logger.log(response?.data);
	} catch (error) {
		const res = await binanceClient.exchangeInfo({
			symbol: orderData?.symbol,
		});
		const notionalFilter = res.symbols[0].filters[6];
		if (notionalFilter.minNotional > data?.quantity) {
			console.log(
				`Minimum USDT($) required to Place an order on ${orderData?.symbol} is ${notionalFilter.minNotional} or above. Please adjust order quantity.`
			);
		} else {
			
			spotClient.logger.error("Error placing order:", error?.response?.data?.msg);
		}
	}
};

module.exports = { placeOrder };
