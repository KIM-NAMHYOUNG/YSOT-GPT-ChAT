"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, input];
    setMessages(newMessages);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: newMessages }),
    });

    if (!response.ok) {
      console.error("API 호출 실패");
      return;
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let streamedText = "";

    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;
      streamedText += decoder.decode(value);
      setMessages([...newMessages, streamedText]);
    }
  };

  return (
    <div>
      <h1>GPT 챗봇</h1>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="메시지를 입력하세요"
      />
      <button onClick={sendMessage}>보내기</button>
    </div>
  );
}
