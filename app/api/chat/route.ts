import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return new Response(JSON.stringify({ error: 'No message provided' }), { status: 400 })
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      stream: true,
      messages: [{ role: 'user', content: message }],
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('❌ API Error:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
  }
}

export function GET() {
  return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 })
}
