import * as process from "process";

import dotenv from "dotenv";

dotenv.config();

class Config {
	public SECRET: string | undefined;
	public REDIS_HOST: string | undefined;
	public REDIS_PORT: string | undefined;
	public REDIS_PASSWORD: string | undefined;
	public REDIS_USERNAME: string | undefined;
	public ADMIN_EMAIL: string | undefined;
	public PORT: string | undefined;
	public REDIS_URL: string | undefined;
	private readonly DEFAULT_DATABASE_URI = "mongodb://127.0.0.1:27017";

	constructor() {
		this.PORT = process.env.PORT || "5000";
		this.REDIS_HOST = process.env.REDIS_HOST || "redis://localhost";
		this.REDIS_PORT = process.env.REDIS_PORT || "6379";
		this.REDIS_PASSWORD = process.env.REDIS_PASSWORD;
		this.REDIS_USERNAME = process.env.REDIS_USERNAME;
		this.SECRET = process.env.SECRET;
		this.REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
	}

	public validateConfig(): void {
		for (const [key, value] of Object.entries(this)) {
			if (value === undefined) {
				throw new Error(`Configuration ${key} is undefined.`);
			}
		}
	}
}

export const ENVConfig: Config = new Config();
