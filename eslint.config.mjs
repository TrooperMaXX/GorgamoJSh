import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';

export default [
	// 1. Global settings and JavaScript/Node rules
	{
		files: ['**/*.{js,mjs,cjs}'],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'module',
			globals: {
				...globals.node,
				...globals.es2021,
			},
		},
		// This replicates "extends": "eslint:recommended"
		rules: {
			...js.configs.recommended.rules,

			// Your custom rules migrated from .eslintrc.json:
			'arrow-spacing': ['warn', { 'before': true, 'after': true }],
			'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
			'comma-dangle': ['error', 'always-multiline'],
			'comma-spacing': 'error',
			'comma-style': 'error',
			'curly': ['error', 'multi-line', 'consistent'],
			'dot-location': ['error', 'property'],
			'handle-callback-err': 'off',
			'indent': ['error', 'tab'],
			'keyword-spacing': 'error',
			'max-nested-callbacks': ['error', { 'max': 4 }],
			'max-statements-per-line': ['error', { 'max': 2 }],
			'no-console': 'off',
			'no-empty-function': 'error',
			'no-floating-decimal': 'error',
			'no-inline-comments': 'error',
			'no-lonely-if': 'error',
			'no-multi-spaces': 'error',
			'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1, 'maxBOF': 0 }],
			'no-shadow': ['error', { 'allow': ['err', 'resolve', 'reject'] }],
			'no-trailing-spaces': ['error'],
			'no-var': 'error',
			'object-curly-spacing': ['error', 'always'],
			'prefer-const': 'error',
			'quotes': ['error', 'single'],
			'semi': ['error', 'always'],
			'space-before-blocks': 'error',
			'space-before-function-paren': ['error', {
				'anonymous': 'never',
				'named': 'never',
				'asyncArrow': 'always',
			}],
			'space-in-parens': 'error',
			'space-infix-ops': 'error',
			'space-unary-ops': 'error',
			'spaced-comment': 'error',
			'yoda': 'error',
		},
	},

	// 2. Specific override for standard .js files to treat them as CommonJS if needed
	{
		files: ['**/*.js'],
		languageOptions: { sourceType: 'commonjs' },
	},

	// 3. Non-JS File Linters (JSON, Markdown, CSS)
	{ files: ['**/*.json'], plugins: { json }, language: 'json/json', rules: json.configs.recommended.rules },
	{ files: ['**/*.jsonc'], plugins: { json }, language: 'json/jsonc', rules: json.configs.recommended.rules },
	{ files: ['**/*.json5'], plugins: { json }, language: 'json/json5', rules: json.configs.recommended.rules },
	{ files: ['**/*.md'], plugins: { markdown }, language: 'markdown/commonmark', rules: markdown.configs.recommended.rules },
	{ files: ['**/*.css'], plugins: { css }, language: 'css/css', rules: css.configs.recommended.rules },
];