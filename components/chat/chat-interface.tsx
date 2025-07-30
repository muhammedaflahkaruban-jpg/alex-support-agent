"use client"

import { useEffect, useRef } from "react"
import { MessageList } from "./message-list"
import { MessageInput } from "./message-input"
import { ChatHeader } from "./chat-header"
import { TypingIndicator } from "./typing-indicator"
import { useChat } from "@/components/providers/chat-provider"
import { useAuth } from "@/components/providers/auth-provider"
import { toast } from "sonner"

export function ChatInterface() {
  const { messages, addMessage, isLoading, error, clearMessages } = useChat()
  const { user } = useAuth()
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (error) {
      toast.error("Chat Error", {
        description: error,
      })
    }
  }, [error])

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    addMessage({
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    })

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text, userId: user?.uid }), // Pass userId for context
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      addMessage({
        id: Date.now().toString() + "-ai",
        text: data.response,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      })
    } catch (err) {
      console.error("Error sending message:", err)
      addMessage({
        id: Date.now().toString() + "-error",
        text: `Sorry, I encountered an error: ${err instanceof Error ? err.message : String(err)}. Please try again later.`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      })
    }
  }

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto border rounded-lg shadow-lg bg-card">
      <ChatHeader agentName="Mr. Alex" />
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageList messages={messages} />
        {isLoading && <TypingIndicator />}
      </div>
      <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  )
}
