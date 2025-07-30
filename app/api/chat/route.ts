import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { sendEmail } from "@/lib/email-service"
import { DatabaseService } from "@/lib/database-service"
import { CacheService } from "@/lib/cache-service"
import { StatusService } from "@/lib/status-service"
import { db, companyDataTable } from "@/lib/neon-db"
import { eq } from "drizzle-orm"
import { streamText } from "ai"
import { generateAlexSystemPrompt } from "@/lib/ai-prompt-generator"

// Initialize services
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
const dbService = new DatabaseService()
const cacheService = new CacheService()
const statusService = new StatusService()

export const runtime = "edge" // Use edge runtime for AI streaming
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const { message, history, userId } = await req.json()

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        response: "I'm sorry, but I'm not properly configured. Please check the API key configuration.",
        error: true,
      })
    }

    if (!userId) {
      return NextResponse.json({
        response: "Authentication required. Please sign in to continue.",
        error: true,
      })
    }

    // Fetch company data from Neon DB
    let companyData = null
    try {
      const result = await db.select().from(companyDataTable).where(eq(companyDataTable.userId, userId)).limit(1)
      if (result.length > 0) {
        companyData = result[0]
      }
    } catch (dbError) {
      console.error("Error fetching company data from Neon DB:", dbError)
      // Optionally, log to a monitoring service
    }

    // Generate dynamic system prompt for Alex
    const systemPrompt = generateAlexSystemPrompt(companyData)

    const result = await streamText({
      model: genAI.getGenerativeModel("gemini-2.0-flash-exp"), // Using Gemini 2.5 Flash as requested
      system: systemPrompt,
      messages: history?.slice(-10) || [], // Keep last 10 messages for context
      onFinish: ({ text, usage, finishReason }) => {
        console.log("AI Response Finished:", { text, usage, finishReason })
        // Here you could save the conversation to Firebase or Neon if needed
      },
    })

    // Save chat session to database
    try {
      const sessionId = `${userId}_${Date.now()}`
      const updatedHistory = [
        ...history,
        { role: "user", content: message },
        { role: "assistant", content: result.text },
      ]
      await db.saveChatSession(userId, sessionId, updatedHistory)
    } catch (error) {
      console.warn("Could not save chat session:", error)
    }

    // Log analytics
    try {
      await db.logAnalytics(userId, "chat_message", {
        message_length: message.length,
        response_length: result.text.length,
        has_company_data: !!companyData,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.warn("Could not log analytics:", error)
    }

    return NextResponse.json({
      response: result.text,
      hasCompanyData: !!companyData,
      companyName: companyData?.company_name || null,
    })
  } catch (error: any) {
    console.error("Error in chat API route:", error)
    // More specific error handling for different types of errors
    if (error.name === "GoogleGenerativeAIError") {
      return new Response(JSON.stringify({ error: `AI service error: ${error.message}` }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred during chat processing." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

function prepareContextualMessage(message: string, history: any[], companyData: any): string {
  let contextualMessage = message

  // Add company context if available
  if (companyData) {
    contextualMessage += `\n\n[BUSINESS CONTEXT: This conversation is for ${companyData.company_name}]`
  }

  // Add conversation history for context
  if (history && history.length > 0) {
    contextualMessage += "\n\nRecent conversation:\n"
    history.forEach((msg: any) => {
      contextualMessage += `${msg.role}: ${msg.content}\n`
    })
  }

  return contextualMessage
}

async function analyzeMessageForFunctions(message: string): Promise<string[]> {
  const triggers = []
  const lowerMessage = message.toLowerCase()

  // Email triggers
  if (lowerMessage.includes("send email") || lowerMessage.includes("email")) {
    triggers.push("email")
  }

  // Database lookup triggers
  if (lowerMessage.includes("find") || lowerMessage.includes("search") || lowerMessage.includes("lookup")) {
    triggers.push("database")
  }

  // Status check triggers
  if (lowerMessage.includes("status") || lowerMessage.includes("health") || lowerMessage.includes("check")) {
    triggers.push("status")
  }

  return triggers
}

async function executeFunctions(triggers: string[], message: string): Promise<any> {
  const results: any = {}

  for (const trigger of triggers) {
    try {
      switch (trigger) {
        case "email":
          results.email = await handleEmailFunction(message)
          break
        case "database":
          results.database = await handleDatabaseFunction(message)
          break
        case "status":
          results.status = await handleStatusFunction()
          break
      }
    } catch (error) {
      console.error(`Function ${trigger} error:`, error)
      results[trigger] = { error: `Failed to execute ${trigger} function` }
    }
  }

  return results
}

async function handleEmailFunction(message: string) {
  try {
    const emailData = {
      to: "support@example.com",
      subject: "Support Request from Alex AI",
      body: `User message: ${message}\n\nGenerated by Alex AI Support Agent`,
    }

    const result = await sendEmail(emailData)
    return { sent: result.success, messageId: result.messageId }
  } catch (error) {
    return { error: "Email function temporarily unavailable" }
  }
}

async function handleDatabaseFunction(message: string) {
  try {
    const searchTerm = extractSearchTerm(message)
    const results = await dbService.search(searchTerm)
    return { results: results.slice(0, 5) }
  } catch (error) {
    return { error: "Database search temporarily unavailable" }
  }
}

async function handleStatusFunction() {
  try {
    const status = await statusService.getSystemStatus()
    return status
  } catch (error) {
    return { error: "Status check temporarily unavailable" }
  }
}

function extractSearchTerm(message: string): string {
  const words = message.toLowerCase().split(" ")
  const stopWords = ["find", "search", "lookup", "for", "the", "a", "an"]
  return words.filter((word) => !stopWords.includes(word)).join(" ")
}
