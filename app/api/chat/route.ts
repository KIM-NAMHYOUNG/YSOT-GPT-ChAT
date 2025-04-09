import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { message } = await req.json()

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4-1106-preview',
      messages: [{ role: 'user', content: message }],
      temperature: 0.7,
    }),
  })

  const data = await response.json()

  return NextResponse.json({ result: data.choices[0].message.content })
}
