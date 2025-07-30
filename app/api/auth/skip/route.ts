import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST(request: NextRequest) {
  try {
    const testEmail = "test@example.com"

    // Check if test user already exists
    let testUser = await db.select().from(users).where(eq(users.email, testEmail)).limit(1)

    if (testUser.length === 0) {
      // Create test user
      const newUser = await db
        .insert(users)
        .values({
          email: testEmail,
          name: "Test User",
          password: "123456789", // No password for skip user
        })
        .returning()

      testUser = newUser
    }

    return NextResponse.json(
      {
        message: "Test user created/found successfully",
        user: {
          id: testUser[0].id,
          email: testUser[0].email,
          name: testUser[0].name,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Skip auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
