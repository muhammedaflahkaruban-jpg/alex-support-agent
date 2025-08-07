export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const base = process.env.PUBLIC_BASE_URL;
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!token || !base || !secret) {
    return new Response('Missing TELEGRAM_BOT_TOKEN or PUBLIC_BASE_URL or TELEGRAM_WEBHOOK_SECRET', { status: 400 });
  }

  const url = `https://api.telegram.org/bot${token}/setWebhook`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: `${base}/api/telegram`,
      secret_token: secret,
      allowed_updates: ['message'],
      drop_pending_updates: false,
    }),
  });

  const body = await res.text();
  return new Response(body, { status: res.status });
}