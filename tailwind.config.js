module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#8A4FFF',
        'primary-admin': '#3713ec',
        'background-light': '#f6f6f8',
        'background-dark': '#0A192F',
        'admin-dark': '#131022',
        'admin-darker': '#121118',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};