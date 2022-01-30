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
				theme: '#2266ff',
				'theme-50': '#86ACFF',
				'theme-100': '#729EFF',
				'theme-200': '#5E90FF',
				'theme-300': '#4A82FF',
				'theme-400': '#3674FF',
				'theme-500': '#2266ff',
				'theme-600': '#1F5DE8',
				'theme-700': '#1C53D1',
				'theme-800': '#194AB9',
				'theme-900': '#1641A2',
				'theme-1000': '#143B93'

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
