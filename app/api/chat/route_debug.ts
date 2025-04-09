import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message) {
      console.error('❌ message가 없음!')
      return NextResponse.json({ error: 'No message provided.' }, { status: 400 })
    }

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
    console.log('✅ GPT 응답:', JSON.stringify(data, null, 2))

    if (data.error) {
      console.error('❌ GPT 에러:', data.error)
      return NextResponse.json({ error: data.error.message }, { status: 500 })
    }

    return NextResponse.json({ result: data.choices?.[0]?.message?.content ?? '응답이 비어있어요.' })
  } catch (err: any) {
    console.error('❌ 서버 에러:', err.message)
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 })
  }
}
