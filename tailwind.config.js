module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: '#202225',
                secondary: '#5865f2',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
