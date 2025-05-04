'use client'

import { useTheme } from '@/lib/theme-context'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-1 border rounded dark:border-white border-gray-800 dark:text-white"
    >
      {theme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드'}
    </button>
  )
}
