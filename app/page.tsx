'use client';

import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <div className="p-4">
      <ThemeToggle />
      <div className="mt-4 p-4 bg-white text-black dark:bg-black dark:text-white rounded">
        이건 다크모드에 따라 배경이 바뀌는 박스입니다.
      </div>
    </div>
  )
}