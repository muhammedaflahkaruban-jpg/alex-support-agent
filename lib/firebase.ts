import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Validate required environment variables
const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
]

// Check for missing environment variables
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

if (missingEnvVars.length > 0) {
  console.error("Missing Firebase environment variables:", missingEnvVars)
  console.error("Please check your .env.local file and ensure all Firebase variables are set")
}

// Initialize Firebase app
let app: FirebaseApp
let auth: Auth
let db: Firestore
let storage: FirebaseStorage

try {
  // Initialize Firebase app
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

  // Initialize Firebase services
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)

  console.log("Firebase initialized successfully")
} catch (error) {
  console.error("Firebase initialization failed:", error)

  // Create fallback objects to prevent runtime errors
  // These will allow the app to load but authentication won't work
  app = {} as FirebaseApp
  auth = {} as Auth
  db = {} as Firestore
  storage = {} as FirebaseStorage
}

// Export the initialized services
export { auth, db, storage }
export default app

// Function to check if Firebase is properly initialized
export function isFirebaseInitialized(): boolean {
  try {
    return !!(app && auth && db && storage && auth.app)
  } catch {
    return false
  }
}

// Function to check Firebase status
export async function checkFirebaseStatus() {
  try {
    if (isFirebaseInitialized()) {
      return { ok: true, message: "Firebase services initialized successfully" }
    }
    return { ok: false, message: "Firebase services not properly initialized" }
  } catch (error) {
    console.error("Firebase status check failed:", error)
    return {
      ok: false,
      message: `Firebase status check failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}
