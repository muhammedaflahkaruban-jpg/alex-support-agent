"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NeuralAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  numParticles?: number
  particleColor?: string
  lineColor?: string
  particleSize?: number
  lineThickness?: number
  speed?: number
}

export function NeuralAnimation({
  numParticles = 50,
  particleColor = "hsl(var(--primary))",
  lineColor = "hsl(var(--primary) / 0.2)",
  particleSize = 2,
  lineThickness = 1,
  speed = 0.5,
  className,
  ...props
}: NeuralAnimationProps) {
  const particles = Array.from({ length: numParticles }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
  }))

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)} {...props}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: particleSize,
            height: particleSize,
            backgroundColor: particleColor,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            x: [p.x, p.x + p.vx * 100, p.x],
            y: [p.y, p.y + p.vy * 100, p.y],
          }}
          transition={{
            duration: 20 / speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
      {particles.map((p1) =>
        particles.map((p2) => {
          const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
          if (distance < 15) {
            // Only draw lines for close particles
            return (
              <motion.div
                key={`${p1.id}-${p2.id}`}
                className="absolute origin-top-left"
                style={{
                  width: distance * 10 + "%", // Scale line length
                  height: lineThickness,
                  backgroundColor: lineColor,
                  left: `${p1.x}%`,
                  top: `${p1.y}%`,
                  rotate: Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI),
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )
          }
          return null
        }),
      )}
    </div>
  )
}
