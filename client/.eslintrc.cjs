/* eslint-env node */

module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'eslint-config-prettier',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: true,
		tsconfigRootDir: __dirname,
	},
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'@typescript-eslint/no-non-null-assertion': 'off',
		indent: ['error', 'tab'],
		"max-len": [
			"error",
			{
				"code": 80,
				"tabWidth": 4,
				"ignoreComments": true, //"comments": 80
				"ignoreUrls": true,
				"ignoreStrings": true,
				"ignoreTemplateLiterals": true
			}
		]
	},
}
