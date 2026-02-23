/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean': {
          50: '#e6f7ff',
          100: '#b3e6ff',
          200: '#80d4ff',
          300: '#4dc3ff',
          400: '#1ab1ff',
          500: '#0099e6',
          600: '#0077b3',
          700: '#005580',
          800: '#00334d',
          900: '#001a26',
        },
        'deep': {
          50: '#e6f0f5',
          100: '#b3d1e0',
          200: '#80b3cc',
          300: '#4d94b8',
          400: '#1a75a3',
          500: '#006080',
          600: '#004d66',
          700: '#003a4d',
          800: '#002633',
          900: '#00131a',
        },
        'coral': {
          50: '#fff5f5',
          100: '#ffe0e0',
          200: '#ffcccc',
          300: '#ff9999',
          400: '#ff6666',
          500: '#ff4d4d',
          600: '#cc3d3d',
          700: '#992e2e',
          800: '#661f1f',
          900: '#330f0f',
        }
      },
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(135deg, #006080 0%, #0099e6 50%, #4dc3ff 100%)',
        'deep-gradient': 'linear-gradient(180deg, #001a26 0%, #005580 100%)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
