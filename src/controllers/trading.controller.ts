import { Request, Response } from "express";

import { autoTradingLoadBalancer } from "../queue";

export const handleAutoTrading = async (req: Request, res: Response) => {
	const tradingData = req.body;
	if (!tradingData) {
		res.status(200).json({
			message: "No trading data found",
			result: null,
		});
	}
	const jobData = {
		symbol: "AAPL",
		quantity: 10,
	};
	try {
		await autoTradingLoadBalancer.distributeJob(JSON.stringify(jobData));
		res.status(200).json({
			message: "Auto Trading route",
			result: "results",
		});
	} catch (error: unknown) {
		console.error("Error:", error);
		res.status(400).json({
			message: "Something went wrong",
		});
	}
};
