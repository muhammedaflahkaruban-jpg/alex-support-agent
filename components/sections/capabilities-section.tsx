"use client"

import { motion } from "framer-motion"
import { Mail, Database, Activity, MessageSquare } from "lucide-react"

const capabilities = [
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email Integration",
    description: "Automated email responses and notifications",
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Database Lookup",
    description: "Real-time data retrieval from large datasets",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Status Monitoring",
    description: "Live system status and health checks",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Context Caching",
    description: "Optimized conversation memory for better responses",
  },
]

export function CapabilitiesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Advanced Capabilities
          </h2>
          <p className="text-xl text-muted-foreground">Multi-functional AI agent with enterprise integrations</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              className="p-6 border border-border/50 rounded-lg hover:shadow-md transition-all duration-300 bg-card/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-primary">{capability.icon}</div>
                <h3 className="font-semibold">{capability.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">{capability.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
