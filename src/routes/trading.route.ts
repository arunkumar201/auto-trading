import express from "express";
import { handleAutoTrading } from "../controllers/trading.controller";

const router = express.Router();

router.post("/auto-trading", handleAutoTrading);

export { router as AutoTradingRoute };
