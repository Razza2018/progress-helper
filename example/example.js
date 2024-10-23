/* Require progress-helper */
const progress = require('./progress-helper');

async function run() {
	const length = 100;

	/* Setup the total number of items */
	progress.setTotal(length);

	/* Your main progress loop */
	for (let i = 0; i < length; i++) {

		/* Set the loop number we are currently on */
		progress.setCurrent(i);

		/* Await your progress function, this is where the work will be done on
		 * each item */
		await countdown(50);
	}
}

/* Your progress function, in this case a simple timeout delay */
function countdown(time) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), time);
	});
}

run();
