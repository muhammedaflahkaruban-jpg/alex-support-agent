// This is a placeholder for an email service.
// In a real application, you might use Nodemailer with a service like SendGrid, Mailgun, or AWS SES.

interface EmailService {
  sendEmail(to: string, subject: string, htmlContent: string, textContent?: string): Promise<void>
}

class MockEmailService implements EmailService {
  async sendEmail(to: string, subject: string, htmlContent: string, textContent?: string): Promise<void> {
    console.log(`--- Mock Email Sent ---`)
    console.log(`To: ${to}`)
    console.log(`Subject: ${subject}`)
    console.log(`HTML Content: ${htmlContent.substring(0, 100)}...`)
    if (textContent) {
      console.log(`Text Content: ${textContent.substring(0, 100)}...`)
    }
    console.log(`-----------------------`)
    // In a real app, you'd integrate with an actual email API here.
    return Promise.resolve()
  }
}

export const emailService: EmailService = new MockEmailService()

// Example usage:
// await emailService.sendEmail('user@example.com', 'Welcome!', '<h1>Welcome!</h1>', 'Welcome!');
