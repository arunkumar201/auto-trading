import { ENVConfig } from "../config/env.config";
import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const BINANCE = "binance";
export const BITGET = "bitget";

export const REDIS_CONNECTION_OPTIONS = {
	port: parseInt(ENVConfig.REDIS_PORT),
	host: ENVConfig.REDIS_HOST,
	username: "default",
	password: ENVConfig.REDIS_PASSWORD,
	retryStrategy: () => {
		console.timeLog("reconnectStrategy", "reconnectStrategy");
		return 500;
	},
};
