// Simulated database service - replace with your actual database
interface DatabaseRecord {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
}

class DatabaseService {
  private data: DatabaseRecord[] = [
    {
      id: "1",
      title: "Getting Started Guide",
      content: "Welcome to our platform. Here's how to get started...",
      category: "documentation",
      tags: ["beginner", "setup", "guide"],
    },
    {
      id: "2",
      title: "API Documentation",
      content: "Complete API reference for developers...",
      category: "technical",
      tags: ["api", "development", "reference"],
    },
    {
      id: "3",
      title: "Troubleshooting Common Issues",
      content: "Solutions to frequently encountered problems...",
      category: "support",
      tags: ["troubleshooting", "issues", "solutions"],
    },
    {
      id: "4",
      title: "Billing and Pricing",
      content: "Information about our pricing plans and billing...",
      category: "billing",
      tags: ["pricing", "billing", "plans"],
    },
    {
      id: "5",
      title: "Security Best Practices",
      content: "How to keep your account and data secure...",
      category: "security",
      tags: ["security", "best-practices", "safety"],
    },
  ]

  async search(query: string): Promise<DatabaseRecord[]> {
    if (!query) return []

    const lowerQuery = query.toLowerCase()

    return this.data.filter(
      (record) =>
        record.title.toLowerCase().includes(lowerQuery) ||
        record.content.toLowerCase().includes(lowerQuery) ||
        record.category.toLowerCase().includes(lowerQuery) ||
        record.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    )
  }

  async getById(id: string): Promise<DatabaseRecord | null> {
    return this.data.find((record) => record.id === id) || null
  }

  async getByCategory(category: string): Promise<DatabaseRecord[]> {
    return this.data.filter((record) => record.category === category)
  }
}

export { DatabaseService, type DatabaseRecord }
