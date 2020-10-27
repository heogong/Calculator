// import path from 'path'
// import fs from 'fs'

export default {
	// server: {
	// 	https: {
	// 		key: fs.readFileSync(path.resolve(__dirname, 'ssl/private.key')),
	// 		cert: fs.readFileSync(path.resolve(__dirname, 'ssl/certificate.crt')),
	// 	},
	// },
	/*
	 ** Nuxt rendering mode
	 ** See https://nuxtjs.org/api/configuration-mode
	 */
	mode: 'universal',
	/*
	 ** Nuxt target
	 ** See https://nuxtjs.org/api/configuration-target
	 */
	target: 'server',
	/*
	 ** Headers of the page
	 ** See https://nuxtjs.org/api/configuration-head
	 */
	head: {
		title: '더치페이계산기 - N빵 각빵 계산기',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'N차 더치페이계산기',
				name: 'N차 더치페이계산기',
				content: 'N차까지 각자 금액을 산출할 수 있는 더치페이 계산기 입니다.',
			},
		],
		script: [
			{
				src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
				async: true,
			},
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon-16x16.png' }],
	},
	/*
	 ** Global CSS
	 */
	css: ['~/assets/styles/main.css'],
	/*
	 ** Plugins to load before mounting the App
	 ** https://nuxtjs.org/guide/plugins
	 */
	plugins: [
		{ src: '~/plugins/common-mixins.js', mode: 'client' },
		'~plugins/ChartPlugin.js',
	],
	/*
	 ** Auto import components
	 ** See https://nuxtjs.org/api/configuration-components
	 */
	components: true,
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		'@nuxtjs/eslint-module',
	],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://buefy.github.io/#/documentation
		'nuxt-buefy',
		'@nuxtjs/redirect-module',
		[
			'@nuxtjs/google-adsense',
			{
				id: 'ca-pub-6427355931978753',
			},
		],
	],
	redirect: [{ from: '^/rate(.*)$', to: '/cmpRate' }],

	/*
	 ** Build configuration
	 ** See https://nuxtjs.org/api/configuration-build/
	 */
	build: {
		html: {
			minify: {
				collapseWhitespace: true, // as @dario30186 mentioned
				removeComments: true, // 👈 add this line
			},
		},
	},
}
