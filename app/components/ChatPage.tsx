'use client';

import { useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const updatedMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(updatedMessages);
    setInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiMessage = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunkStr = decoder.decode(value, { stream: true });

      // JSON 안에서 content만 추출
      const matches = [...chunkStr.matchAll(/"content":"(.*?)"/g)];
      for (const match of matches) {
        aiMessage += match[1];
        setMessages((prev) => [
          ...updatedMessages,
          { role: 'assistant', content: aiMessage },
        ]);
      }
    }
  };

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">YSOT GPT Chat</h1>
      <div className="space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
            }`}
          >
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
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