import type { Metadata } from "next"
import ChatPageClient from "./chat-page-client"

export const metadata: Metadata = {
  title: "Chat with Alex - AI Support",
  description: "Chat with Alex, your intelligent AI support agent",
}

export default function ChatPage() {
  return <ChatPageClient />
}
