import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Database, Globe, Zap } from "lucide-react"

export function CapabilitiesSection() {
  const capabilities = [
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "Intelligent AI Conversations",
      description: "Leverage Google Gemini 1.5 Flash for human-like, context-aware interactions.",
    },
    {
      icon: <Database className="h-8 w-8 text-primary" />,
      title: "Real-time Data Integration",
      description: "Seamlessly connect with your inventory, pricing, and customer data.",
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Multi-language Support",
      description: "Engage customers in English, Malayalam, and Hindi for broader reach.",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "24/7 Automated Support",
      description: "Provide instant assistance around the clock, reducing operational costs.",
    },
  ]

  return (
    <section className="py-12 md:py-20 bg-muted">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Core Capabilities</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
          Mr. Alex is built with cutting-edge technology to empower your business with smart, efficient, and scalable
          customer support.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((capability, index) => (
            <Card key={index} className="flex flex-col items-center p-6 text-center">
              <CardHeader className="pb-4">
                <div className="mb-4">{capability.icon}</div>
                <CardTitle className="text-xl font-semibold">{capability.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{capability.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
