/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // Uber strict two-color system
                primary: {
                    DEFAULT: '#000000',  // INK BLACK — the ONLY brand color
                    elevated: '#282828',  // hover state on dark pills
                    pressed: '#e2e2e2',   // pressed state on white pills
                },
                canvas: {
                    DEFAULT: '#ffffff',
                    soft: '#efefef',      // gray pills, form inputs, chip bg
                    softer: '#f3f3f3',    // nested input fill
                },
                ink: {
                    DEFAULT: '#000000',
                    body: '#5e5e5e',      // secondary text
                    mute: '#4b4b4b',      // muted links, footer
                    light: '#afafaf',     // placeholders, fine print
                },
                'on-dark': {
                    DEFAULT: '#ffffff',
                    muted: '#afafaf',
                },
                link: {
                    DEFAULT: '#0000ee',   // browser-blue legal links
                },
                // Interactive blue — links, focus rings, selection
                interactive: {
                    DEFAULT: '#276EF1',
                    light: '#EEF3FE',
                    dark: '#1E54C1',
                },
            },
            fontFamily: {
                display: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
                text: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
                mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                // Uber display typography scale (weight 700, sentence-case)
                'display-xxl': ['52px', { lineHeight: '64px', fontWeight: '700' }],
                'display-xl':  ['36px', { lineHeight: '44px', fontWeight: '700' }],
                'display-lg':  ['32px', { lineHeight: '40px', fontWeight: '700' }],
                'display-md':  ['24px', { lineHeight: '32px', fontWeight: '700' }],
                'display-sm':  ['20px', { lineHeight: '28px', fontWeight: '700' }],
                // Body typography (weight 400/500)
                'body-lg':     ['18px', { lineHeight: '24px', fontWeight: '500' }],
                'body-md':     ['16px', { lineHeight: '24px', fontWeight: '400' }],
                'body-md-strong': ['16px', { lineHeight: '20px', fontWeight: '500' }],
                'body-sm':     ['14px', { lineHeight: '20px', fontWeight: '400' }],
                'body-sm-strong': ['14px', { lineHeight: '16px', fontWeight: '500' }],
                'caption':     ['12px', { lineHeight: '20px', fontWeight: '400' }],
                'button-lg':   ['18px', { lineHeight: '24px', fontWeight: '500' }],
                'button-md':   ['16px', { lineHeight: '20px', fontWeight: '500' }],
            },
            borderRadius: {
                'xs': '4px',
                'sm': '6px',
                'md': '8px',      // buttons, inputs, category tabs
                'lg': '12px',     // content cards
                'xl': '16px',     // hero mockup card only
                'pill': '9999px', // nav-pill-group, badge pills only
                'full': '50%',    // avatars, icon buttons only
            },
            boxShadow: {
                'card': '0px 4px 16px 0px rgba(0, 0, 0, 0.12)',
                'card-lg': '0px 4px 16px 0px rgba(0, 0, 0, 0.16)',
                'pill-float': '0px 2px 8px 0px rgba(0, 0, 0, 0.16)',
            },
            spacing: {
                '4.5': '18px',
            },
            transitionDuration: {
                '250': '250ms',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
