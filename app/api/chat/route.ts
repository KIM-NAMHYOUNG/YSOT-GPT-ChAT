// app/api/chat/route.ts

import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      stream: false,
    });

    return NextResponse.json(completion);
  } catch (error) {
    console.error('❌ API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}