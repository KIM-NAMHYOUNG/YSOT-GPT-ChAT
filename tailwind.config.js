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
    'dark:bg-zinc-900',
    'dark:text-white',
    'dark:bg-purple-900',
    'dark:text-yellow-300',
    'dark:border-white',
    'hidden', // ← 테스트용
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};