"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NeuralAnimationProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function NeuralAnimation({ className, size = "md" }: NeuralAnimationProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const dotSize = {
    sm: "w-1 h-1",
    md: "w-1.5 h-1.5",
    lg: "w-2 h-2",
  }

  return (
    <div className={cn("absolute inset-0 pointer-events-none", sizeClasses[size], className)}>
      {/* Neural network dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={cn("absolute bg-primary/30 rounded-full", dotSize[size])}
          style={{
            left: `${20 + (i % 3) * 30}%`,
            top: `${20 + Math.floor(i / 3) * 60}%`,
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {[
          { x1: 25, y1: 25, x2: 55, y2: 25 },
          { x1: 55, y1: 25, x2: 85, y2: 25 },
          { x1: 25, y1: 75, x2: 55, y2: 75 },
          { x1: 55, y1: 75, x2: 85, y2: 75 },
          { x1: 25, y1: 25, x2: 25, y2: 75 },
          { x1: 85, y1: 25, x2: 85, y2: 75 },
        ].map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-primary/20"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  )
}
