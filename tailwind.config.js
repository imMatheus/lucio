module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'media', // or 'media' or 'class'
	theme: {
		extend: {
			fontSize: {
				'10xl': ['9.5rem', '1'],
				'11xl': ['11rem', '1'],
				'12xl': ['13rem', '1'],
				'13xl': ['15rem', '1']
			},
			colors: {
				success: '#2da44e',
				error: '#cf222e',
				olive: '#00af9b',
				mustard: '#ffb800',
				ketchup: '#ff2d55',
				oliveDark: '#00b8a3',
				mustardDark: '#ffc01e',
				ketchupDark: '#ff375f',

				theme: '#2266ff',
				'theme-50': '#E6EEFF',
				'theme-100': '#CEDDFF',
				'theme-200': '#9DBBFF',
				'theme-300': '#6C99FF',
				'theme-400': '#3B77FF',
				'theme-500': '#2266ff',
				'theme-600': '#1D57D9',
				'theme-700': '#1947B3',
				'theme-800': '#14388D',
				'theme-900': '#102866',
				'theme-1000': '#0B1940'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
