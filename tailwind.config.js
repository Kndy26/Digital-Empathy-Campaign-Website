/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#faf9f5',
        primary: {
          DEFAULT: '#cc785c',
          active: '#a9583e',
          disabled: '#e6dfd8',
        },
        accent: {
          teal: '#5db8a6',
          amber: '#e8a55a',
        },
        surface: {
          soft: '#f5f0e8',
          card: '#efe9de',
          'cream-strong': '#e8e0d2',
          dark: '#181715',
          'dark-elevated': '#252320',
          'dark-soft': '#1f1e1b',
        },
        hairline: {
          DEFAULT: '#e6dfd8',
          soft: '#ebe6df',
        },
        ink: '#141413',
        body: {
          strong: '#252523',
          DEFAULT: '#3d3d3a',
        },
        muted: {
          DEFAULT: '#6c6a64',
          soft: '#8e8b82',
        },
        on: {
          primary: '#ffffff',
          dark: '#faf9f5',
          'dark-soft': '#a09d96',
        },
        success: '#5db872',
        warning: '#d4a017',
        error: '#c64545',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'EB Garamond', 'Times New Roman', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        pill: '9999px',
      },
      spacing: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        section: '96px',
      },
    },
  },
  plugins: [],
}
