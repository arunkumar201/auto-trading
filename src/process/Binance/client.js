require("dotenv").config();

const { Spot } = require("@binance/connector");
const Binance = require("binance-api-node").default;

// Authenticated client, can make signed calls
const binanceClient = Binance({
	apiKey: process.env.BINANCE_KEY,
	apiSecret: process.env.BINANCE_SECRET,
	httpBase: "https://testnet.binance.vision",
	getTime: () => Date.now(),
});

const spotClient = new Spot(
	process.env.BINANCE_KEY,
	process.env.BINANCE_SECRET,
	{ baseURL: "https://testnet.binance.vision" }
);

module.exports = { spotClient,binanceClient };
