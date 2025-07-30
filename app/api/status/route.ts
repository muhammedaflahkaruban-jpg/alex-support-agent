import { NextResponse } from "next/server"
import { checkDatabaseStatus } from "@/lib/database-service"
import { checkFirebaseStatus } from "@/lib/firebase" // Assuming firebase.ts exports a status check
import { checkAIStatus } from "@/lib/ai-prompt-generator" // Assuming ai-prompt-generator.ts exports a status check

export async function GET() {
  try {
    const dbStatus = await checkDatabaseStatus()
    const firebaseStatus = await checkFirebaseStatus()
    const aiStatus = await checkAIStatus()

    const overallStatus = dbStatus.ok && firebaseStatus.ok && aiStatus.ok ? "Operational" : "Degraded"

    return NextResponse.json({
      status: overallStatus,
      services: {
        database: dbStatus,
        firebase: firebaseStatus,
        ai: aiStatus,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error checking service status:", error)
    return NextResponse.json(
      {
        status: "Critical",
        message: "Failed to check one or more service statuses.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
