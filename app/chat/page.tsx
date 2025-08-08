import type { Metadata } from "next";
import ChatPageClient from "./chat-page-client";

export const metadata: Metadata = {
  title: "Chat with Alex - AI Support",
  description: "Chat with Alex, your intelligent AI support agent",
};

// Make the component async so we can await searchParams
export default async function ChatPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const message =
    typeof resolvedParams?.message === "string"
      ? resolvedParams.message
      : undefined;

  return <ChatPageClient initialMessage={message} />;
}
