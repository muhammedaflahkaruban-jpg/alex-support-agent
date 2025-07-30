import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-12 md:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Customer Support?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join the growing number of businesses leveraging Mr. Alex to provide exceptional, automated customer service.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="secondary" size="lg">
            <Link href="/chat">Start Chatting Now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            <Link href="/dashboard">Configure Your Business</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
