/* options */

const mode = 'spa' // universal/spa
const serveFromSubFolder = false
const env = process.env.NODE_ENV || 'development'
/* options end */

const pkg = require('./package')
const path = require('path')

let dist = 'dist'

module.exports = {
	// mode: mode,
	ssr: false,
	/*
	 ** Headers of the page
	 */
	head: {
		htmlAttrs: {
			lang: 'ko',
		},
		title: pkg.title,
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content: pkg.description,
			},
		],
		script: [
			{ src: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/vendor/uikit.min.js' },
			{ src: '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' },
		],
		link: [
			{
				rel: 'icon',
				type: 'image/x-icon',
				href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/favicon.ico',
			},
			{
				rel: 'preload',
				href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/vendor/uikit.min.js',
				as: 'script',
			},
			{
				rel: 'preload',
				href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/roboto_base64.css',
				as: 'style',
			},
			{
				rel: 'preload',
				href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/sourceCodePro_base64.css',
				as: 'style',
			},
			{
				rel: 'preload',
				href:
					(process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) +
					'/fonts/mdi/css/materialdesignicons.css',
				as: 'style',
			},
			{
				rel: 'stylesheet',
				href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/roboto_base64.css',
			},
			{
				rel: 'stylesheet',
				href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/sourceCodePro_base64.css',
			},
			{
				rel: 'stylesheet',
				href:
					(process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) +
					'/fonts/mdi/css/materialdesignicons.css',
			},
		],
	},
	/*
	 ** Customize the progress-bar
	 */
	loading: {
		color: 'rgba(255,255,255, 0.5)',
	},
	/*
	 ** Customize the loading-indicator
	 ** only in spa mode
	 */
	loadingIndicator: {
		color: '#00838f',
		background: 'white',
	},
	/*
	 ** Global CSS
	 */
	css: ['uikit/dist/css/uikit.css'],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		{ src: '~/plugins/components.global.js' },
		{ src: '~/plugins/directives.client.js' },
		{ src: '~/plugins/filters.js' },
		{ src: '~/plugins/mixins.client.js' },
		{ src: '~/plugins/waves.client.js' },
		{ src: '~/plugins/retina.client.js' },
		{ src: '~/plugins/vueVisible.client.js' },
		{ src: '~plugins/moment.js' },
		{ src: '~/plugins/ag-grid.js', ssr: false },
		{ src: '~plugins/axios.js', ssr: true },
		{ src: '~plugins/naverStorage.js' },
	],
	router: {
		middleware: ['redirect'],
		base: process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '/' : '/' + dist,
	},
	modules: [
		'@nuxtjs/axios',
		[
			'nuxt-i18n',
			{
				defaultLocale: 'ko',
				locales: [
					{
						code: 'ko',
						file: 'ko-KR.js',
						name: 'Korean',
					},
				],
				lazy: true,
				langDir: 'lang/',
				strategy: 'no_prefix',
				vueI18n: {
					fallbackLocale: 'ko',
				},
				vuex: {
					syncLocale: true,
				},
			},
		],
		// '@nuxtjs/webpack-profile'
	],

	env: {
		NODE_ENV: process.env.NODE_ENV,
	},

	// },
	generate: {
		dir: dist,
	},
	/*
	 ** Build configuration
	 */
	build: {
		postcss: null,
		vendor: ['ag-grid-vue'],
		progress: true,
		extend(config, ctx) {
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push(
					// Run ESLint on save
					{
						enforce: 'pre',
						test: /\.(js|vue)$/,
						loader: 'eslint-loader',
						exclude: /(node_modules)/,
					},
				)
			}
			// aliases
			config.resolve.alias['scss'] = path.resolve(__dirname, './assets/scss')
			// adjust path when serving app from sub-folder
			if (!ctx.isDev && serveFromSubFolder) {
				config.output.publicPath = '/' + dist + '/_nuxt/'
			}
			return config
		},
	},
}
