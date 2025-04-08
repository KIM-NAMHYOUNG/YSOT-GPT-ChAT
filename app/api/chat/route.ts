import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { message } = body

  return NextResponse.json({ response: `You said: ${message}` })
}
