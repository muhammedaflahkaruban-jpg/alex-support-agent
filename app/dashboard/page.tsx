"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/providers/auth-provider"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { CompanyDataForm } from "@/components/business-config/company-data-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Settings, MessageSquare, BarChart3, TestTube, User, Building2, Zap, CheckCircle } from "lucide-react"
import Link from "next/link"
import type { CompanyData } from "@/lib/neon-db"
import { MessageCircle } from "lucide-react"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const { toast } = useToast()
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isConfigured, setIsConfigured] = useState(false)

  useEffect(() => {
    if (user) {
      fetchCompanyData()
    }
  }, [user])

  const fetchCompanyData = async () => {
    try {
      const response = await fetch(`/api/company-data?userId=${user?.uid}`)
      const result = await response.json()

      if (result.success && result.data) {
        setCompanyData(result.data)
        setIsConfigured(true)
      }
    } catch (error) {
      console.error("Error fetching company data:", error)
    }
  }

  const handleSaveCompanyData = async (data: CompanyData) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/company-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          user_id: user?.uid,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setCompanyData(result.data)
        setIsConfigured(true)
        toast({
          title: "Success!",
          description: "Your business configuration has been saved. Alex is now personalized for your business!",
        })
      } else {
        throw new Error(result.error || "Failed to save data")
      }
    } catch (error) {
      console.error("Error saving company data:", error)
      toast({
        title: "Error",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Loading dashboard...</div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                  <User className="h-8 w-8 text-primary" />
                  Welcome, {user?.displayName || "Business Owner"}
                </h1>
                <p className="text-muted-foreground mt-2">Configure and manage your AI support agent</p>
              </div>
              {isConfigured && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Alex Configured
                  </Badge>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <Link href="/chat">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/20 hover:border-primary/40">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Test Alex</h3>
                  <p className="text-sm text-muted-foreground">Try your personalized AI agent</p>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer opacity-75">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Analytics</h3>
                <p className="text-sm text-muted-foreground">Coming Soon</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer opacity-75">
              <CardContent className="p-6 text-center">
                <Zap className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold mb-2">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">Coming Soon</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Tabs defaultValue="configure" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
                <TabsTrigger value="configure" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configure
                </TabsTrigger>
                <TabsTrigger value="test" className="flex items-center gap-2">
                  <TestTube className="h-4 w-4" />
                  Test Alex
                </TabsTrigger>
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Overview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="configure">
                <CompanyDataForm onSubmit={handleSaveCompanyData} initialData={companyData} isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="test">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TestTube className="h-5 w-5" />
                      Test Your AI Agent
                    </CardTitle>
                    <CardDescription>
                      {isConfigured
                        ? "Alex is configured with your business data. Test how he responds to customer inquiries."
                        : "Configure your business data first to enable personalized responses."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isConfigured ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-green-800 font-medium">✅ Alex is ready!</p>
                          <p className="text-green-700 text-sm mt-1">
                            Your AI agent is configured for {companyData?.company_name} with{" "}
                            {companyData?.tone_of_voice} tone.
                          </p>
                        </div>
                        <Link href="/chat">
                          <Button size="lg" className="w-full">
                            <MessageSquare className="h-5 w-5 mr-2" />
                            Start Testing Alex
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-yellow-800 font-medium">⚠️ Configuration Required</p>
                          <p className="text-yellow-700 text-sm mt-1">
                            Please configure your business data first to enable personalized AI responses.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full bg-transparent"
                          onClick={() => {
                            const configureTab = document.querySelector('[value="configure"]') as HTMLElement
                            configureTab?.click()
                          }}
                        >
                          <Settings className="h-5 w-5 mr-2" />
                          Configure Business Data
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {companyData ? (
                        <>
                          <div>
                            <p className="text-sm text-muted-foreground">Company</p>
                            <p className="font-medium">{companyData.company_name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">CEO/Owner</p>
                            <p className="font-medium">{companyData.ceo_name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Business Type</p>
                            <p className="font-medium">{companyData.business_type}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-medium">{companyData.location || "Not specified"}</p>
                          </div>
                        </>
                      ) : (
                        <p className="text-muted-foreground">No business data configured yet.</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>AI Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {companyData ? (
                        <>
                          <div>
                            <p className="text-sm text-muted-foreground">Tone of Voice</p>
                            <Badge variant="secondary">{companyData.tone_of_voice}</Badge>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Languages</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {companyData.languages.map((lang, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Products</p>
                            <p className="text-sm">{companyData.products.length} configured</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Services</p>
                            <p className="text-sm">{companyData.services.length} configured</p>
                          </div>
                        </>
                      ) : (
                        <p className="text-muted-foreground">Configure your business data to see AI settings.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
      <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Welcome to Your Alex AI Dashboard, {user?.displayName || user?.email}!
        </h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Company Data Configuration */}
          <CompanyDataForm />

          {/* Test with Your Data / Chat Section */}
          <Card className="bg-slate-800 border-slate-700 text-white shadow-lg">
            <CardHeader>
              <CardTitle>Test Alex with Your Data</CardTitle>
              <CardDescription>
                Once you've configured your business data, click below to chat with Alex and see how he responds with
                your personalized information.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="text-center text-gray-300 mb-4">
                Experience your AI agent in action, tailored to your company's needs.
              </p>
              <Button
                asChild
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Link href="/chat">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Chatting with Alex
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
