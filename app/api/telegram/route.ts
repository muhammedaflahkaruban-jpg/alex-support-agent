import { NextResponse } from 'next/server';

type TelegramUser = {
  id: number;
  is_bot: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
};

type TelegramChat = {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  username?: string;
};

type TelegramMessage = {
  message_id: number;
  from?: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
};

type TelegramUpdate = {
  update_id: number;
  message?: TelegramMessage;
};

async function sendTelegramMessage(chatId: number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error('TELEGRAM_BOT_TOKEN not set');

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`sendMessage failed: ${res.status} ${body}`);
  }
}

export async function POST(req: Request) {
  // Validate secret token from Telegram (configured when setting the webhook)
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  const got = req.headers.get('x-telegram-bot-api-secret-token');
  if (!secret || got !== secret) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  let update: TelegramUpdate | undefined;
  try {
    update = await req.json();
  } catch {
    return NextResponse.json({ ok: true }); // acknowledge anyway
  }

  const msg = update?.message;
  const chatId = msg?.chat.id;
  const text = msg?.text?.trim();

  if (!chatId || !text) {
    return NextResponse.json({ ok: true });
  }

  const prefix = '/alex';
  if (text.startsWith(prefix)) {
    const prompt = text.slice(prefix.length).trim();
    if (!prompt) {
      await sendTelegramMessage(chatId, 'Please provide a message after /alex.');
      return NextResponse.json({ ok: true });
    }

    try {
      const base = process.env.PUBLIC_BASE_URL;
      if (!base) throw new Error('PUBLIC_BASE_URL not set');

      const res = await fetch(`${base}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          source: 'telegram'
        }),
        cache: 'no-store',
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Chat API failed: ${res.status} ${body}`);
      }

      const data = await res.json();
      const responseText: string | undefined = data?.response;

      if (responseText) {
        await sendTelegramMessage(chatId, `🤖 Alex says:\n${responseText}`);
      } else {
        await sendTelegramMessage(chatId, "Alex couldn't understand that.");
      }
    } catch (err) {
      console.error('Telegram handler error:', err);
      await sendTelegramMessage(chatId, 'Sorry, something went wrong.');
    }

    return NextResponse.json({ ok: true });
  }

  // Ignore other messages or add more commands here
  return NextResponse.json({ ok: true });
}