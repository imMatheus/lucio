module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			fontSize: {
				'10xl': ['9.5rem', '1'],
				'11xl': ['11rem', '1'],
				'12xl': ['13rem', '1'],
				'13xl': ['15rem', '1']
			},
			fontFamily: {
				inter: ["'Inter'", 'sans-serif'],
				grotesk: ["'Space Grotesk'", 'sans-serif']
			},

			colors: {
				success: '#2da44e',
				error: '#cf222e',
				olive: '#00af9b',
				oliveDark: '#00b8a3',
				mustard: '#ffb800',
				mustardDark: '#ffc01e',
				ketchup: '#ff2d55',
				ketchupDark: '#ff375f',

				blurple: '#5865f2',
				apple: '#57f287',
				bee: '#fee75c',
				fuchsia: '#eb459e',
				carnelian: '#ed4245',

				'clr-bg': 'var(--clr-bg)',
				'clr-bg-grayed': 'var(--clr-bg-grayed)',
				'clr-bg-grayed-dark': 'var(--clr-bg-grayed-dark)',
				'clr-text': 'var(--clr-text)',
				'clr-text-grayed': 'var(--clr-text-grayed)',
				'clr-border': 'var(--clr-border)',

				// blue
				// 'clr-accent': 'var(--clr-accent)',
				'clr-accent': '#2266ff',
				'clr-accent-50': '#E6EEFF',
				'clr-accent-100': '#CEDDFF',
				'clr-accent-200': '#9DBBFF',
				'clr-accent-300': '#6C99FF',
				'clr-accent-400': '#3B77FF',
				'clr-accent-500': '#2266ff',
				'clr-accent-600': '#1D57D9',
				'clr-accent-700': '#1947B3',
				'clr-accent-800': '#14388D',
				'clr-accent-900': '#102866',
				'clr-accent-1000': '#0B1940'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
