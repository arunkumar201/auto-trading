const Binance = require("binance-api-node").default;

// Authenticated client, can make signed calls
const binanceClient = Binance({
	apiKey: process.env.BINANCE_KEY,
	apiSecret: process.env.BINANCE_SECRET,
	getTime: () => Date.now(),
});

module.exports = { binanceClient };
