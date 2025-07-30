"use client"
import { Clock, Globe, Zap, DollarSign, MessageSquare, Mail, Database, Activity } from "lucide-react"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { CapabilitiesSection } from "@/components/sections/capabilities-section"
import { CTASection } from "@/components/sections/cta-section"
import { Header } from "@/components/layout/header"

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

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection features={features} />
        <CapabilitiesSection capabilities={capabilities} />
        <CTASection />
      </main>
    </div>
  )
}
