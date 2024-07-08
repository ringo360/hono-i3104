import consola from 'consola';
import color from 'picocolors';
import { setTimeout } from 'timers/promises';

/**
 * @type {(() => (void | Promise<void>))[]}
 */
const closeListeners: any = [];

consola.success('Loaded Scheduler');

/**
 * Kill
 */
export async function shutdown() {
	consola.start(color.italic('Shutting down...'));
	try {
		await Promise.race([
			Promise.all(closeListeners.map((closeListener: any) => closeListener())),
			setTimeout(5000),
		]);
	} catch (e) {
		console.error(e);
	}
	consola.success(color.italic('Goodbye!'));
	process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

/**
 * Shutdown event
 * @param {() => (void | Promise<void>)} task
 */
export function onShutdown(task: any) {
	consola.log(task);
	closeListeners.push(task);
}
