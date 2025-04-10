'use client';

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">GPT 챗봇</h1>
      <div className="space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-2 bg-gray-100 rounded">
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
