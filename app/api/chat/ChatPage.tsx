'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [isLoading])

  return (
    <div className="flex flex-col h-screen p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">YSOT GPT Chat</h1>
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block px-4 py-2 rounded-lg ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
              <strong>{m.role === 'user' ? 'You' : 'AI'}:</strong> {m.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          placeholder="메시지를 입력하세요"
          className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg" disabled={isLoading}>
          보내기
        </button>
      </form>
    </div>
  )
}
