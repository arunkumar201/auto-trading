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
		symbol: tradingData?.symbol,
		quantity: tradingData?.quantity,
		side: tradingData?.side,
		price: tradingData?.price,
	};
	try {
		await autoTradingLoadBalancer.distributeJob(JSON.stringify(jobData));

		res.status(200).json({
			message: "Auto Trading",
			result:
				"Order has been Place successfully and Currently Processing by Broker",
		});
	} catch (error: unknown) {
		console.error("Error:", error);
		return res.status(400).json({
			message: "Something went wrong",
		});
	}
};
