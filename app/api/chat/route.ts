export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response('OpenAI API key not configured', { status: 500 });
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo',
      stream: true,
      messages,
    }),
  });

  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
}