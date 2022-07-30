// @ts-check

const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
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
})
