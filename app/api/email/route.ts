import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email-service";

export const maxDuration = 15;

const EmailSchema = z.object({
  to: z.string().email("Invalid recipient email"),
  subject: z.string().min(1, "Subject is required").max(200),
  body: z.string().min(1, "Body is required").max(5000),
  cc: z.union([z.string(), z.array(z.string().email())]).optional(),
  bcc: z.union([z.string(), z.array(z.string().email())]).optional(),
  replyTo: z.string().email().optional(),
});

// Named export for the POST HTTP method (Next.js 15 App Router)
export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parsed = EmailSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: true,
          message: "Invalid request body",
          issues: parsed.error.issues.map((i) => ({
            path: i.path,
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    const result = await sendEmail(parsed.data);
    console.log("Email sent result:", result);
    console.log("Email data:", parsed.data);

    if (!result.success) {
      return NextResponse.json(
        {
          error: true,
          message: "Failed to send email",
          details: result.error,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        messageId: result.messageId,
      },
      { status: 200 }
    );
  } catch (err: any) {
    const isProd = process.env.NODE_ENV === "production";
    const payload: any = {
      error: true,
      message: "Unexpected server error while sending email",
    };
    if (!isProd) {
      payload.details = {
        name: err?.name,
        message: err?.message,
        stack: err?.stack,
      };
    }
    return NextResponse.json(payload, { status: 500 });
  }
}
