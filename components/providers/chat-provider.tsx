"use client"

import type React from "react"
import { createContext, useContext, useReducer, useCallback } from "react"

// Types
export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isTyping?: boolean
  functionResults?: any
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  error: string | null
  typingMessage: string
  connectionStatus: "connected" | "connecting" | "disconnected"
}

type ChatAction =
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_TYPING_MESSAGE"; payload: string }
  | { type: "SET_CONNECTION_STATUS"; payload: ChatState["connectionStatus"] }
  | { type: "CLEAR_MESSAGES" }
  | { type: "UPDATE_LAST_MESSAGE"; payload: Partial<Message> }

// Initial state
const initialState: ChatState = {
  messages: [
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm Alex, your AI support agent. How can I assist you today?",
      timestamp: new Date(),
    },
  ],
  isLoading: false,
  error: null,
  typingMessage: "",
  connectionStatus: "connected",
}

// Reducer
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      }
    case "SET_TYPING_MESSAGE":
      return {
        ...state,
        typingMessage: action.payload,
      }
    case "SET_CONNECTION_STATUS":
      return {
        ...state,
        connectionStatus: action.payload,
      }
    case "CLEAR_MESSAGES":
      return {
        ...state,
        messages: initialState.messages,
      }
    case "UPDATE_LAST_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((msg, index) =>
          index === state.messages.length - 1 ? { ...msg, ...action.payload } : msg,
        ),
      }
    default:
      return state
  }
}

// Context
interface ChatContextType {
  state: ChatState
  dispatch: React.Dispatch<ChatAction>
  sendMessage: (content: string) => Promise<void>
  clearChat: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

// Helper: format time without seconds
function formatTimeNoSeconds(date: Date) {
  try {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  } catch {
    // Fallback if date is not a Date instance after hydration
    const d = new Date(date as any)
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }
}

// Provider
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)
  // Simple dedupe guard to avoid double-send within a short window
  const lastSentRef = (globalThis as any).__alex_last_sent_ref || { text: "", at: 0 }
  ;(globalThis as any).__alex_last_sent_ref = lastSentRef

  // Disable slow typing animation; keep simple instant reply
  const typeMessage = useCallback((text: string, callback: () => void) => {
    dispatch({ type: "SET_TYPING_MESSAGE", payload: "" })
    callback()
    return () => {}
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      const now = Date.now()
      const trimmed = (content || "").trim()
      if (!trimmed) return

      // If the same text was triggered very recently, ignore to prevent duplicate replies
      if (lastSentRef.text === trimmed && now - lastSentRef.at < 1500) {
        return
      }
      lastSentRef.text = trimmed
      lastSentRef.at = now

      // Add user message
      const userMessage: Message = {
        id: `user-${now}`,
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      }

      dispatch({ type: "ADD_MESSAGE", payload: userMessage })
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              ...state.messages.map((m) => ({ role: m.role, content: m.content })),
              { role: "user", content },
            ],
          }),
        })

        // Handle non-2xx early with optional JSON error parsing
        if (!response.ok) {
          let serverErr = ""
          try {
            const maybeJson = await response.json()
            serverErr = maybeJson?.response || maybeJson?.error || JSON.stringify(maybeJson)
          } catch {
            serverErr = await response.text()
          }
          throw new Error(serverErr || `HTTP error! status: ${response.status}`)
        }

        // Be robust to either JSON or plain text
        let assistantText = ""
        const ct = response.headers.get("content-type") || ""
        try {
          if (ct.includes("application/json")) {
            const data = await response.json()
            assistantText = (data?.response ?? data?.text ?? "").toString()
          } else {
            assistantText = (await response.text()) || ""
            // If text looks like JSON, try parse to extract response
            if (assistantText.trim().startsWith("{")) {
              try {
                const maybe = JSON.parse(assistantText)
                assistantText = (maybe?.response ?? assistantText).toString()
              } catch {
                // ignore parse error and keep raw text
              }
            }
          }
        } catch {
          // Final fallback
          assistantText = (await response.text()).toString()
        }

        const finalText =
          (assistantText && assistantText.trim()) ||
          "I apologize, but I didn't receive a proper response."

        // Append assistant message instantly
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: finalText,
          timestamp: new Date(),
        }
        dispatch({ type: "ADD_MESSAGE", payload: assistantMessage })
        dispatch({ type: "SET_LOADING", payload: false })
        dispatch({ type: "SET_TYPING_MESSAGE", payload: "" })
      } catch (error) {
        console.error("Chat error:", error)
        const errorText = "I apologize, but I encountered an error. Please try again in a moment."

        typeMessage(errorText, () => {
          const errorMessage: Message = {
            id: `error-${Date.now()}`,
            role: "assistant",
            content: errorText,
            timestamp: new Date(),
          }

          dispatch({ type: "ADD_MESSAGE", payload: errorMessage })
          dispatch({ type: "SET_LOADING", payload: false })
        })
      }
    },
    [state.messages, typeMessage],
  )

  const clearChat = useCallback(() => {
    dispatch({ type: "CLEAR_MESSAGES" })
  }, [])

  const value = {
    state,
    dispatch,
    sendMessage,
    clearChat,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

// Hook
export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
