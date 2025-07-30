import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MessageBubbleProps {
  text: string
  sender: "user" | "ai"
  timestamp: string
}

export function MessageBubble({ text, sender, timestamp }: MessageBubbleProps) {
  const isUser = sender === "user"
  return (
    <div className={cn("flex items-end gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.jpg" alt="AI avatar" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3 text-sm shadow-md",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted text-muted-foreground rounded-bl-none",
        )}
      >
        <p>{text}</p>
        <span
          className={cn(
            "block text-xs mt-1",
            isUser ? "text-primary-foreground/80 text-right" : "text-muted-foreground/80 text-left",
          )}
        >
          {timestamp}
        </span>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={null || "/placeholder.svg"} alt="User avatar" /> {/* Placeholder for user avatar */}
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
