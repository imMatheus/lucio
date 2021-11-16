module.exports = {
    mode: 'jit',
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: '#388659',
                secondary: '#eff2c0',
                success: '#2da44e',
                error: '#cf222e',
                test: 'var(--bg-test)',
                bg900: '#010409',
                bg800: '#0d1117',
                bg700: '#161b22',
                bg600: '#21262d',
                bg500: '#6e768166',
                bg400: '#f0f6fc1a',
                text100: '#fff',
                text200: '#c9d1d9',
                text300: '#c6cbd1',
                text400: '#979a9c',
                text500: '#8b949e',
                text500: '#484f58',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
