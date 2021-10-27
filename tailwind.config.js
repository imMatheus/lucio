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
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
