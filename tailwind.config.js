/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#10281f',
        moss: '#285848',
        cream: '#f8f3e8',
        coral: '#e9654f',
        gold: '#e2a83b',
        ink: '#17332a',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(16,40,31,.12)',
        card: '0 8px 0 rgba(16,40,31,.08)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pop: { '0%': { transform: 'scale(.94)', opacity: '.3' }, '100%': { transform: 'scale(1)', opacity: '1' } },
      },
      animation: { float: 'float 4s ease-in-out infinite', pop: 'pop .25s ease-out' },
    },
  },
  plugins: [],
}
