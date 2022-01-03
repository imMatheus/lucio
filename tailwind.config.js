module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './styles/**/*.{css,scss,sass}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: '#388659',
				secondary: '#eff2c0',
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
				themeDimmed: '#005ce6',
				themeDark: '#0049b6',
				themeLight: '#0b61e2b7',
				themeWhite: '#83b5ffde',
				bg: 'var(--bg)',
				bgDimmed: 'var(--bg-dimmed)',
				bgDarken: 'var(--bg-darken)',
				text: 'var(--text)',
				textDimmed: 'var(--text-dimmed)',
				textLight: 'var(--text-light)'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography')]
}
