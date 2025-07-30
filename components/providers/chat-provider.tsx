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

// Provider
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  const typeMessage = useCallback((text: string, callback: () => void) => {
    let index = 0
    dispatch({ type: "SET_TYPING_MESSAGE", payload: "" })

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        dispatch({ type: "SET_TYPING_MESSAGE", payload: text.slice(0, index + 1) })
        index++
      } else {
        clearInterval(typeInterval)
        dispatch({ type: "SET_TYPING_MESSAGE", payload: "" })
        callback()
      }
    }, 20) // Optimized for performance

    return () => clearInterval(typeInterval)
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      // Add user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
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
            message: content,
            history: state.messages,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`)
        }

        const responseText = data.response || "I apologize, but I didn't receive a proper response."

        // Type the response with animation
        typeMessage(responseText, () => {
          const assistantMessage: Message = {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: responseText,
            timestamp: new Date(),
            functionResults: data.functionResults,
          }

          dispatch({ type: "ADD_MESSAGE", payload: assistantMessage })
          dispatch({ type: "SET_LOADING", payload: false })
        })
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
