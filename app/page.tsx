import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Alex AI - Intelligent Support Agent",
  description: "Advanced AI-powered support system with enterprise-grade reliability",
}

export default function HomePage() {
  return <ClientPage />
}
