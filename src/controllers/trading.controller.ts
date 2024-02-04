import { Request, Response } from "express";

import { autoTradingLoadBalancer } from "../queue";

export const handleAutoTrading = async (req: Request, res: Response) => {
	const tradingData = req.body;
	console.log(`Trade signal received: ${JSON.stringify(tradingData)}`);
	if (!tradingData) {
		res.status(200).json({
			message: "No trading data found",
			result: null,
		});
	}

	const jobData = {
		symbol: tradingData?.symbol,
		side: tradingData?.side,
		quantity: tradingData?.quantity,
		type: "MARKET",
	};
	try {
		await autoTradingLoadBalancer.distributeJob(JSON.stringify(jobData));

		res.status(200).json({
			message: "Auto Trading-running",
			result:
				"The order has been placed successfully and is currently being processed by the broker.",
		});
	} catch (error: unknown) {
		console.error("Error:", error);
		return res.status(400).json({
			message: "Something went wrong",
		});
	}
};
