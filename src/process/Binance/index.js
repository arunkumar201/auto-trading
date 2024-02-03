const { setUpBinanceWorker } =require("./workers/placeOrder");

setUpBinanceWorker()
	.then((res) => {
		console.log("Binance Worker is started");
	})
	.catch((error) => {
		console.error("Error While Starting Binance Worker", error);
	});
