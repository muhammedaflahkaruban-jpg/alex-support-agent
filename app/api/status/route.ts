import { NextResponse } from "next/server"
import { StatusService } from "@/lib/status-service"

const statusService = new StatusService()

export async function GET() {
  try {
    const status = await statusService.getSystemStatus()
    return NextResponse.json(status)
  } catch (error) {
    console.error("Status API error:", error)
    return NextResponse.json({ error: "Failed to get system status" }, { status: 500 })
  }
}
