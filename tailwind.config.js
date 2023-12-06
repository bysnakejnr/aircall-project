/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        myShadow1: "4.1px -5px 0 0 rgb(17,24,39)",
        myShadow2: "-4.1px -5px 0 0 rgb(17,24,39)",
      },
      animation: {
        // Bounces 2 times 1s equals 2 seconds
        'bounce-short': 'bounce 1s ease-in-out 2'
      }
    },
  },
  plugins: [],
};