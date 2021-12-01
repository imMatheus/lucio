const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},
	images: {
		domains: ['avatars.githubusercontent.com']
	}
}
