module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: '#388659',
				secondary: '#eff2c0',
				success: '#2da44e',
				error: '#cf222e',
				test: 'var(--bg-test)',
				bg900: 'var(--bg-900)',
				bg800: 'var(--bg-800)',
				bg700: 'var(--bg-700)',
				bg600: 'var(--bg-600)',
				bg500: 'var(--bg-300)',
				bg400: 'var(--bg-400)',
				text100: 'var(--text-100)',
				text200: 'var(--text-200)',
				text300: 'var(--text-300)',
				text400: 'var(--text-400)',
				text500: 'var(--text-500)',
				text500: 'var(--text-600)'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
}
