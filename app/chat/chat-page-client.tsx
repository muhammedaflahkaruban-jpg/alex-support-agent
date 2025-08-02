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
    <div className="chat-shell">
      {/* Fixed, non-scrolling chat background for chat route only */}
      <div className="chat-bg-fixed" />
      <ChatHeader />
      <main className="chat-scroll">
        <ChatInterface />
      </main>
    </div>
  )
}
