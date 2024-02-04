import { BINANCE, REDIS_CONNECTION_OPTIONS } from "./constants";

import { Queue } from "bullmq";

//Can be Add multiple broker API's
const brokerAPIs = [BINANCE];


class AutoTradingLoadBalancer {
	private queues: Record<string, Queue> = {};

	constructor() {
		for (const broker of brokerAPIs) {
			const queue = new Queue(`OrderQueue-${broker}`, {
				connection: REDIS_CONNECTION_OPTIONS,
			});

			this.queues[broker] = queue;
		}
	}

	/**
	 * Distributes a job to multiple brokers by adding the job to their respective queues.
	 *
	 * @param {any} jobData - the data of the job to be distributed
	 * @return {Promise<void>} a promise that resolves when the job has been successfully distributed
	 */
	public async distributeJob(jobData: any): Promise<void> {
		try {
			const addJobPromises = brokerAPIs.map(async (broker) => {
				await this.queues[broker].add("PlaceOrderJob", jobData);
			});

			await Promise.all(addJobPromises);
		} catch (error) {
			console.error("Error distributing job:", error);
		}
	}

	/**
	 * A function to select a queue dynamically.
	 *
	 * @return {Promise<Queue | null>} A promise that resolves with the selected queue or null if no queues are available.
	 */
	private async selectQueueDynamically(): Promise<Queue | null> {
		const availableQueues = await this.getAvailableQueues();

		if (availableQueues.length === 0) {
			return null;
		}
		return this.selectQueueBasedLeastJobs(availableQueues);
	}

	/**
	 * Retrieves available queues and filters out any null values.
	 *
	 * @return {Promise<Queue[]>} An array of available Queue objects
	 */
	private async getAvailableQueues(): Promise<Queue[]> {
		const queueNames = Object.keys(this.queues);
		const queues = await Promise.all(
			queueNames.map(async (queueName) => {
				const queue = this.queues[queueName];
				return queue;
			})
		);

		return queues.filter((queue) => queue !== null) as Queue[];
	}

	/**
	 * Selects a queue based on the least number of jobs.
	 *
	 * @param {Queue[]} queues - An array of queues to choose from.
	 * @return {Promise<Queue | null>} A promise that resolves to the selected queue or null if no queues are provided.
	 */
	private async selectQueueBasedLeastJobs(
		queues: Queue[]
	): Promise<Queue | null> {
		if (queues.length === 0) {
			return null;
		}

		const queueDetails = await Promise.all(
			queues.map(async (queue) => ({
				queue,
				waitingJobCount: await queue.getWaitingCount(),
			}))
		);

		// Sort the queues based on the number of waiting jobs
		queueDetails.sort((a, b) => a.waitingJobCount - b.waitingJobCount);

		// Find the smallest waiting job count
		const smallestWaitingJobCount = queueDetails[0].waitingJobCount;

		// Filter potential queues with the smallest waiting job count
		const potentialQueues = queueDetails.filter(
			(q) => q.waitingJobCount === smallestWaitingJobCount
		);

		// If there are multiple potential queues, choose randomly
		const selectedQueue =
			potentialQueues[Math.floor(Math.random() * potentialQueues.length)].queue;

		return selectedQueue;
	}
}

const autoTradingLoadBalancer = new AutoTradingLoadBalancer();
export { autoTradingLoadBalancer };
