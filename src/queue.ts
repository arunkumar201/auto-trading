import { BINANCE, REDIS_CONNECTION_OPTIONS } from "./constants";

import { ENVConfig } from "./config/env.config";
import { Queue } from "bullmq";

class AutoTradingLoadBalancer {
	private queues: Record<string, Queue> = {};

	constructor() {
		const brokerAPIs = [
			BINANCE,
			"Broker2",
			"Broker3",
			"Broker4",
			"Broker5",
			"Broker6",
		];

		for (const broker of brokerAPIs) {
			const queue = new Queue(`OrderQueue-${broker}`, {
				connection: REDIS_CONNECTION_OPTIONS,
			});

			this.queues[broker] = queue;
		}
	}

	public async distributeJob(jobData: any): Promise<void> {
		const selectedQueue = await this.selectQueueDynamically();

		console.debug(
			"🚀 ~ AutoTradingLoadBalancer ~ distributeJob ~ selectedQueue:",
			selectedQueue.name
		);

		if (selectedQueue) {
			await selectedQueue.add("PlaceOrderJob", jobData);
			console.log(`Job distributed with : ${jobData}`);
		} else {
			console.error("No available queues to distribute the job.");
		}
	}

	private async selectQueueDynamically(): Promise<Queue | null> {
		const availableQueues = await this.getAvailableQueues();

		if (availableQueues.length === 0) {
			return null;
		}
		return this.selectQueueBasedLeastJobs(availableQueues);
	}

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

		console.debug("🚀 ~ AutoTradingLoadBalancer ~ queueDetails:",queueDetails.map(x => {
			console.log(x.waitingJobCount,x.queue.name);
		}));


		// Find the smallest waiting job count
		const smallestWaitingJobCount = queueDetails[0].waitingJobCount;

		// Filter potential queues with the smallest waiting job count
		const potentialQueues = queueDetails.filter(
			(q) => q.waitingJobCount === smallestWaitingJobCount
		);

		// // If there are multiple potential queues, choose randomly
		console.debug("🚀 ~ AutoTradingLoadBalancer ~ Math.floor(Math.random() * potentialQueues.length):", Math.floor(Math.random() * potentialQueues.length));
		const selectedQueue =
			potentialQueues[Math.floor(Math.random() * potentialQueues.length)].queue;

		return selectedQueue;
	}


}

const autoTradingLoadBalancer = new AutoTradingLoadBalancer();
export { autoTradingLoadBalancer };
