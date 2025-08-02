"use client"
import { useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChatInterface } from "@/components/chat/chat-interface"
import { ChatHeader } from "@/components/chat/chat-header"
import { useChat } from "@/components/providers/chat-provider"

interface ChatPageClientProps {
  initialMessage?: string
}

/**
 * Prevent duplicate auto-send on re-mounts or hot reloads by using a ref guard.
 * Also removes ?message= from the URL after consuming it to avoid reprocessing.
 */
export default function ChatPageClient({ initialMessage }: ChatPageClientProps) {
  const { sendMessage } = useChat()
  const hasSentRef = useRef(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (hasSentRef.current) return

    const sessionKey = "initialChatMessage"
    const fromUrl = (initialMessage || "").trim()
    let messageToSend = fromUrl

    if (!messageToSend && typeof window !== "undefined") {
      const stored = sessionStorage.getItem(sessionKey) || ""
      messageToSend = stored.trim()
      if (stored) {
        sessionStorage.removeItem(sessionKey)
      }
    }

    if (messageToSend) {
      hasSentRef.current = true
      void sendMessage(messageToSend)

      // Clean the URL to avoid duplicate sends on client navigations
      if (typeof window !== "undefined") {
        const sp = new URLSearchParams(searchParams?.toString() || "")
        if (sp.has("message")) {
          sp.delete("message")
          const newUrl = `${window.location.pathname}${sp.toString() ? `?${sp.toString()}` : ""}`
          router.replace(newUrl)
        }
      }
    }
  }, [initialMessage, sendMessage, router, searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 dark:from-background dark:via-background/90 dark:to-background/80 flex flex-col">
      <ChatHeader />
      <main className="flex-1">
        <ChatInterface />
      </main>
    </div>
  )
}
