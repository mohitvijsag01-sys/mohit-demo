/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#879B83',
          50: '#F4F6F3',
          100: '#E6EBE5',
          200: '#CFDACD',
          300: '#B5C5B3',
          400: '#9CB29A',
          500: '#879B83',
          600: '#6C8068',
          700: '#536450',
          800: '#3D4A3B',
          900: '#2A3328',
        },
        forest: {
          DEFAULT: '#263C32',
          light: '#354F42',
          dark: '#1A2922',
          deep: '#121D18',
        },
        walnut: {
          DEFAULT: '#49352B',
          rich: '#654A3A',
          dark: '#35251E',
          light: '#7F5E4B',
        },
        amberGlow: {
          DEFAULT: '#D49A45',
          hover: '#C28935',
          light: '#F4E3C7',
          dark: '#9F6F26',
        },
        ivory: {
          DEFAULT: '#F5F1E8',
          soft: '#FAF8F3',
          dark: '#EDE5D5',
        },
        beige: {
          DEFAULT: '#E8E0D2',
          light: '#F1ECE2',
          dark: '#D5C9B4',
        },
        charcoal: {
          DEFAULT: '#20231F',
          soft: '#2D312C',
          muted: '#52574F',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        sans: ['"Inter"', '"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(32, 35, 31, 0.12)',
        'luxury-lg': '0 30px 60px -20px rgba(18, 29, 24, 0.22)',
        'amber-glow': '0 10px 25px -5px rgba(212, 154, 69, 0.35)',
      },
    },
  },
  plugins: [],
}

