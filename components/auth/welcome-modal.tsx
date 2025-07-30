"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function WelcomeModal() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (session && !localStorage.getItem("hasSeenWelcomeModal")) {
      setIsOpen(true)
    }
  }, [session])

  const handleClose = () => {
    localStorage.setItem("hasSeenWelcomeModal", "true")
    setIsOpen(false)
  }

  const handleGoToDashboard = () => {
    handleClose()
    router.push("/dashboard")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] p-6 text-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-primary">
            Welcome, {session?.user?.name || session?.user?.email || "User"}!
          </DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground mt-2">
            We're thrilled to have you join the Mr. Alex family.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-base text-foreground">
            Mr. Alex is your intelligent AI-powered customer support agent, ready to transform your business.
          </p>
          <p className="text-base text-foreground">
            To get started, we recommend configuring your business data in the dashboard. This will help Mr. Alex
            provide highly accurate and personalized support tailored to your company.
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
          <Button onClick={handleGoToDashboard} className="w-full sm:w-auto">
            Go to Dashboard
          </Button>
          <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto bg-transparent">
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
