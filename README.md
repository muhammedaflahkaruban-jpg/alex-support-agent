# Alex AI Agent - Intelligent Support System

A comprehensive AI-powered support agent built with Next.js, Gemini AI, and enterprise-grade optimizations.

## Features

- **24/7 AI Support**: Powered by Google's Gemini AI
- **Multi-Language Support**: Communicate in 100+ languages
- **Context Caching**: Optimized response caching for better performance
- **Multi-Function Integration**: Email, database lookup, status monitoring
- **Real-time Chat Interface**: Responsive and intuitive UI
- **Cost-Optimized**: Efficient API usage and caching strategies

## Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Copy environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. Configure your environment variables:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `SMTP_*`: Email configuration for nodemailer
   - `DATABASE_URL`: Database connection (optional)

5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Architecture

### Core Components

- **Chat Interface**: Real-time chat with Alex AI
- **API Optimization**: Context caching and efficient request handling
- **Multi-Function Support**: Integrated email, database, and status services
- **Responsive Design**: Black and white theme with professional styling

### Optimization Features

1. **Context Caching**: Reduces API calls and improves response times
2. **Function Triggers**: Intelligent detection of user intent for multi-function execution
3. **Efficient Memory Management**: Optimized conversation history handling
4. **Cost Control**: Minimal thinking budget and optimized model usage

### Services

- **Email Service**: Automated email notifications using nodemailer
- **Database Service**: Fast lookup and search capabilities
- **Status Service**: Real-time system health monitoring
- **Cache Service**: In-memory caching with TTL support

## Usage

1. Visit the landing page to learn about Alex's capabilities
2. Click "Start Chat" to begin a conversation
3. Ask questions or request assistance
4. Alex will automatically trigger relevant functions based on your queries

## Deployment

1. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`

2. Deploy to your preferred platform (Vercel, AWS, etc.)
3. Configure production environment variables
4. Set up external services (Redis for caching, database, email provider)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
