import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-slate-950 to-slate-800 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Neural animation or subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black opacity-50" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-repeat opacity-10" />
      </div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none animate-fade-in-up">
              Mr. Alex: Your AI-Powered Customer Support Agent
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl animate-fade-in-up delay-200">
              Bridging the gap between affordable customer support and enterprise-grade AI for Indian MSMEs. From
              Kozhikode, with a legacy of building businesses, Alex is here to help you grow.
            </p>
          </div>
          <div className="space-x-4 animate-fade-in-up delay-400">
            <Button
              asChild
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Link href="/dashboard">
                <Sparkles className="mr-2 h-5 w-5" />
                Get Started
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-gray-400 text-gray-200 hover:bg-gray-800 hover:text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 bg-transparent"
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
