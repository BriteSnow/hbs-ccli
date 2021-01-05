import * as handlebars from 'handlebars';
import * as htmlparser from 'htmlparser2';
import * as path from 'path';

type Part = { name: string, content: string }
// --------- hbs plugin --------- //
// To use in a promise style (pure JS, async/await)
export function hbsPecompile(filePath: string, content: string) {
	return new Promise(function (resolve, fail) {
		let parts = parseParts(filePath, content);

		// for each part, precompile and build the varLine
		let part;
		var resultContent = "";
		for (var i = 0; i < parts.length; i++) {
			part = parts[i];
			let precompiledFunc = handlebars.precompile(part.content);
			var varLine = buildVarLine(part.name, precompiledFunc);
			resultContent += varLine;
		}

		resolve(resultContent);
	});
}


// --------- /hbs plugin --------- //


function buildVarLine(name: string, precompiledFunc: TemplateSpecification) {
	var varLine = "Handlebars.templates['" + name + "']  = Handlebars.template(";
	varLine += precompiledFunc;
	varLine += ");\n\n";
	return varLine;
}

// parse a file content and return a [{name,content}] array of parts
//  - Single element if no <script tag with the name of the file
//  - Multiple elements, one per <script tag with the id as name.
function parseParts(filepath: string, content: string): Part[] {
	var name = path.basename(filepath, path.extname(filepath));

	// if the content does contain a <script tag, then, just return the content
	// TODO: probably need to widen the match
	if (content.indexOf("<script") == -1) {
		return [{ name: name, content: content }];
	}

	const parts: Part[] = [];
	let currentPart: Part | null = null;

	var parser = new htmlparser.Parser({
		onopentag: function (tagname: string, attribs: any) {
			if (tagname === "script") {
				currentPart = { name: attribs.id, content: "" };
			}
		},

		ontext: function (text: string) {
			if (currentPart) {
				currentPart.content += text;
			}
		},

		onclosetag: function (tagname: string) {
			if (tagname === "script" && currentPart) {
				currentPart.content = currentPart.content.trim();
				parts.push(currentPart);
				currentPart = null;
			}
		}
	}, { decodeEntities: true });

	parser.write(content);

	return parts;
}
