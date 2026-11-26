/** @type {import('tailwindcss').Config} */
// Truqui Collection palette — bone, linen and sand, with warm ink text and a
// sun-bleached bronze accent. The old class names `navy` and `gold` are kept
// (used all over the site) but now point at ink and bronze, and Tailwind's
// cool grays are swapped for warm stone neutrals.
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bone: '#F6F2EB',
        linen: '#EFE8DD',
        sand: '#E5DACA',
        clay: '#B9876A',
        olive: '#6E6B4F',
        // "navy" = warm ink (text, dark buttons)
        navy: {
          DEFAULT: '#2A2621',
          50: '#F4F1EC',
          100: '#E6E0D7',
          200: '#CCC3B6',
          300: '#A99E8F',
          400: '#857A6C',
          500: '#665D51',
          600: '#4D463D',
          700: '#3A342E',
          800: '#2F2A25',
          900: '#2A2621',
        },
        // "gold" = bronze accent
        gold: {
          DEFAULT: '#8E6C48',
          50: '#F7F1E9',
          100: '#EEE2D2',
          200: '#DDC7AA',
          300: '#C9A983',
          400: '#B08D66',
          500: '#8E6C48',
          600: '#7A5C3C',
          700: '#634A30',
          800: '#4D3925',
          900: '#3A2B1C',
        },
        gray: {
          50: '#FAF7F2',
          100: '#F1ECE4',
          200: '#E4DDD2',
          300: '#CFC6B8',
          400: '#A89E8F',
          500: '#82786A',
          600: '#645B4F',
          700: '#4A433A',
          800: '#332E28',
          900: '#221F1B',
        },
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '1px',
        DEFAULT: '2px',
        md: '3px',
        lg: '3px',
        xl: '4px',
        '2xl': '4px',
        '3xl': '6px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(42, 38, 33, 0.04)',
        DEFAULT: '0 2px 8px -2px rgba(42, 38, 33, 0.08)',
        md: '0 6px 18px -8px rgba(42, 38, 33, 0.14)',
        lg: '0 14px 34px -14px rgba(42, 38, 33, 0.20)',
        xl: '0 22px 50px -20px rgba(42, 38, 33, 0.28)',
      },
      letterSpacing: {
        label: '0.22em',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #2A2621 0%, #3A342E 100%)',
      },
    },
  },
  plugins: [],
}
