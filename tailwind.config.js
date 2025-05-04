/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}', // 💡 lib 폴더도 포함 필수!
  ],
  darkMode: 'class', // 🌙 class 기반 다크모드
  safelist: [
    'dark',                    // html에 붙는 클래스
    'dark:bg-zinc-900',        // 배경
    'dark:text-white',         // 텍스트
    'dark:bg-purple-900',      // 테스트용 박스 배경
    'dark:text-yellow-300',    // 테스트용 박스 텍스트
    'dark:border-white',       // 버튼 테두리
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};