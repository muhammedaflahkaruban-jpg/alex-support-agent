"use client"

import { motion } from "framer-motion"
import { Bot } from "lucide-react"
import { useChat } from "@/components/providers/chat-provider"
import { NeuralAnimation } from "@/components/ui/neural-animation"

export function TypingIndicator() {
  const { state } = useChat()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-start space-x-4"
    >
      <motion.div
        className="relative p-3 rounded-full bg-muted text-muted-foreground"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Bot className="h-5 w-5" />
        <NeuralAnimation className="absolute -inset-1" size="sm" />
      </motion.div>
      <div className="max-w-[75%]">
        <motion.div
          className="p-4 rounded-2xl bg-card/80 border border-border/50 rounded-bl-md shadow-sm backdrop-blur-sm"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          {state.typingMessage ? (
            <p className="text-sm leading-relaxed">
              {state.typingMessage}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                className="ml-1 text-primary"
              >
                |
              </motion.span>
            </p>
          ) : (
            <div className="flex items-center space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
