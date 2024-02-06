const dotenv = require("dotenv").config();
const { Worker } = require("bullmq");

const { processOrderOnBitget } = require("../processOrderOnBitget");

const REDIS_CONNECTION_OPTION = {
	port: parseInt(process.env.REDIS_PORT),
	host: process.env.REDIS_HOST,
	username: "default",
	password: process.env.REDIS_PASSWORD,
};
const setUpBitgetWorker = async () => {
	const worker = new Worker(`OrderQueue-bitget`, processOrderOnBitget, {
		connection: REDIS_CONNECTION_OPTION,
		autorun: true,
		useWorkerThreads: true,
	});
};

module.exports = { setUpBitgetWorker };
