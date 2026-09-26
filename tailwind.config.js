/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#ffffff',
          soft: '#f6f7f9',
          dark: '#0b0d10',
          'dark-soft': '#111418',
        },
        ink: {
          DEFAULT: '#0f1419',
          soft: '#4b5563',
          muted: '#8892a0',
          dark: '#f4f5f7',
          'dark-soft': '#c3c9d1',
          'dark-muted': '#7d8590',
        },
        border: {
          DEFAULT: '#e7e9ed',
          dark: '#1e2228',
        },
        accent: {
          DEFAULT: '#4f46e5',
          hover: '#4338ca',
          soft: '#eef2ff',
          dark: '#818cf8',
          'dark-hover': '#a5b4fc',
          'dark-soft': 'rgba(129,140,248,0.12)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,20,25,0.04), 0 8px 24px -8px rgba(15,20,25,0.08)',
        'card-dark': '0 1px 2px rgba(0,0,0,0.3), 0 8px 24px -8px rgba(0,0,0,0.5)',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
