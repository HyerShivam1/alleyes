/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {      
      backgroundImage: {
        'background': "url('/src/assets/bg-image.jpeg')",
      },

    },
  },
  plugins: [],
}