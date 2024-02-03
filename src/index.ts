import express, { Request, Response } from "express";

import { AutoTradingRoute } from "./routes/trading.route";
import { PORT } from "./constants/index";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

//middlewares
app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

//Post route for Auto Trading
app.use("/stock",AutoTradingRoute);

//getting server status
app.get("/server-status", (req: Request, res: Response) => {
	res.status(200).json({
		message: "Server is up running!-POST ",
	});
});

app.post("/server-status", (req: Request, res: Response) => {
	res.status(200).json({
		message: "Server is up running!-POST ",
	});
});

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
