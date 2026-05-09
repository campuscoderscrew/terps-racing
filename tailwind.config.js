

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        notable: ['Notable', 'sans-serif'],
        neuton: ['Neuton'],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};