/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        skyBloom: '#dff4ff',
        mist: '#f6fff5',
        leaf: '#2f855a',
        meadow: '#64c27b',
        pond: '#3aa6d0',
        dew: '#eefbf3'
      },
      boxShadow: {
        soft: '0 20px 60px rgba(59, 130, 246, 0.12)',
        bloom: '0 25px 80px rgba(34, 197, 94, 0.18)'
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top left, rgba(122, 214, 159, 0.45), transparent 35%), radial-gradient(circle at top right, rgba(125, 211, 252, 0.35), transparent 30%)'
      },
      fontFamily: {
        display: ['"Trebuchet MS"', 'sans-serif'],
        body: ['"Segoe UI"', 'sans-serif']
      }
    }
  },
  plugins: []
};
