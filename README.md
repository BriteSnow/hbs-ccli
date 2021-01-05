## Intro

This is a config driven (i.e., `hbs.config.js`) Handlebars pre-compiler CLI (i.e., handlebars template to handlerbars functions)

Supports multiple temlate per file, with `<script id="var_name" type="text/handlebars">...</script>`, or single template per file is no script tags.

## Usage

- `node ./node_module/.bin/hbs`
- Default to `hbs.config.js`
- `-c` to specify custom config file. All input/output path will be relative to the targeted config file. 
- `-w` to specify watch mode. 

## Setup


```sh
# Install the hbs-ccli
npm install -D hbs-ccli
```

Create a **hbs.config.js**


```js
module.exports = {
	// required. Support single string, or array, will be processed in order
	input: './tmpl/**/*.hbs',

	// required. single css file supported for now. 
	output: './.out/templates.js',
}

// Note: module.exports can return an array of the object above, for multiple processing units.
```

Run

```sh
# will use hbs.config.js
node ./node_module/.bin/hbs

# will use path/to/hbs.config.js, relative input/output path will be relative to path/to/
node ./node_module/.bin/hbs -c path/to/hbs.config.js

# will do watch mode
node ./node_module/.bin/hbs -w -c path/to/hbs.config.js
```