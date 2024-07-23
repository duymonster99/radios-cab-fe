/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx}', './src/**/**/*.{js,jsx}', './src/**/**/**/*.{js,jsx}'],
    theme: {
        screens: {
            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 1024px) { ... }

            lg: '992px',
            xl: '1200px',
            // => @media (min-width: 1280px) { ... }
        },
    },
    plugins: [],
};
