"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface CompanyData {
  companyName: string
  ceoName: string
  features: string
  products: string
  services: string
  values: string
  tone: string
}

export function CompanyDataForm() {
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState<CompanyData>({
    companyName: "",
    ceoName: "",
    features: "",
    products: "",
    services: "",
    values: "",
    tone: "",
  })
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!authLoading && user) {
      fetchCompanyData()
    } else if (!authLoading && !user) {
      setLoading(false) // If no user, no data to fetch
    }
  }, [user, authLoading])

  const fetchCompanyData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/company-data?userId=${user?.uid}`)
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setFormData(data)
        }
      } else {
        console.error("Failed to fetch company data:", response.statusText)
      }
    } catch (error) {
      console.error("Error fetching company data:", error)
      toast({
        title: "Error",
        description: "Failed to load company data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save company data.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/company-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userId: user.uid }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Company data saved successfully!",
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save company data")
      }
    } catch (error: any) {
      console.error("Error saving company data:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save company data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || authLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Loading Company Data</CardTitle>
          <CardDescription>Please wait while we load your business configuration.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Configure Your Business Data</CardTitle>
        <CardDescription>Provide details about your company to personalize Alex's responses.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="e.g., Alex Solutions Pvt. Ltd."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ceoName">CEO Name (Optional)</Label>
            <Input id="ceoName" value={formData.ceoName} onChange={handleChange} placeholder="e.g., Mr. Alex" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="features">Key Features of Business (comma-separated)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="e.g., 24/7 support, real-time inventory, multi-language"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="products">Products (comma-separated)</Label>
            <Textarea
              id="products"
              value={formData.products}
              onChange={handleChange}
              placeholder="e.g., AI chatbots, custom software, web development"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="services">Services (comma-separated)</Label>
            <Textarea
              id="services"
              value={formData.services}
              onChange={handleChange}
              placeholder="e.g., customer support automation, lead generation"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="values">Core Values (comma-separated)</Label>
            <Textarea
              id="values"
              value={formData.values}
              onChange={handleChange}
              placeholder="e.g., customer satisfaction, innovation, affordability"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tone">Preferred Communication Tone</Label>
            <Input
              id="tone"
              value={formData.tone}
              onChange={handleChange}
              placeholder="e.g., professional, friendly, empathetic"
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Company Data"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
