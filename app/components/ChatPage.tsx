import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, `You: ${userMessage}`]);
    setInput("");
    setIsLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: [{ role: "user", content: userMessage }] }),
    });

    if (!res.ok || !res.body) {
      setMessages((prev) => [...prev, "Error: Failed to get response"]);
      setIsLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let result = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value);
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last && last.startsWith("AI:")) {
          updated[updated.length - 1] = `AI: ${result}`;
        } else {
          updated.push(`AI: ${result}`);
        }
        return [...updated];
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">YSOT GPT-4 Chat</h1>
      <div className="space-y-2 border rounded-md p-4 h-96 overflow-y-auto mb-4 bg-white">
        {messages.map((m, i) => (
          <div key={i} className="whitespace-pre-wrap text-sm">
            {m}
          </div>
        ))}
        {isLoading && <div className="text-gray-400">AI: ...</div>}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}