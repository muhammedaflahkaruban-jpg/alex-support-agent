"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2 } from "lucide-react"
import { useChat } from "@/components/providers/chat-provider"

const quickSuggestions = [
  "What can you help me with?",
  "Check system status",
  "Search documentation",
  "Contact support",
]

export function MessageInput() {
  const { state, sendMessage } = useChat()
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus input when loading completes
  useEffect(() => {
    if (!state.isLoading && inputRef.current) {
      inputRef.current.focus()
    }
  }, [state.isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || state.isLoading) return

    const message = input.trim()
    setInput("")
    await sendMessage(message)
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (state.isLoading) return
    setInput(suggestion)
    inputRef.current?.focus()
  }

  return (
    <motion.div
      className="p-6 border-t border-border/50 bg-background/50 backdrop-blur-sm"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={state.isLoading}
              className="pr-12 py-3 text-base bg-background/50 border-border/50 focus:border-primary focus:ring-primary rounded-xl backdrop-blur-sm"
              autoFocus
            />
            {input && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Button
                  type="submit"
                  size="sm"
                  disabled={state.isLoading || !input.trim()}
                  className="rounded-full w-8 h-8 p-0 bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </div>
          {!input && (
            <Button
              type="submit"
              disabled={state.isLoading || !input.trim()}
              className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-xl"
            >
              {state.isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          {quickSuggestions.map((suggestion, index) => (
            <motion.button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 text-xs bg-muted/50 hover:bg-muted border border-border/50 rounded-full transition-colors backdrop-blur-sm"
              disabled={state.isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      </form>
    </motion.div>
  )
}
