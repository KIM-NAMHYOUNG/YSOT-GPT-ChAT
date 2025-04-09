import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      stream: true,
      messages,
    })

    const stream = await OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('❌ API Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
