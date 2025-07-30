// This service acts as an abstraction layer for database operations.
// It can be extended to include more complex queries or ORM integrations.

import { sql } from "@neondatabase/serverless"
import type { CompanyData } from "@/types/company-data" // Assuming you have a types file for CompanyData

export async function saveCompanyData(userId: string, data: CompanyData): Promise<void> {
  try {
    // Ensure the table exists. This is a simple way to handle it,
    // for production, consider a proper migration system (e.g., Drizzle Kit migrations).
    await sql`
      CREATE TABLE IF NOT EXISTS company_data (
        user_id TEXT PRIMARY KEY,
        company_name TEXT,
        ceo_name TEXT,
        business_features TEXT,
        products TEXT,
        services TEXT,
        values TEXT,
        tone TEXT,
        language TEXT,
        alex_bio TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    await sql`
      INSERT INTO company_data (user_id, company_name, ceo_name, business_features, products, services, values, tone, language, alex_bio)
      VALUES (${userId}, ${data.companyName}, ${data.ceoName}, ${data.businessFeatures}, ${data.products}, ${data.services}, ${data.values}, ${data.tone}, ${data.language}, ${data.alexBio})
      ON CONFLICT (user_id) DO UPDATE SET
        company_name = EXCLUDED.company_name,
        ceo_name = EXCLUDED.ceo_name,
        business_features = EXCLUDED.business_features,
        products = EXCLUDED.products,
        services = EXCLUDED.services,
        values = EXCLUDED.values,
        tone = EXCLUDED.tone,
        language = EXCLUDED.language,
        alex_bio = EXCLUDED.alex_bio,
        updated_at = CURRENT_TIMESTAMP;
    `
    console.log(`Company data saved for user: ${userId}`)
  } catch (error) {
    console.error("Error saving company data to Neon DB:", error)
    throw new Error("Failed to save company data to database.")
  }
}

export async function getCompanyData(userId: string): Promise<CompanyData | null> {
  try {
    const result = await sql<CompanyData[]>`
      SELECT company_name AS "companyName", ceo_name AS "ceoName", business_features AS "businessFeatures",
             products, services, values, tone, language, alex_bio AS "alexBio"
      FROM company_data
      WHERE user_id = ${userId};
    `

    if (result.length > 0) {
      return result[0]
    }
    return null
  } catch (error) {
    console.error("Error fetching company data from Neon DB:", error)
    throw new Error("Failed to fetch company data from database.")
  }
}

export async function checkDatabaseStatus() {
  try {
    await sql`SELECT 1`
    return { ok: true, message: "Neon DB connected successfully." }
  } catch (error) {
    console.error("Neon DB connection failed:", error)
    return {
      ok: false,
      message: `Neon DB connection failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}
