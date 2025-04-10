'use client'

import { useState } from 'react'

export default function ChatPage() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: input }] }),
    })
    const reader = res.body?.getReader()
    const decoder = new TextDecoder()
    let result = ''
    while (true) {
      const { done, value } = await reader!.read()
      if (done) break
      result += decoder.decode(value)
      setResponse(result)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          style={{ width: '300px' }}
        />
        <button type="submit">Send</button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <strong>Response:</strong>
        <pre>{response}</pre>
      </div>
    </div>
  )
}
