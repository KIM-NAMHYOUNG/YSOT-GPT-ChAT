/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  safelist: [
    'dark',
    'dark:bg-purple-900',
    'dark:text-yellow-300',
    'dark:bg-zinc-900',
    'dark:text-white',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}