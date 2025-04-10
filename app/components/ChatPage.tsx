'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, `You: ${input}`];
    setMessages([...newMessages, `AI:`]); // AI 응답 자리 미리 생성
    setInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: newMessages.map((content) => ({ role: 'user', content })),
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
      const lines = chunk.split('\n').filter((line) => line.startsWith('data: '));

      for (const line of lines) {
        const json = line.replace(/^data: /, '');
        if (json === '[DONE]') return;

        try {
          const parsed = JSON.parse(json);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            aiMessage += content;
            setMessages((prev) => [
              ...prev.slice(0, -1),
              `AI: ${aiMessage}`,
            ]);
          }
        } catch (err) {
          console.error('JSON parse error:', err);
        }
      }
    }
  };

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">YSOT GPT Chat</h1>
      <div className="space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
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