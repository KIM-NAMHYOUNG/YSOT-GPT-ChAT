'use client';

import './globals.css';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true); // 기본값은 다크모드

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
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
    <html lang="en">
      <body>
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