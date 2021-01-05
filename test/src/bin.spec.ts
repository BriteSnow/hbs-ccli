import execa from 'execa';

// execa base options
const { stdout, stderr } = process;
const execaOpts = Object.freeze({ stdout, stderr });


// TS_NODE_FILES=true ./node_modules/.bin/ts-node --project scripts/tsconfig.json 

describe('bin', async function () {


	it('bin-simple', async function () {
		const confFile = 'test/data/bin/simple/hbs.config.js';

		// ./node_modules/.bin/ts-node src/bin-hbs.ts -c test/data/bin/simple/hbs.config.js -w
		await execa('./node_modules/.bin/ts-node', ['src/bin-hbs.ts', '-c', confFile], {
			...execaOpts,
			env: {
				TS_NODE_FILES: 'true'
			}
		});

	});


});