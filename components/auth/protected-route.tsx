"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { AuthModal } from "./auth-modal"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (!session) {
      setShowAuthModal(true)
    }
  }, [session, status])

  const handleAuthClose = () => {
    setShowAuthModal(false)
    router.push("/")
  }

  if (status === "loading") {
    return (
      <div className="flex flex-col h-screen p-4 space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  if (!session) {
    return (
      <>
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">Authentication Required</h2>
            <p className="text-slate-400">Please sign in to access this feature.</p>
          </div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={handleAuthClose} />
      </>
    )
  }

  return <>{children}</>
}
