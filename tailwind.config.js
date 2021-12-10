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

				theme: 'var(--theme)',
				themeDimmed: 'var(--theme-dimmed)',
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
	plugins: []
}
