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
          content: msg.replace(/^You:\s?/, '').replace(/^AI:\s?/, ''),
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
      const chunk = decoder.decode(value, { stream: true });

      // 필터링하여 JSON에서 content만 추출
      const matches = [...chunk.matchAll(/"content":"(.*?)"/g)];
      for (const match of matches) {
        aiMessage += match[1];
        setMessages((prev) => [...newMessages, `AI: ${aiMessage}`]);
      }
    }
  };

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">YSOT GPT Chat</h1>
      <div className="space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="bg-gray-100 p-2 rounded">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something..."
        />
        <button type="submit" className="px-4 py-1 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
    </main>
  );
}