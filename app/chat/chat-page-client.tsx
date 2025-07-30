"use client"
import { ChatInterface } from "@/components/chat/chat-interface"
import { ChatHeader } from "@/components/chat/chat-header"

export default function ChatPageClient() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ChatHeader />
      <main className="flex-1">
        <ChatInterface />
      </main>
    </div>
  )
}
