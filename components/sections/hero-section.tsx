"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NeuralAnimation } from "@/components/ui/neural-animation"

export function HeroSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="container mx-auto text-center relative">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
            Powered by Gemini AI
          </Badge>
          <div className="relative inline-block mb-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Meet Alex
              <br />
              <span className="text-muted-foreground">Your Intelligent Support Agent</span>
            </h1>
            <NeuralAnimation className="absolute -top-4 -right-4" size="lg" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Advanced AI-powered support system designed to provide intelligent, multilingual assistance with
            enterprise-grade reliability and cost optimization.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/chat">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Try Alex Now
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-border hover:bg-muted bg-transparent">
            Learn More
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { value: "24/7", label: "Availability" },
            { value: "100+", label: "Languages" },
            { value: "99.9%", label: "Uptime" },
            { value: "< 1s", label: "Response Time" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
