'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">YSOT GPT Chat</h1>
      <div className="flex-1 overflow-auto border rounded-md p-2 space-y-2">
        {messages.map((m) => (
          <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={m.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}>{m.content}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={handleInputChange}
          placeholder="메시지를 입력하세요..."
        />
        <button type="submit" className="ml-2 px-4 py-1 bg-blue-500 text-white rounded" disabled={isLoading}>
          보내기
        </button>
      </form>
    </div>
  );
}