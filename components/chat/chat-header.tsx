"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bot } from "lucide-react"
import { NeuralAnimation } from "@/components/ui/neural-animation"
import { useChat } from "@/components/providers/chat-provider"

export function ChatHeader() {
  const { state } = useChat()

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="hover:bg-muted">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bot className="h-6 w-6 text-primary" />
              <NeuralAnimation className="absolute -inset-1" size="sm" />
            </div>
            <span className="text-xl font-semibold">Chat with Alex</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              state.connectionStatus === "connected"
                ? "bg-green-500 animate-pulse"
                : state.connectionStatus === "connecting"
                  ? "bg-yellow-500 animate-pulse"
                  : "bg-red-500"
            }`}
          />
          <span className="text-sm text-muted-foreground capitalize">{state.connectionStatus}</span>
        </div>
      </div>
    </header>
  )
}
