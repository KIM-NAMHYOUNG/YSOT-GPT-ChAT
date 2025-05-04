'use client';

import './globals.css';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true); // 기본값은 다크모드

  // 초기에 localStorage 확인해서 다크모드 여부 적용
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = stored ?? (prefersDark ? 'dark' : 'light');

    if (defaultTheme === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  // 다크모드 토글 함수
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <html lang="ko" className={isDark ? 'dark' : ''}>
      <body className="bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300">
        <div className="flex justify-end p-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-1 border rounded dark:border-white border-gray-800 dark:text-white"
          >
            {isDark ? '☀️ 라이트 모드' : '🌙 다크 모드'}
          </button>
        </div>
        {children}
      </body>
    </html>
  );
}