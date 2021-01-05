import * as Path from 'path';
import { processConfigEntry } from '../../src';


describe('base', async function () {


	it('base-simple', async function () {
		const outDir = 'test/data/base/.out/';

		await processConfigEntry({
			input: 'test/data/base/*.hbs',
			output: Path.join(outDir, 'templates.js')
		});

	});


});