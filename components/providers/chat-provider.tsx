"use client"

import type React from "react"
import { createContext, useContext, useCallback, useEffect } from "react"
import { useChat, type Message } from "ai/react"
import { useAuth } from "./auth-provider"
import { useToast } from "@/hooks/use-toast"

interface ChatContextType {
  messages: Message[]
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  error: Error | undefined
  append: (message: Message) => Promise<string | null | undefined>
  reload: () => Promise<string | null | undefined>
  stop: () => void
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  clearMessages: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function useChatContext() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider")
  }
  return context
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const { toast } = useToast()

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isLoading,
    error,
    append,
    reload,
    stop,
    setMessages,
  } = useChat({
    api: "/api/chat",
    body: {
      userId: user?.uid, // Pass userId to the API route
    },
    onError: (err) => {
      console.error("Chat error:", err)
      toast({
        title: "Chat Error",
        description: err.message || "An error occurred during the chat.",
        variant: "destructive",
      })
    },
  })

  // Custom handleSubmit to ensure userId is always passed
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!user?.uid) {
        toast({
          title: "Authentication Required",
          description: "Please log in to start chatting with Alex.",
          variant: "destructive",
        })
        return
      }
      originalHandleSubmit(e)
    },
    [originalHandleSubmit, user?.uid, toast],
  )

  const clearMessages = useCallback(() => {
    setMessages([])
    toast({
      title: "Chat Cleared",
      description: "Your conversation has been reset.",
    })
  }, [setMessages, toast])

  // Effect to handle initial messages or load from storage if needed
  useEffect(() => {
    // You could load previous messages from Firebase/Neon here if desired
    // For now, it starts fresh or uses messages from useChat hook
  }, [])

  const value = {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    append,
    reload,
    stop,
    setMessages,
    clearMessages,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
