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

async function sendTelegramChatAction(chatId: number, action: 'typing' = 'typing'): Promise<void> {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) throw new Error('TELEGRAM_BOT_TOKEN not configured');
    const url = `https://api.telegram.org/bot${token}/sendChatAction`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action }),
      cache: 'no-store',
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Telegram sendChatAction error: ${res.status} ${body}`);
    }
  } catch (error) {
    console.error('Failed to send Telegram chat action:', error);
  }
}

async function sendTelegramMessage(chatId: number, text: string): Promise<void> {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) throw new Error('TELEGRAM_BOT_TOKEN not configured');
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
      cache: 'no-store',
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Telegram API error: ${res.status} ${body}`);
    }
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
    const receivedSecret = req.headers.get('x-telegram-bot-api-secret-token');
    if (!secret || receivedSecret !== secret) {
      console.warn('Unauthorized Telegram webhook access attempt');
      return NextResponse.json({ ok: false, error: 'Unauthorized access' }, { status: 401 });
    }

    let update: TelegramUpdate;
    try {
      update = await req.json();
      console.log('Received Telegram update:', JSON.stringify(update, null, 2));
    } catch (error) {
      console.error('Failed to parse Telegram update:', error);
      return NextResponse.json({ ok: true });
    }

    const msg = update.message;
    const chatId = msg?.chat.id;
    const text = msg?.text?.trim();

    if (!chatId || !text) {
      console.log('Received empty or invalid Telegram message');
      return NextResponse.json({ ok: true });
    }

    if (msg.chat.type !== 'private') {
      console.log('Ignoring non-private chat message');
      return NextResponse.json({ ok: true });
    }

    // Skip very short or meaningless inputs
    if (text.length <= 2 || ["hi", "hello", "hey"].includes(text.toLowerCase())) {
      await sendTelegramMessage(chatId, "Hey there! I'm Alex from Aflah's team. How can I assist you today?");
      return NextResponse.json({ ok: true });
    }

    await sendTelegramChatAction(chatId);

    try {
      const base = process.env.PUBLIC_BASE_URL;
      if (!base) throw new Error('PUBLIC_BASE_URL not configured');

      const res = await fetch(`${base}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: text }],
          source: 'telegram',
          chatId,
        }),
        cache: 'no-store',
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Chat API error: ${res.status} ${body}`);
      }

      const contentType = res.headers.get('content-type');
      let responseText: string | undefined;

      if (contentType?.includes('application/json')) {
        const data = await res.json();
        responseText = data?.response;
      } else {
        responseText = await res.text();
        console.warn('Received non-JSON response from Chat API:', responseText);
      }

      if (responseText) {
        await sendTelegramMessage(chatId, responseText);
      } else {
        await sendTelegramMessage(chatId, "Apologies, I couldn't process that. Could you please rephrase?");
      }
    } catch (error: any) {
      console.error('Chat API processing error:', error);
      if (error.message.includes('Unexpected token')) {
        await sendTelegramMessage(chatId, 'Sorry, there was an issue with the response format. Please try again.');
      } else {
        await sendTelegramMessage(chatId, 'Oops, something went wrong on my end. Let’s try that again!');
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ ok: true });
  }
}