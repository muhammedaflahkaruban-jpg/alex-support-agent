import { MessageBubble } from "./message-bubble"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: string
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto">
      {messages.map((message) => (
        <MessageBubble key={message.id} text={message.text} sender={message.sender} timestamp={message.timestamp} />
      ))}
    </div>
  )
}
