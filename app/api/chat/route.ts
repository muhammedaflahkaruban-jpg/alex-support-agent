//app/api/chat/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import { CacheService } from "@/lib/cache-service";
import { sendEmail } from "@/lib/email-service";
import { aiInstructions } from "@/lib/ai-service/instructions";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY || "",
});
const cacheService = new CacheService();
const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL?.trim() || "gemini-1.5-pro";
const isProd = process.env.NODE_ENV === "production";

const BodySchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["system", "user", "assistant"]),
    content: z.string(),
  })).min(1, "Messages must contain at least one item"),
});

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY && !process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: true, response: "Server misconfiguration: missing Google API key." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const parse = BodySchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json(
        { error: true, response: "Invalid request body", issues: parse.error.issues },
        { status: 400 }
      );
    }
    const { messages } = parse.data;
    const last = messages[messages.length - 1].content.toLowerCase().trim();
    const queryType = last.includes("price") ? "pricing" :
                     last.includes("website type") ? "website_types" :
                     last.length <= 3 || ["hi", "hy", "hello"].includes(last) ? "greeting" : last;
    const cacheKey = `chat:${queryType}`;

    const cachedResponse = await cacheService.get(cacheKey);
    if (cachedResponse) {
      console.log(`Cache hit for ${cacheKey}`);
      return NextResponse.json({ response: cachedResponse, cached: true }, { status: 200 });
    }
    console.log(`Cache miss for ${cacheKey}`);

    const tools = {
      sendEmail: {
        description: "Send an email with service details or follow-up",
        parameters: {
          type: "object",
          properties: {
            to: { type: "string", format: "email" },
            template: {
              type: "string",
              enum: ["pricing", "portfolio", "followUp", "transcript"],
            },
            context: { type: "string" },
          },
          required: ["to", "template"],
        },
        execute: async ({ to, template, context }: { to: string; template: "pricing" | "portfolio" | "followUp" | "transcript"; context?: string }) => {
          console.log(`sendEmail tool called with to: ${to}, template: ${template}, context: ${context || "none"}`);
          const result = await sendEmail({ to, template, context });
          return result;
        },
      },
    };

    const result = await streamText({
      model: google(DEFAULT_GEMINI_MODEL),
      system: aiInstructions.instructions,
      messages: messages.map((m) => ({
        role: m.role as "system" | "user" | "assistant",
        content: m.content,
      })),
      tools,
      onFinish: async ({ text, toolResults }) => {
        if (text) {
          await cacheService.set(cacheKey, text, queryType === "pricing" ? 86400 : 120);
        }
        // Persist tool execution result if present
        if (Array.isArray(toolResults)) {
          const emailToolRun = toolResults.find(
            (r: any) => r.toolName === "sendEmail" || r.name === "sendEmail"
          );
          if (emailToolRun) {
            // Store the raw tool result payload for quick follow-up retrieval
            await cacheService.set(`email:${cacheKey}`, emailToolRun, 120);
          }
        }
        // Only send transcript for meaningful conversations
        const userMessages = messages.filter(m => m.role === "user");
        if (userMessages.length >= 2 || userMessages.some(m => m.content.toLowerCase().includes("send") || m.content.toLowerCase().includes("email"))) {
          const conversation = messages.map(m => `${m.role}: ${m.content}`).join("\n");
          await sendEmail({
            to: "muhammadaflah23524@gmail.com",
            subject: "Conversation Transcript",
            template: "transcript",
            context: conversation,
          });
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Chat API error:", error);
    if (error.message.includes("context window")) {
      return NextResponse.json(
        { error: true, response: "Sorry, your request is too complex. What’s your main website goal?" },
        { status: 400 }
      );
    }
    if (error.message.includes("functionDeclaration parameters schema")) {
      return NextResponse.json(
        { error: true, response: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: true, response: "Technical difficulties. Please try again." },
      { status: 500 }
    );
  }
}