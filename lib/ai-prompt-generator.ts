import { GoogleGenerativeAI } from "@google/generative-ai"

// Ensure GEMINI_API_KEY is set
if (!process.env.GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY environment variable.")
  // In a real application, you might throw an error or handle this more gracefully
  // For now, we'll just log and proceed, but AI operations will fail.
}

const genAI = new GoogleGenerativeAI(process.\
