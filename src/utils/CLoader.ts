import { parse } from 'jsonc-parser';
import { promises as fs } from 'fs';
import consola from 'consola';

interface CT {
	web: {
		port: number;
	};
}

export let config: CT;

export async function Loader() {
	try {
		const buf = await fs.readFile('./config.jsonc');
		config = parse(buf.toString());
		consola.success('Loaded config file');
		return true;
	} catch (e) {
		consola.fail('Failed to load config file');
		consola.error(e);
		return new Error('Failed to load');
	}
}
