"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  type User,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  type AuthError,
} from "firebase/auth"
import { auth, isFirebaseInitialized } from "@/lib/firebase"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { SessionProvider } from "next-auth/react"

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithGitHub: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  error: string | null
  clearError: () => void
  isInitialized: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if Firebase is properly initialized
    const firebaseReady = isFirebaseInitialized()
    setIsInitialized(firebaseReady)

    if (!firebaseReady) {
      console.error("Firebase Auth not properly initialized")
      setLoading(false)
      setError("Firebase configuration error. Please check your environment variables.")
      return
    }

    let unsubscribe: (() => void) | undefined

    try {
      unsubscribe = onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser)
          setLoading(false)
        },
        (authError) => {
          console.error("Auth state change error:", authError)
          setError("Authentication state error")
          setLoading(false)
        },
      )
    } catch (error) {
      console.error("Failed to set up auth state listener:", error)
      setError("Failed to initialize authentication")
      setLoading(false)
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  const clearError = () => setError(null)

  const handleAuthError = (err: AuthError | any) => {
    console.error("Authentication error:", err)
    let errorMessage = "An unexpected error occurred."

    if (err?.code) {
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use."
          break
        case "auth/invalid-email":
          errorMessage = "Invalid email address."
          break
        case "auth/operation-not-allowed":
          errorMessage = "Email/password sign-in is not enabled."
          break
        case "auth/weak-password":
          errorMessage = "Password is too weak. It should be at least 6 characters."
          break
        case "auth/user-disabled":
          errorMessage = "This user account has been disabled."
          break
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password."
          break
        case "auth/popup-closed-by-user":
          errorMessage = "Authentication popup closed by user."
          break
        case "auth/cancelled-popup-request":
          errorMessage = "Authentication request cancelled."
          break
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection."
          break
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later."
          break
        default:
          errorMessage = err.message || "An unknown authentication error occurred."
      }
    } else if (err?.message) {
      errorMessage = err.message
    }

    setError(errorMessage)
    toast.error("Authentication Failed", { description: errorMessage })
  }

  const signInWithGoogle = async () => {
    if (!isInitialized) {
      handleAuthError(new Error("Firebase not initialized. Please check your configuration."))
      return
    }

    setLoading(true)
    clearError()
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: "select_account",
      })
      await signInWithPopup(auth, provider)
      toast.success("Signed in with Google successfully!")
      router.push("/dashboard")
    } catch (err) {
      handleAuthError(err)
    } finally {
      setLoading(false)
    }
  }

  const signInWithGitHub = async () => {
    if (!isInitialized) {
      handleAuthError(new Error("Firebase not initialized. Please check your configuration."))
      return
    }

    setLoading(true)
    clearError()
    try {
      const provider = new GithubAuthProvider()
      provider.setCustomParameters({
        allow_signup: "true",
      })
      await signInWithPopup(auth, provider)
      toast.success("Signed in with GitHub successfully!")
      router.push("/dashboard")
    } catch (err) {
      handleAuthError(err)
    } finally {
      setLoading(false)
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    if (!isInitialized) {
      handleAuthError(new Error("Firebase not initialized. Please check your configuration."))
      return
    }

    setLoading(true)
    clearError()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Signed in successfully!")
      router.push("/dashboard")
    } catch (err) {
      handleAuthError(err)
    } finally {
      setLoading(false)
    }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    if (!isInitialized) {
      handleAuthError(new Error("Firebase not initialized. Please check your configuration."))
      return
    }

    setLoading(true)
    clearError()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success("Account created successfully!")
      router.push("/dashboard")
    } catch (err) {
      handleAuthError(err)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    if (!isInitialized) {
      handleAuthError(new Error("Firebase not initialized. Please check your configuration."))
      return
    }

    setLoading(true)
    clearError()
    try {
      await firebaseSignOut(auth)
      toast.info("Signed out successfully.")
      router.push("/")
    } catch (err) {
      handleAuthError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SessionProvider>
      <AuthContext.Provider
        value={{
          user,
          loading,
          signInWithGoogle,
          signInWithGitHub,
          signInWithEmail,
          signUpWithEmail,
          signOut,
          error,
          clearError,
          isInitialized,
        }}
      >
        {children}
      </AuthContext.Provider>
    </SessionProvider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
