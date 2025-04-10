"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, `You: ${input}`];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: newMessages }),
    });

    if (!response.ok || !response.body) {
      setMessages([...newMessages, "❌ Error: Failed to fetch response"]);
      setLoading(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let aiMessage = "AI: ";
    setMessages((prev) => [...prev, aiMessage]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      aiMessage += chunk;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = aiMessage;
        return updated;
      });
    }

    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">💬 YSOT GPT Chat</h1>
      <div className="border rounded-md p-4 h-96 overflow-y-auto bg-white shadow">
        {messages.map((msg, idx) => (
          <p key={idx} className="whitespace-pre-wrap text-sm mb-2">
            {msg}
          </p>
        ))}
        {loading && <p className="text-gray-500">AI is typing...</p>}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </main>
  );
}