import { OpenAIStream, streamToResponse } from "ai";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      stream: true,
      messages,
    });

    const stream = OpenAIStream(response);
    return streamToResponse(stream);
  } catch (error) {
    console.error("❌ API Error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
