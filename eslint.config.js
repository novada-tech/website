import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
	js.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...globals.es2021,
			},
		},
		plugins: {
			'@typescript-eslint': typescript,
			react: react,
			'react-hooks': reactHooks,
		},
		rules: {
			...typescript.configs.recommended.rules,
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'no-undef': 'off', // TypeScript handles this
			'@typescript-eslint/no-empty-object-type': 'off',
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'react/no-unescaped-entities': 'off',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		files: ['**/*.test.{ts,tsx}', '**/test/**/*.{ts,tsx}'],
		languageOptions: {
			globals: {
				...globals.node,
				vi: 'readonly',
			},
		},
	},
	{
		ignores: ['dist/**', 'node_modules/**', '*.config.js', '*.config.ts'],
	},
];
