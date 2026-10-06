/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784', // Soft Sage accent
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32', // Forest Green primary
          900: '#1B5E20',
          950: '#0F3813'
        },
        sage: {
          50: '#F4F9F4',
          100: '#E6F3E6',
          200: '#C8E6C9',
          300: '#A5D6A7',
          400: '#81C784', // Soft Sage
          500: '#66BB6A'
        },
        mint: {
          light: '#F9FBF9', // Mint light background
          50: '#F5FAF6',
          100: '#EBF5ED',
          200: '#D5ECD9',
          500: '#81C784'
        },
        slate: {
          dark: '#1B2E1E', // Dark Slate text
          card: '#FFFFFF'   // Clean White card surfaces
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 10px 25px -3px rgba(46, 125, 50, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'glow': '0 0 20px -3px rgba(129, 199, 132, 0.35)',
      }
    },
  },
  plugins: [],
}
