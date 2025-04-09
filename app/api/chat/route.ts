
export const runtime = 'edge';

export async function POST(req: Request): Promise<Response> {
  const { messages } = await req.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo',
      stream: true,
      messages
    })
  });

  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream'
    }
  });
}
