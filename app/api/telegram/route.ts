import { NextResponse } from "next/server";
import { CacheService } from "@/lib/cache-service";

const cacheService = new CacheService();

type TelegramUser = {
  id: number;
  is_bot: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
};

type TelegramChat = {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
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

async function sendTelegramChatAction(chatId: number, action: "typing" = "typing") {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN not configured");

  await fetch(`https://api.telegram.org/bot${token}/sendChatAction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, action }),
    cache: "no-store",
  });
}

async function sendTelegramMessage(chatId: number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN not configured");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
    cache: "no-store",
  });
}

export async function POST(req: Request) {
  try {
    const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
    const receivedSecret = req.headers.get("x-telegram-bot-api-secret-token");
    if (!secret || receivedSecret !== secret) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const update: TelegramUpdate = await req.json();
    const msg = update.message;
    const chatId = msg?.chat.id;
    const text = msg?.text?.trim();

    if (!chatId || !text) return NextResponse.json({ ok: true });

    // Load existing history for this chat
    let history = (await cacheService.get(`telegram:history:${chatId}`)) || [];

    // If stored as string, parse it
    if (typeof history === "string") {
      try {
        history = JSON.parse(history);
      } catch {
        history = [];
      }
    }

    // Append latest user message
    history.push({ role: "user", content: text });

    // Keep only last 15 messages for context
    if (history.length > 15) {
      history = history.slice(history.length - 15);
    }

    await sendTelegramChatAction(chatId);

    const base = process.env.PUBLIC_BASE_URL;
    if (!base) throw new Error("PUBLIC_BASE_URL not configured");

    // Send the full history to the chat API
    const res = await fetch(`${base}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: history,
        source: "telegram",
        chatId,
      }),
      cache: "no-store",
    });

    let replyText = "Sorry, I couldn’t process that.";
    const contentType = res.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const data = await res.json();
      replyText = data?.response || replyText;
    } else {
      replyText = await res.text();
    }

    // Append assistant's reply to history
    history.push({ role: "assistant", content: replyText });

    // Save updated history back to cache with **2-hour expiry**
    await cacheService.set(`telegram:history:${chatId}`, history, 7200); // 7200 seconds = 2 hours

    await sendTelegramMessage(chatId, replyText);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: true });
  }
}
