'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = `You: ${input}`;
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((content) => ({
            role: 'user',
            content: content.replace(/^You: /, ''),
          })),
        }),
      });

      if (!response.body) {
        setMessages((prev) => [...prev, 'AI: (No response)']);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';
      const streamMessages = [...updatedMessages];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        aiResponse += decoder.decode(value, { stream: true });

        // Update last message in stream
        const lastAI = `AI: ${aiResponse}`;
        setMessages([...streamMessages, lastAI]);
      }
    } catch (err) {
      console.error('Error:', err);
      setMessages((prev) => [...prev, 'AI: (Error occurred)']);
    } finally {
      setLoading(false);
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
              msg.startsWith('You:') ? 'bg-blue-100 text-left' : 'bg-green-100 text-left'
            }`}
          >
            {msg}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={loading ? 'AI is thinking...' : 'Say something...'}
          disabled={loading}
        />
        <button
          type="submit"
          className="px-4 py-1 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </main>
  );
}