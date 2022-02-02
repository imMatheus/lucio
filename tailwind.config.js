module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'media', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				success: '#2da44e',
				error: '#cf222e',
				olive: '#00af9b',
				mustard: '#ffb800',
				ketchup: '#ff2d55',
				oliveDark: '#00b8a3',
				mustardDark: '#ffc01e',
				ketchupDark: '#ff375f',

				// theme: 'var(--theme)',
				// themeDimmed: 'var(--theme-dimmed)',
				// themeDark: 'var(--theme-dark)',
				// themeLight: 'var(--theme-light)',
				// ##E6EEFF,
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
				// 'theme-600': '#1F5DE8',
				// 'theme-700': '#1C53D1',
				// 'theme-800': '#194AB9',
				// 'theme-900': '#1641A2',
				// 'theme-1000': '#143B93'

				// bg: 'var(--bg)',
				// bgDimmed: 'var(--bg-dimmed)',
				// bgDarken: 'var(--bg-darken)',
				// text: 'var(--text)',
				// textDimmed: 'var(--text-dimmed)',
				// textLight: 'var(--text-light)'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
