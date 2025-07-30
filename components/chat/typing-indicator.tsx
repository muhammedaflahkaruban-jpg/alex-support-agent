"use client"

import { motion } from "framer-motion"
import { useChat } from "@/components/providers/chat-provider"

export function TypingIndicator() {
  const { state } = useChat()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-2 p-4 justify-start"
    >
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
      </div>
      <span className="text-sm text-muted-foreground">Mr. Alex is typing...</span>
    </motion.div>
  )
}
