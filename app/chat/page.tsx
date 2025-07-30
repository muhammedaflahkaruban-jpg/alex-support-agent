import { ChatInterface } from "@/components/chat/chat-interface"
import { ChatProvider } from "@/components/providers/chat-provider"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Header } from "@/components/layout/header"

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <ChatProvider>
        <div className="flex flex-col h-screen bg-background">
          <Header />
          <main className="flex-1 overflow-hidden">
            <ChatInterface />
          </main>
        </div>
      </ChatProvider>
    </ProtectedRoute>
  )
}
