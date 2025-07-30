"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import { NeuralAnimation } from "@/components/ui/neural-animation"

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bot className="h-8 w-8 text-primary" />
            <NeuralAnimation className="absolute -inset-2" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Alex AI
          </span>
        </div>
        <Link href="/chat">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Start Chat
          </Button>
        </Link>
      </div>
    </header>
  )
}
