/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a1628',
          50: '#e8ecf4',
          100: '#c5cfe4',
          200: '#9aaece',
          300: '#6e8db8',
          400: '#4d74a8',
          500: '#2c5b98',
          600: '#1e4a87',
          700: '#153972',
          800: '#0d285e',
          900: '#0a1628',
        },
        gold: {
          DEFAULT: '#c9a84c',
          50: '#fdf8ec',
          100: '#f9edc9',
          200: '#f2d98c',
          300: '#ebc44f',
          400: '#e4ae28',
          500: '#c9a84c',
          600: '#b8921a',
          700: '#9a7813',
          800: '#7c5f10',
          900: '#644c0d',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0a1628 0%, #1a3060 50%, #0a1628 100%)',
      },
    },
  },
  plugins: [],
}
