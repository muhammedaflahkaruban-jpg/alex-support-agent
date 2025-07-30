"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Globe, Zap, DollarSign } from "lucide-react"

const features = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "24/7 Support",
    description: "Round-the-clock assistance powered by advanced AI technology",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Multi-Language Support",
    description: "Communicate in over 100 languages with native-level understanding",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Intelligent Responses",
    description: "Context-aware conversations with advanced reasoning capabilities",
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Cost-Effective",
    description: "Optimized for efficiency with minimal resource consumption",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Core Features
          </h2>
          <p className="text-xl text-muted-foreground">
            Built with cutting-edge AI technology for superior performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-border/50 hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm h-full">
                <CardHeader>
                  <div className="mb-2 text-primary">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
