import consola from 'consola';
import { Loader } from './utils/CLoader';
import './utils/Scheduler';

async function main() {
	try {
		await Loader();
		import('./websv');
	} catch (e) {
		consola.error(e);
	}
}
main();
