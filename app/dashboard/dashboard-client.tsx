"use client"

import { Skeleton } from "@/components/ui/skeleton"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/providers/auth-provider"
import { toast } from "sonner"
import { getCompanyData, saveCompanyData } from "@/lib/database-service"
import { Chart } from "@/components/ui/chart"
import { useRouter } from "next/navigation"

// Define a type for the form state
interface CompanyFormState {
  companyName: string
  ceoName: string
  businessFeatures: string
  products: string
  services: string
  values: string
  tone: string
  language: string
  alexBio: string
}

export default function DashboardClient() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState<CompanyFormState>({
    companyName: "",
    ceoName: "",
    businessFeatures: "",
    products: "",
    services: "",
    values: "",
    tone: "professional",
    language: "english",
    alexBio:
      "Mr. Alex is a 35-year-old AI agent from Kozhikode, Kerala. His parents built the successful Aflahdev company, instilling in him a deep understanding of business and customer service. He is dedicated to helping small and medium businesses thrive by providing intelligent and empathetic support.",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    if (!authLoading && user) {
      const fetchCompanyData = async () => {
        try {
          const data = await getCompanyData(user.uid)
          if (data) {
            setFormData({
              companyName: data.companyName || "",
              ceoName: data.ceoName || "",
              businessFeatures: data.businessFeatures || "",
              products: data.products || "",
              services: data.services || "",
              values: data.values || "",
              tone: data.tone || "professional",
              language: data.language || "english",
              alexBio:
                data.alexBio ||
                "Mr. Alex is a 35-year-old AI agent from Kozhikode, Kerala. His parents built the successful Aflahdev company, instilling in him a deep understanding of business and customer service. He is dedicated to helping small and medium businesses thrive by providing intelligent and empathetic support.",
            })
          }
        } catch (error) {
          toast.error("Error loading data", {
            description: "Failed to load your business data. Please try again.",
          })
          console.error("Failed to fetch company data:", error)
        } finally {
          setIsLoadingData(false)
        }
      }
      fetchCompanyData()
    } else if (!authLoading && !user) {
      // If not authenticated, redirect to home, ProtectedRoute will handle it
      router.push("/")
    }
  }, [user, authLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: keyof CompanyFormState) => (value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast.error("Authentication Required", {
        description: "Please sign in to save your business data.",
      })
      return
    }

    setIsSaving(true)
    try {
      await saveCompanyData(user.uid, formData)
      toast.success("Business Data Saved", {
        description: "Your company data has been successfully updated!",
      })
    } catch (error) {
      toast.error("Save Failed", {
        description: "There was an error saving your data. Please try again.",
      })
      console.error("Error saving company data:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (authLoading || isLoadingData) {
    return (
      <div className="flex flex-col h-screen p-4 space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Configuration Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Business Configuration</CardTitle>
            <CardDescription>Provide details about your business to customize Mr. Alex's responses.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g., Aflahdev Solutions"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ceoName">CEO Name</Label>
                <Input id="ceoName" value={formData.ceoName} onChange={handleChange} placeholder="e.g., Af1ah" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="businessFeatures">Key Business Features (comma-separated)</Label>
                <Textarea
                  id="businessFeatures"
                  value={formData.businessFeatures}
                  onChange={handleChange}
                  placeholder="e.g., 24/7 support, multi-language, real-time inventory"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="products">Products (comma-separated)</Label>
                <Textarea
                  id="products"
                  value={formData.products}
                  onChange={handleChange}
                  placeholder="e.g., AI Chatbot, CRM Integration, Analytics Dashboard"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="services">Services (comma-separated)</Label>
                <Textarea
                  id="services"
                  value={formData.services}
                  onChange={handleChange}
                  placeholder="e.g., Customer support automation, lead generation, data analysis"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="values">Company Values (comma-separated)</Label>
                <Textarea
                  id="values"
                  value={formData.values}
                  onChange={handleChange}
                  placeholder="e.g., Innovation, Customer Satisfaction, Integrity"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tone">Alex's Tone</Label>
                <Select value={formData.tone} onValueChange={handleSelectChange("tone")}>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="empathetic">Empathetic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">Alex's Primary Language</Label>
                <Select value={formData.language} onValueChange={handleSelectChange("language")}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="malayalam">Malayalam</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="alexBio">Alex's Bio</Label>
                <Textarea
                  id="alexBio"
                  value={formData.alexBio}
                  onChange={handleChange}
                  placeholder="e.g., Mr. Alex is a 35-year-old AI agent from Kozhikode..."
                  rows={5}
                />
              </div>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Configuration"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Analytics and Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics & Quick Actions</CardTitle>
            <CardDescription>Monitor performance and quickly test Mr. Alex.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Chart /> {/* Placeholder for actual chat analytics */}
            <div className="grid gap-2">
              <Button onClick={() => router.push("/chat")}>Test Mr. Alex Now</Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast.info("Feature coming soon!", { description: "WhatsApp integration is under development." })
                }
              >
                Integrate WhatsApp (Coming Soon)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
