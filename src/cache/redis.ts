import Redis, { RedisOptions } from "ioredis";

import { ENVConfig as config } from "../config/env.config";

const redisOptions: RedisOptions = {
	host: config.REDIS_HOST,
	port: Number(config.REDIS_PORT),
	password: config.REDIS_PASSWORD,
	username: config.REDIS_USERNAME,
	// Enable auto pipelining
	enableAutoPipelining: true,
	// Retry strategy: backoff
	retryStrategy: (times) => Math.min(times * 50, 2000),
	// Connect timeout
	connectTimeout: 5000,
	// Max retries per request
	maxRetriesPerRequest: 3,
	// Show friendly error stack
	showFriendlyErrorStack: true,
	// Lazy connect
	lazyConnect: true,
	enableOfflineQueue: true,
};

class RedisClient {
	private static instance: RedisClient;
	private redis: Redis;

	/**
	 * Constructor for creating a new instance of the class.
	 *
	 * @param {RedisOptions} options - options for the Redis connection
	 */
	private constructor(options: RedisOptions) {
		this.redis = new Redis(options);
	}

	/**
	 * Returns the singleton instance of the RedisClient, creating it if it does not exist.
	 *
	 * @param {RedisOptions} options - the options for creating the RedisClient instance
	 * @return {RedisClient} the singleton instance of the RedisClient
	 */
	public static getInstance(options: RedisOptions): RedisClient {
		if (!this.instance) {
			this.instance = new RedisClient(options);
		}
		return this.instance;
	}

	/**
	 * Get the client.
	 *
	 * @return {Redis} The Redis client
	 */
	public getClient(): Redis {
		return this.redis;
	}

	public async disconnect(): Promise<void> {
		await this.redis.quit();
	}
	public async connect() {
		await this.redis.connect();
	}
}

export const redisInstance = RedisClient.getInstance(redisOptions);
