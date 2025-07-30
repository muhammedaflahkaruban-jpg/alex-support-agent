import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, DollarSign, Globe, Clock, Zap, BarChart } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-slate-900 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Unleash the Power of AI for Your Business
            </h2>
            <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Mr. Alex provides intelligent, automated customer support, helping you reduce costs, improve efficiency,
              and delight your customers.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full max-w-6xl">
            <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">24/7 Automation</CardTitle>
                <Bot className="h-6 w-6 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Provide instant support around the clock, without human intervention.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Cost Reduction</CardTitle>
                <DollarSign className="h-6 w-6 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Reduce operational costs by 70-80% compared to traditional support.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Multi-language Support</CardTitle>
                <Globe className="h-6 w-6 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">Communicate seamlessly in English, Malayalam, and Hindi.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Real-time Data Access</CardTitle>
                <Clock className="h-6 w-6 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Integrate live inventory and pricing information for accurate responses.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Scalability</CardTitle>
                <Zap className="h-6 w-6 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Handle multiple concurrent conversations efficiently, scaling with your business.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Analytics Dashboard</CardTitle>
                <BarChart className="h-6 w-6 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Gain insights into conversation trends and customer interactions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
