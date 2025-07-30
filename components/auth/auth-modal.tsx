"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Chrome, X, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })

  useEffect(() => {
    if (session) {
      onClose()
      router.push("/dashboard")
    }
  }, [session, onClose, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isSignUp) {
        // Sign up
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Signup failed")
        }

        toast.success("Account created successfully! Please sign in.")
        setIsSignUp(false)
        setFormData({ email: formData.email, password: "", name: "" })
      } else {
        // Sign in
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.error) {
          throw new Error("Invalid email or password")
        }

        toast.success("Signed in successfully!")
      }
    } catch (error) {
      toast.error("Authentication Error", {
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setLoading(true)
    try {
      await signIn(provider, { callbackUrl: "/dashboard" })
    } catch (error) {
      toast.error("Authentication Error", {
        description: "Failed to sign in with " + provider,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/skip", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to skip authentication")
      }

      // Create a mock session for testing
      toast.success("Skipped authentication for testing")
      onClose()
      router.push("/dashboard")
    } catch (error) {
      toast.error("Skip Error", {
        description: error instanceof Error ? error.message : "Failed to skip authentication",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="text-center relative">
          <Button variant="ghost" size="icon" className="absolute -top-2 -right-2 h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-2xl font-bold">{isSignUp ? "Create an Account" : "Sign In"}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isSignUp
              ? "Join Mr. Alex to manage your business support."
              : "Access your personalized AI agent dashboard."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={isSignUp}
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="mralex@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <div className="relative my-4">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
              OR
            </span>
          </div>

          <div className="grid gap-2">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleSocialSignIn("google")}
              disabled={loading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              {loading ? "Signing in..." : "Sign in with Google"}
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleSocialSignIn("github")}
              disabled={loading}
            >
              <Github className="mr-2 h-4 w-4" />
              {loading ? "Signing in..." : "Sign in with GitHub"}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground mt-4">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <Button variant="link" onClick={() => setIsSignUp(false)} className="p-0 h-auto">
                  Sign In
                </Button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <Button variant="link" onClick={() => setIsSignUp(true)} className="p-0 h-auto">
                  Sign Up
                </Button>
              </>
            )}
          </div>

          <Separator className="my-4" />

          <Button variant="secondary" onClick={handleSkip} disabled={loading} className="w-full">
            Skip Authentication (Testing)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
