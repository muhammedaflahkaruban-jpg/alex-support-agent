import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"

// Define schema for company data
export const companyDataTable = pgTable("company_data", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull().unique(),
  companyName: text("company_name").notNull(),
  ceoName: text("ceo_name"),
  features: text("features"),
  products: text("products"),
  services: text("services"),
  values: text("values"),
  tone: text("tone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type CompanyData = typeof companyDataTable.$inferSelect
export type NewCompanyData = typeof companyDataTable.$inferInsert

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL environment variable.")
  // In a real application, you might throw an error or handle this more gracefully
  // For now, we'll just log and proceed, but database operations will fail.
}

// Initialize Neon DB client
export const sql = neon(process.env.DATABASE_URL!) // Use ! to assert it's defined after the check
export const db = drizzle(sql)

// Function to ensure table exists (for initial setup)
export async function ensureCompanyDataTableExists() {
  try {
    // This is a simplified check. In a real app, you'd use migrations.
    await db.execute(
      `CREATE TABLE IF NOT EXISTS company_data (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(256) UNIQUE NOT NULL,
        company_name TEXT NOT NULL,
        ceo_name TEXT,
        features TEXT,
        products TEXT,
        services TEXT,
        values TEXT,
        tone TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );`,
    )
    console.log("Company data table ensured to exist.")
  } catch (error) {
    console.error("Error ensuring company_data table exists:", error)
    // If the table already exists, this might throw an error depending on the client,
    // but we can generally ignore it for IF NOT EXISTS.
  }
}

// Call this function on application startup or first access
ensureCompanyDataTableExists().catch(console.error)
