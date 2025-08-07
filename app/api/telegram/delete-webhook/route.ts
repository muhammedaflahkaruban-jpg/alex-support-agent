export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return new Response('Missing TELEGRAM_BOT_TOKEN', { status: 400 });
  }

  const url = `https://api.telegram.org/bot${token}/deleteWebhook`;
  const res = await fetch(url, { method: 'POST' });
  const body = await res.text();
  return new Response(body, { status: res.status });
}