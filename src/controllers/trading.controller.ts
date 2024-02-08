import { Request, Response } from "express";

import { autoTradingLoadBalancer } from "../queue";

export const handleAutoTrading = async (req: Request, res: Response) => {
	const bodyData = req.body;


	const tradingData = JSON.parse(Object.keys(bodyData)[0]);

	console.log(`Trade signal received: ${tradingData}`);
	if (!tradingData) {
		return res.status(200).json({
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

	console.debug("🚀 ~ handleAutoTrading ~ jobData:", jobData);

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
