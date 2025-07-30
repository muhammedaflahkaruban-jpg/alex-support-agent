// This service is intended to provide health checks for various parts of the application.
// It aggregates status from different services like database, Firebase, and AI.

import { checkDatabaseStatus } from "./database-service"
import { checkFirebaseStatus } from "./firebase"
import { checkAIStatus } from "./ai-prompt-generator"

export async function getOverallStatus() {
  const results = await Promise.allSettled([checkDatabaseStatus(), checkFirebaseStatus(), checkAIStatus()])

  const statuses = {
    database:
      results[0].status === "fulfilled"
        ? results[0].value
        : { ok: false, message: `Database check failed: ${results[0].reason}` },
    firebase:
      results[1].status === "fulfilled"
        ? results[1].value
        : { ok: false, message: `Firebase check failed: ${results[1].reason}` },
    ai:
      results[2].status === "fulfilled"
        ? results[2].value
        : { ok: false, message: `AI check failed: ${results[2].reason}` },
  }

  const overallOk = statuses.database.ok && statuses.firebase.ok && statuses.ai.ok

  return {
    overall: overallOk ? "Operational" : "Degraded",
    details: statuses,
    timestamp: new Date().toISOString(),
  }
}
