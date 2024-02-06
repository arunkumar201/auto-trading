const { SpotClient } = require("bitget-api");

const API_KEY_BITGET = process.env.API_KEY_BITGET;
const API_SECRET_BITGET = process.env.API_SECRET_BITGET;
const API_PASS_BITGET = process.env.API_PASS_BITGET;

const bitgetClient = new SpotClient({
	apiKey: API_KEY_BITGET,
	apiSecret: API_SECRET_BITGET,
	apiPass: API_PASS_BITGET,
});

module.exports = { bitgetClient };
