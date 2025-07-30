import { type NextRequest, NextResponse } from "next/server"
import { db, companyDataTable, type NewCompanyData } from "@/lib/neon-db"
import { eq } from "drizzle-orm"

export async function POST(req: NextRequest) {
  try {
    const data: NewCompanyData = await req.json()
    const { userId, companyName, ceoName, features, products, services, values, tone } = data

    if (!userId || !companyName) {
      return NextResponse.json({ error: "User ID and Company Name are required." }, { status: 400 })
    }

    // Check if data for this user already exists
    const existingData = await db.select().from(companyDataTable).where(eq(companyDataTable.userId, userId)).limit(1)

    if (existingData.length > 0) {
      // Update existing data
      const updatedData = await db
        .update(companyDataTable)
        .set({
          companyName,
          ceoName,
          features,
          products,
          services,
          values,
          tone,
          updatedAt: new Date(),
        })
        .where(eq(companyDataTable.userId, userId))
        .returning()
      return NextResponse.json(updatedData[0], { status: 200 })
    } else {
      // Insert new data
      const newData = await db
        .insert(companyDataTable)
        .values({
          userId,
          companyName,
          ceoName,
          features,
          products,
          services,
          values,
          tone,
        })
        .returning()
      return NextResponse.json(newData[0], { status: 201 })
    }
  } catch (error: any) {
    console.error("Error saving company data:", error)
    return NextResponse.json({ error: error.message || "Failed to save company data." }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 })
    }

    const data = await db.select().from(companyDataTable).where(eq(companyDataTable.userId, userId)).limit(1)

    if (data.length === 0) {
      return NextResponse.json(null, { status: 200 })
    }

    return NextResponse.json(data[0], { status: 200 })
  } catch (error: any) {
    console.error("Error fetching company data:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch company data." }, { status: 500 })
  }
}
