"use client"

import type React from "react"

import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// This component acts as a client-side entry point for pages that need auth checks
// and redirects, ensuring the AuthProvider context is available.
export default function ClientPage({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If not loading and no user, redirect to home to trigger auth modal
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  if (loading) {
    // Show a loading skeleton while authentication status is being determined
    return (
      <div className="flex flex-col h-screen p-4 space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  // If authenticated, render the children
  return <>{children}</>
}
