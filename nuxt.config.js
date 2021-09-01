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
	// mode: 'universal',
	mode: 'spa',
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
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'N차 더치페이계산기',
				name:
					'N차 더치페이계산기,n빵,n빵계산기,n빵 계산기,더치페이,더치페이 계산기',
				content: 'N차까지 각자 금액을 산출할 수 있는 더치페이 계산기 입니다.',
			},
			{
				name: 'naver-site-verification',
				content: 'c472b1dd3a03db222bdcfb288ba673a1df17f0f9',
			},
			{
				hid: 'og:title',
				property: 'og:title',
				content: '더치페이계산기 - N빵 각빵 계산기',
			},
			{
				hid: 'og:description',
				property: 'og:description',
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
	// css: ['@/assets/bulma/css/bulma.min.css'],
	/*
	 ** Plugins to load before mounting the App
	 ** https://nuxtjs.org/guide/plugins
	 */
	plugins: [{ src: '~/plugins/common-mixins.js', mode: 'client' }],
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
		['nuxt-buefy', { css: true }],
		'@nuxtjs/redirect-module',
		[
			'@nuxtjs/google-adsense',
			{
				id: 'ca-pub-6427355931978753',
			},
		],
		[
			'@nuxtjs/firebase',
			{
				config: {
					apiKey: 'AIzaSyCbTooDoKHB5y8dc9w9h9CUZFG6DY5u3N8',
					authDomain: 'calproject-6fe1c.firebaseapp.com',
					projectId: 'calproject-6fe1c',
					storageBucket: 'calproject-6fe1c.appspot.com',
					messagingSenderId: '136456100913',
					appId: '1:136456100913:web:c87ae6029d185b38288910',
					measurementId: 'G-HYV62BSE8S',
				},
				services: {
					auth: true, // Just as example. Can be any other service.
					firestore: true,
				},
			},
		],
		[
			'@nuxtjs/sitemap',
			{
				hostname: 'http://kakao.link',
				sitemaps: [
					{
						path: '/sitemap.xml',
						gzip: true,
					},
					{
						path: '/whatEat/sitemap.xml',
						gzip: true,
					},
				],
			},
		],

		[
			'@nuxtjs/robots',
			{
				UserAgent: '*',
				Disallow: '/',
				sitemap: 'http://kakao.link/sitemap.xml',
			},
		],
	],
	redirect: [{ from: '^/rate(.*)$', to: '/cmpRate' }],

	/*
	 ** Build configuration
	 ** See https://nuxtjs.org/api/configuration-build/
	 */
	build: {},
}
