import nodemailer from "nodemailer"

interface EmailData {
  to: string
  subject: string
  body: string
}

interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

// Configure your email transporter with better error handling
let transporter: nodemailer.Transporter | null = null

try {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
} catch (error) {
  console.warn("Email transporter not configured:", error)
}

export async function sendEmail(emailData: EmailData): Promise<EmailResult> {
  if (!transporter) {
    return {
      success: false,
      error: "Email service not configured",
    }
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.body,
      html: `<p>${emailData.body.replace(/\n/g, "<br>")}</p>`,
    })

    return {
      success: true,
      messageId: info.messageId,
    }
  } catch (error) {
    console.error("Email sending error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
