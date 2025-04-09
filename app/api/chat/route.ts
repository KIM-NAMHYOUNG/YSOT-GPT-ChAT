
import { OpenAIStream, streamToResponse } from "ai";
import OpenAI from "openai";
import { OpenAIStreamPayload } from "ai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response);
  return streamToResponse(stream);
}
