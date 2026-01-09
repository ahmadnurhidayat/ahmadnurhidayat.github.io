/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // New color palette from ColorHunt
                // #061E29 - Dark navy (background)
                // #1D546D - Teal blue (primary/accent)
                // #5F9598 - Sage teal (secondary)
                // #F3F4F4 - Off-white (light background)
                primary: {
                    50: '#e8f4f8',
                    100: '#d1e9f1',
                    200: '#a3d3e3',
                    300: '#75bdd5',
                    400: '#47a7c7',
                    500: '#5F9598',
                    600: '#1D546D',
                    700: '#174357',
                    800: '#113241',
                    900: '#061E29',
                },
                // Dark mode shades based on palette
                dark: {
                    50: '#061E29',
                    100: '#0a2a38',
                    200: '#0f3647',
                    300: '#1D546D',
                    400: '#5F9598',
                    500: '#8cb3b5',
                    600: '#b9d1d2',
                    700: '#d6e4e5',
                    800: '#e9f0f0',
                    900: '#F3F4F4',
                },
                // Semantic colors
                background: '#061E29',
                'background-light': '#F3F4F4',
                surface: '#0a2a38',
                'surface-light': '#ffffff',
                border: '#1D546D',
                'border-light': '#d6e4e5',
                accent: '#5F9598',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
