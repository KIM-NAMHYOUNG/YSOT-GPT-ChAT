'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, `You: ${input}`];
    setMessages(newMessages);
    setInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: newMessages.map((msg) => ({
          role: msg.startsWith('You:') ? 'user' : 'assistant',
          content: msg.replace(/^You: |^AI: /, ''),
        })),
      }),
    });

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiMessage = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunkStr = decoder.decode(value);
      const matches = [...chunkStr.matchAll(/"content":"(.*?)"/g)];

      for (const match of matches) {
        aiMessage += match[1];
        setMessages((prev) => [...newMessages, `AI: ${aiMessage}`]);
      }
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-300">
          YSOT GPT Chat
        </h1>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-sm h-80 overflow-y-auto">
          {messages.map((msg, idx) => (
            <p key={idx} className="mb-2">
              {msg}
            </p>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
            placeholder="메시지를 입력하세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-400 transition"
          >
            전송
          </button>
        </form>
      </div>
    </main>
  );
}