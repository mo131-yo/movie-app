// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'sx': '320px',
        'xs': '375px',
        'mobile': '425px',
      }
    },
  },
  plugins: [],
};
