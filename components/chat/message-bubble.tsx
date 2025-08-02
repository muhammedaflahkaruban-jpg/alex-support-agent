"use client"

import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"
import type { Message } from "@/components/providers/chat-provider"
import { NeuralAnimation } from "@/components/ui/neural-animation"
import React from "react"

// Lightweight Markdown renderer for basic formatting
function renderMarkdown(text: string) {
  // Escape HTML thoroughly
  let safe = text.replaceAll("&", "&").replaceAll("<", "<").replaceAll(">", ">")

  // Code fences using split to avoid complex backreference issues
  const parts = safe.split("```")
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = `<pre class="markdown-pre"><code>${parts[i]}</code></pre>`
  }
  safe = parts.join("")

  // Inline code
  safe = safe.replace(/`([^`\n]+)`/g, '<code class="markdown-code">$1</code>')

  // Bold / Italic
  safe = safe.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  safe = safe.replace(/\*([^*]+)\*/g, "<em>$1</em>")
  safe = safe.replace(/__([^_]+)__/g, "<strong>$1</strong>")
  safe = safe.replace(/_([^_]+)_/g, "<em>$1</em>")

  // Headings
  safe = safe.replace(/^######\s(.+)$/gm, "<h6>$1</h6>")
  safe = safe.replace(/^#####\s(.+)$/gm, "<h5>$1</h5>")
  safe = safe.replace(/^####\s(.+)$/gm, "<h4>$1</h4>")
  safe = safe.replace(/^###\s(.+)$/gm, "<h3>$1</h3>")
  safe = safe.replace(/^##\s(.+)$/gm, "<h2>$1</h2>")
  safe = safe.replace(/^#\s(.+)$/gm, "<h1>$1</h1>")

  // Lists (simple bullets)
  safe = safe.replace(/^\s*[-*]\s+(.+)$/gm, "<p>• $1</p>")

  // Links [text](url) — simpler pattern to avoid TS parse issues with parentheses
  safe = safe.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_m: string, label: string, url: string) => {
    return '<a class=\'markdown-link\' href=\'' + url + '\' target=\'_blank\' rel=\'noreferrer\'>' + label + '</a>'
  })

  // Paragraphs and breaks
  safe = safe
    .split(/\n\n+/)
    .map((para) => "<p>" + para.replace(/\n/g, "<br/>") + "</p>")
    .join("")

  return { __html: safe }
}

function formatTimeNoSeconds(date: Date) {
  try {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  } catch {
    const d = new Date(date as any)
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }
}

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

      <div className={`max-w-[75%] ${isUser ? "text-right" : "text-left"} space-y-2`}>
        <motion.div
          className={`p-4 rounded-2xl backdrop-blur-sm ${
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md shadow-lg"
              : "bg-card/80 border border-border/50 rounded-bl-md shadow-sm"
          }`}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div
            className={`prose prose-sm dark:prose-invert max-w-none prose-pre:bg-background/80 prose-pre:border prose-pre:border-border/50 prose-code:bg-muted/60 prose-code:px-1 prose-code:py-0.5 prose-code:rounded [--tw-prose-bullets:theme(colors.muted.DEFAULT)]`}
            dangerouslySetInnerHTML={renderMarkdown(message.content)}
          />
        </motion.div>
        <span className={`text-xs text-muted-foreground mt-2 block ${isUser ? "text-right" : "text-left"}`}>
          {formatTimeNoSeconds(message.timestamp)}
        </span>
      </div>
    </div>
  )
}
