
import OpenAI from "openai"
import { OpenAIStream, StreamingTextResponse } from "ai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

export const runtime = "edge"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    stream: true,
    messages
  })

  const stream = OpenAIStream(response as any)
  return new StreamingTextResponse(stream)
}
