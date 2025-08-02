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
    <div className="flex-1 flex justify-center p-0 sm:p-4">
      {/* Card now auto-fills available height from chat-shell grid.
          We avoid tying to viewport to prevent scroll conflicts. */}
      <Card
        className="w-full h-full flex flex-col sm:max-w-4xl shadow-lg sm:rounded-xl rounded-none"
        style={{
          // Blend onto wallpaper: subtle tint + blur + soft border
          background: "var(--chat-surface-effective)",
          backdropFilter: "blur(var(--chat-surface-blur))",
          borderColor: "color-mix(in oklab, var(--text) 10%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <CardHeader className="pb-4 border-b border-border/50">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>AI Support Chat</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Make the message area the only scroller inside the chat-shell */}
          <div className="flex-1 min-h-0 chat-scroll">
            <MessageList />
            <div ref={messagesEndRef} />
          </div>

          {/* Sticky input at the bottom of the screen/card */}
          <div
            className="sticky bottom-0 left-0 right-0 p-2 sm:p-3"
            style={{
              background: "var(--chat-surface-effective)",
              backdropFilter: "blur(var(--chat-surface-blur))",
              borderTop: "1px solid color-mix(in oklab, var(--text) 10%, transparent)",
            }}
          >
            <MessageInput />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
