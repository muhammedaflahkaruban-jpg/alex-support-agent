"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { AuthModal } from "@/components/auth/auth-modal"
import { WelcomeModal } from "@/components/auth/welcome-modal"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { CapabilitiesSection } from "@/components/sections/capabilities-section"
import { CTASection } from "@/components/sections/cta-section"
import { Header } from "@/components/layout/header"

export default function HomePage() {
  const { data: session, status } = useSession()
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    // Show auth modal if user is not authenticated and not loading
    if (status !== "loading" && !session) {
      setShowAuthModal(true)
    }
  }, [session, status])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CapabilitiesSection />
        <CTASection />
      </main>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <WelcomeModal />
    </div>
  )
}
