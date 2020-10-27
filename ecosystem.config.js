module.exports = {
	apps: [
		{
			name: 'CalApp',
			exec_mode: 'cluster',
			instances: '1', // Or a number of instances
			script: './node_modules/nuxt/bin/nuxt.js',
			env: {
				HOST: '0.0.0.0',
				PORT: '80',
			},
			args: 'start',
		},
	],
}
