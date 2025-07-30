"use client"

import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"
import type { Message } from "@/components/providers/chat-provider"
import { NeuralAnimation } from "@/components/ui/neural-animation"

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex items-start space-x-4 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
      <motion.div
        className={`relative p-3 rounded-full ${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        {!isUser && <NeuralAnimation className="absolute -inset-1" size="sm" />}
      </motion.div>

      <div className={`max-w-[75%] ${isUser ? "text-right" : "text-left"}`}>
        <motion.div
          className={`p-4 rounded-2xl backdrop-blur-sm ${
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md shadow-lg"
              : "bg-card/80 border border-border/50 rounded-bl-md shadow-sm"
          }`}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </motion.div>
        <span className={`text-xs text-muted-foreground mt-2 block ${isUser ? "text-right" : "text-left"}`}>
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  )
}
