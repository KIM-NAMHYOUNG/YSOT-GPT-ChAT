'use client'

export default function Home() {
  return (
    <html lang="ko" className="dark">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-10 bg-white text-black dark:bg-red-500 dark:text-white transition-colors duration-500">
          <h1 className="text-2xl font-bold">다크모드 테스트</h1>
          <p className="text-lg">이 박스가 빨간 배경이면 다크모드가 적용된 거야 🌗</p>
        </div>
      </body>
    </html>
  )
}