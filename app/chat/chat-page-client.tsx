"use client"

import { ChatInterface } from "@/components/chat/chat-interface"
import { ChatProvider } from "@/components/providers/chat-provider"
import { Header } from "@/components/layout/header"
import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChatPageClient() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      // If not loading and no user, redirect to home (which will open auth modal)
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

  if (!user) {
    // If not authenticated, render nothing or a redirect message
    return null
  }

  return (
    <ChatProvider>
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <main className="flex-1 overflow-hidden">
          <ChatInterface />
        </main>
      </div>
    </ChatProvider>
  )
}
