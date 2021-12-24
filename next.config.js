const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
	swcMinify: true,
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname
	},
	images: {
		domains: ['avatars.githubusercontent.com']
	}
}
