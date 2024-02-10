require("dotenv").config();

const { Spot } = require("@binance/connector");
const Binance = require("binance-api-node").default;

// Authenticated client, can make signed calls
const binanceClient = Binance({
	apiKey: process.env.BINANCE_KEY,
	apiSecret: process.env.BINANCE_SECRET,
	getTime: () => Date.now(),
});

const spotClient = new Spot(
	process.env.BINANCE_KEY,
	process.env.BINANCE_SECRET
);

module.exports = { spotClient, binanceClient };
