module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	extends: ['plugin:vue/recommended'],
	// extends: ["plugin:vue/essential"],

	// required to lint *.vue files
	// plugins: ["vue", "prettier"],
	plugins: ['vue'],

	// add your custom rules here
	rules: {
		'vue/singleline-html-element-content-newline': 'off',
		'vue/attributes-order': 'off',
		'vue/no-use-v-if-with-v-for': 'off',
		'vue/v-bind-style': 'off',
		'vue/html-indent': 'off',
		'vue/no-v-html': 'off',
		'vue/mustache-interpolation-spacing': 'off',
		'vue/max-attributes-per-line': 'off',
		'vue/html-closing-bracket-spacing': 'off',
		'vue/html-quotes': 'off',
		'vue/attribute-hyphenation': 'off',
		'vue/html-closing-bracket-newline': 'off',
		'vue/html-self-closing': 'off',
		'vue/component-name-in-template-casing': [
			'warn',
			'PascalCase',
			{
				ignores: ['nuxt', 'nuxt-link', 'nuxt-child', 'transition'],
			},
		],
		'comma-spacing': ['warn', { before: false, after: true }],
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	},
}
