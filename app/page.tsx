
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white flex flex-col items-center justify-center gap-6 p-8 transition-colors duration-500">
      <button className="px-4 py-2 border rounded-md dark:border-white border-gray-800 dark:text-white">
        ☀️ Light / Dark
      </button>
      <div className="w-64 h-32 bg-white text-black dark:bg-purple-900 dark:text-yellow-300 transition-all duration-500 rounded-xl flex items-center justify-center text-xl">
        다크모드 테스트 박스입니다 🌗
      </div>
    </div>
  )
}
