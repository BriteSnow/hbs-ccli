import { glob, mkdirs, readFile, saferRemove, writeFile } from 'fs-extra-plus';
import * as Path from 'path';
import { hbsPecompile } from './hbs';


export interface ProcessConfig {
	input: string | string[];
	output: string;
}


export async function processConfigEntry(config: ProcessConfig) {
	const { output } = config;
	const inputFiles = await resolveGlobs(config.input);
	await tmplFiles(inputFiles, output);
}


export async function tmplFiles(files: string[], distFile: string) {
	const outDir = Path.dirname(distFile);
	await mkdirs(outDir);

	await saferRemove([distFile]);

	const templateContent = [];

	for (let file of files) {
		const htmlTemplate = await readFile(file, "utf8");
		const template = await hbsPecompile(file, htmlTemplate);
		templateContent.push(template);
	}

	await writeFile(distFile, templateContent.join("\n"), "utf8");
}

async function resolveGlobs(globs: string | string[]) {
	if (typeof globs === 'string') {
		return glob(globs);
	} else {
		const lists: string[][] = [];
		for (const globStr of globs) {
			const list = await glob(globStr);
			lists.push(list);
		}
		return lists.flat();
	}

}