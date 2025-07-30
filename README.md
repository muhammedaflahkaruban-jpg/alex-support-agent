# Mr. Alex - AI-Powered Customer Support Agent

Mr. Alex is an intelligent AI-powered customer support system designed to provide 24/7 automated customer service for small and medium businesses. It leverages Google's Gemini API for human-like conversations, real-time data management, and multi-language support.

## Features

-   **Intelligent Conversational AI**: Powered by Google Gemini 1.5 Flash for context-aware, human-like interactions.
-   **Dynamic Business Configuration**: Customize Alex's knowledge base with your company's data (products, services, CEO, etc.).
-   **Real-time Data Access**: Integrates with Firebase Firestore for real-time data and Neon PostgreSQL for structured business data.
-   **Multi-language Support**: Communicate in English, Malayalam, and Hindi.
-   **User Authentication**: Secure sign-in with Google, GitHub, and email/password via Firebase Authentication.
-   **Mobile-First Design**: Responsive and intuitive user interface across all devices.
-   **Analytics Dashboard**: Gain insights into conversation trends and agent performance.

## Getting Started

### 1. Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables. Replace the placeholder values with your actual credentials.

\`\`\`
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_FIREBASE_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_FIREBASE_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_FIREBASE_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_FIREBASE_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_FIREBASE_APP_ID"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="YOUR_FIREBASE_MEASUREMENT_ID"

# Google Gemini AI Configuration
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Neon PostgreSQL Database
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
\`\`\`

### 2. Install Dependencies

\`\`\`bash
pnpm install
\`\`\`

### 3. Database Setup

*   **Neon PostgreSQL**: Create a database on [Neon.tech](https://neon.tech) and copy your connection string to the `DATABASE_URL` in your `.env.local` file. The application will attempt to create the `company_data` table on first use.
*   **Firebase**: Set up a Firebase project. Enable Authentication (Email/Password, Google, GitHub providers). Copy your Firebase project configuration to the `NEXT_PUBLIC_FIREBASE_` variables in `.env.local`.

### 4. Run the Development Server

\`\`\`bash
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

-   `app/`: Next.js App Router pages and API routes.
    -   `api/chat/route.ts`: API endpoint for AI chat interactions.
    -   `api/company-data/route.ts`: API endpoint for saving/fetching business configuration.
    -   `chat/`: Chat interface page.
    -   `dashboard/`: User dashboard for business configuration.
-   `components/`: Reusable React components.
    -   `auth/`: Authentication-related components (modals, protected routes).
    -   `business-config/`: Form for company data input.
    -   `chat/`: Chat UI components (header, message list, input, bubbles, typing indicator).
    -   `layout/`: Header component.
    -   `providers/`: Context providers (Auth, Chat, Theme).
    -   `sections/`: Landing page sections (Hero, Features, CTA, Capabilities).
    -   `ui/`: shadcn/ui components.
-   `lib/`: Utility functions and service integrations.
    -   `firebase.ts`: Firebase initialization and client.
    -   `neon-db.ts`: Neon PostgreSQL database client and functions.
    -   `ai-prompt-generator.ts`: Logic for dynamically generating AI prompts.
    -   `utils.ts`: General utility functions.
-   `public/`: Static assets.
-   `styles/`: Global CSS.

## Deployment

This application is designed for seamless deployment on [Vercel](https://vercel.com). Ensure your environment variables are configured in your Vercel project settings for production deployments.

## Contributing

Feel free to fork the repository, open issues, and submit pull requests.

## License

[MIT License](LICENSE)
