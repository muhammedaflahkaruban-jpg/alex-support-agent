import nodemailer from "nodemailer";
import { CacheService } from "@/lib/cache-service";

const cacheService = new CacheService();

interface EmailData {
  to: string;
  subject?: string;
  body?: string;
  template?: keyof typeof EMAIL_TEMPLATES;
  context?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

const EMAIL_TEMPLATES = {
  pricing: (recipient: string) => ({
    subject: "Aflah’s Web Development Pricing Details",
    body: `Hi,\n\nHere’s our pricing for web development services:\n- Basic Website: ₹3,999 (5 sections, responsive, contact form, SEO)\n- Extra Page: ₹500\n- E-commerce: ₹2,000\n- Blog: ₹1,500\n- AI Bot (Basic): ₹8,000\n- AI Bot (Advanced): ₹15,000\n\nLet me know if you’d like a detailed quote!\n\nBest,\nAlex`,
  }),
  portfolio: (recipient: string) => ({
    subject: "Aflah’s Web Development Portfolio",
    body: `Hi,\n\nHere are some examples of our recent work:\n- Business Site: [Link]\n- E-commerce: [Link]\n- Portfolio: [Link]\n\nInterested in something similar? Let’s discuss your needs!\n\nBest,\nAlex`,
  }),
  followUp: (recipient: string, context: string) => ({
    subject: "Follow-Up on Your Website Inquiry",
    body: `Hi,\n\nThanks for chatting about your website needs! You mentioned ${context}. Would you like to proceed or have any questions?\n\nBest,\nAlex`,
  }),
  transcript: (recipient: string, context: string) => ({
    subject: "Conversation Transcript",
    body: `Hi Team,\n\nHere’s the conversation transcript for review:\n${context}\n\nBest,\nAlex`,
  }),
};

let transporter: nodemailer.Transporter | null = null;

function initTransporter() {
  if (transporter) return transporter;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) return null;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  return transporter;
}

export async function sendEmail(emailData: EmailData): Promise<EmailResult> {
  try {
    const cacheKey = `email:${emailData.to}:${emailData.template || emailData.subject}`;
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log(`Cache hit for email ${cacheKey}`);
      return { success: true, messageId: cached.messageId };
    }

    const transporter = initTransporter();
    if (!transporter) return { success: false, error: "Transporter not configured" };

    let { to, subject, body, template, context, cc, bcc, replyTo } = emailData;
    if (template && EMAIL_TEMPLATES[template]) {
      const templateData = EMAIL_TEMPLATES[template](to, context || "");
      subject = subject || templateData.subject;
      body = body || templateData.body;
    }

    if (!subject || !body) return { success: false, error: "Subject or body missing" };

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      text: body,
      cc,
      bcc,
      replyTo,
    });

    await cacheService.set(cacheKey, { success: true, messageId: info.messageId }, 3600);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error("Email send error:", err);
    return {
      success: false,
      error: err.code === "EAUTH" ? "SMTP authentication failed" :
             err.code === "ECONNECTION" ? "SMTP connection failed" :
             "Failed to send email",
    };
  }
}