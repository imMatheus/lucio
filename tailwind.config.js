module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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

				brown: {
					50: '#fdf8f6',
					100: '#f2e8e5',
					200: '#eaddd7',
					300: '#e0cec7',
					400: '#d2bab0',
					500: '#bfa094',
					600: '#a18072',
					700: '#977669',
					800: '#846358',
					900: '#43302b'
				},

				// indigo
				// theme: '#8236ec',
				// 'theme-50': '#f6f1fe',
				// 'theme-100': '#f0e8fd',
				// 'theme-200': '#d9c2f9',
				// 'theme-300': '#bc94f5',
				// 'theme-400': '#9f65f1',
				// 'theme-500': '#8236ec',
				// 'theme-600': '#741fea',
				// 'theme-700': '#6714db',
				// 'theme-800': '#5110ad',
				// 'theme-900': '#3b0c7e',
				// 'theme-1000': '#25074f'

				//yellow
				// theme: '#FFBE0B',
				// 'theme-50': '#FFE9AD',
				// 'theme-100': '#FFE499',
				// 'theme-200': '#FFD970',
				// 'theme-300': '#FFC933',
				// 'theme-400': '#FFC933',
				// 'theme-500': '#FFBE0B',
				// 'theme-600': '#E0A500',
				// 'theme-700': '#B88700',
				// 'theme-800': '#8F6900',
				// 'theme-900': '#664B00',
				// 'theme-1000': '#3D2D00'

				// blue
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
				'theme-1000': '#0B1940',

				secondary: {
					50: '#FCEEF0',
					100: '#F8DDE0',
					200: '#F1BBC1',
					300: '#EA9AA2',
					400: '#E27883',
					500: '#DB5461',
					600: '#D84654',
					700: '#CA2B3B',
					800: '#A82431',
					900: '#871D27'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
