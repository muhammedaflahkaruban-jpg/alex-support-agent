"use client"

import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageBubble } from "./message-bubble"
import { TypingIndicator } from "./typing-indicator"
import { useChat } from "@/components/providers/chat-provider"

export function MessageList() {
  const { state } = useChat()
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {state.messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: [0.4, 0.0, 0.2, 1],
            }}
          >
            <MessageBubble message={message} />
          </motion.div>
        ))}
      </AnimatePresence>

      {(state.isLoading || state.typingMessage) && <TypingIndicator />}
    </div>
  )
}
