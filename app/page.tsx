'use client'

import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    })
    const data = await res.json()
    setResponse(data.result)
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>YSOT GPT 챗봇</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="질문을 입력하세요"
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
      />
      <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>
        전송
      </button>
      {response && (
        <div style={{ marginTop: '2rem' }}>
          <strong>GPT 응답:</strong>
          <p>{response}</p>
        </div>
      )}
    </main>
  )
}
