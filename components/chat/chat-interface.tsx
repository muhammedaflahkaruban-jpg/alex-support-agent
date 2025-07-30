"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot } from "lucide-react"
import { MessageList } from "./message-list"
import { MessageInput } from "./message-input"
import { useChat } from "@/components/providers/chat-provider"

export function ChatInterface() {
  const { state } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [state.messages, state.typingMessage])

  return (
    <div className="flex-1 flex justify-center p-4">
      <Card className="w-full max-w-4xl h-[calc(100vh-120px)] flex flex-col bg-card/50 backdrop-blur border-border/50">
        <CardHeader className="pb-4 border-b border-border/50">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>AI Support Chat</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <MessageList />
          <div ref={messagesEndRef} />
          <MessageInput />
        </CardContent>
      </Card>
    </div>
  )
}
