module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontSize: {
				'10xl': ['9.5rem', '1'],
				'11xl': ['11rem', '1'],
				'12xl': ['13rem', '1'],
				'13xl': ['15rem', '1']
			},
			fontFamily: {
				inter: ["'Inter'", 'sans-serif']
			},
			colors: {
				'clr-accent': 'rgb(var(--accent-color) / <alpha-value>)',
				'clr-carolina': '#1D9BF0',
				'clr-olive': '#00ba7c',
				'clr-success': '#00ba7c',
				'clr-candy-pink': '#f91880',
				'clr-danger': 'rgb(244, 33, 46)',
				'clr-bg': 'rgb(var(--bg) / <alpha-value>)',
				'clr-bg-grayed': 'rgb(var(--bg-grayed) / <alpha-value>)',
				'clr-bg-grayed-dark': 'rgb(var(--bg-grayed-dark) / <alpha-value>)',
				'clr-text': 'rgb(var(--text) / <alpha-value>)',
				'clr-text-grayed': 'rgb(var(--text-grayed) / <alpha-value>)',
				'clr-border': 'rgb(var(--border) / <alpha-value>)'
			}
		}
	},
	plugins: []
}
