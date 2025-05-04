'use client'

import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      {/* 다크모드 토글 버튼 */}
      <ThemeToggle />

      {/* 테스트용 다크모드 박스 */}
      <div className="w-64 h-32 bg-white text-black dark:bg-purple-900 dark:text-yellow-300 transition-all duration-500 rounded-xl flex items-center justify-center text-xl">
        다크모드 테스트 박스입니다 🌗
      </div>
    </div>
  )
}