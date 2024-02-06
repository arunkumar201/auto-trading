const { setUpBitgetWorker } = require("./workers/placeOrder");

setUpBitgetWorker()
	.then((res) => {
		console.log("Bitget Worker is started");
	})
	.catch((error) => {
		console.error("Error While Starting Bitget Worker", error);
	});
