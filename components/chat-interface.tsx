"use client"

// This file is deprecated and replaced by components/chat/chat-interface.tsx
// Keeping it for reference if needed, but it's not actively used in the current structure.
import { useState } from "react"
import { MessageList } from "./chat/message-list"
import { MessageInput } from "./chat/message-input"
import { ChatHeader } from "./chat/chat-header"
import { TypingIndicator } from "./chat/typing-indicator"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    }
    setMessages((prev) => [...prev, newUserMessage])
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        text: data.response,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        text: "Sorry, I encountered an error. Please try again later.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto border rounded-lg shadow-lg bg-card">
      <ChatHeader agentName="Mr. Alex" />
      <MessageList messages={messages} />
      {isTyping && <TypingIndicator />}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}
