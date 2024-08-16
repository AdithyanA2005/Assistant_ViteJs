import { useChat } from "@/store/use-chat";
import { ChatSection } from "./chat-section";
import { ChatWelcome } from "./chat-welcome";
import { PromptForm } from "./prompt-form";

export function Home() {
  const { chats } = useChat();

  return (
    <main className="relative mx-auto min-h-[calc(100vh-3.5rem)] max-w-3xl pb-36 pt-8">
      {chats.length === 0 ? <ChatWelcome /> : <ChatSection />}

      <div className="fixed bottom-0 left-0 right-0 bg-background pb-4 pt-1">
        <div className="mx-auto max-w-3xl">
          <PromptForm />
        </div>
      </div>
    </main>
  );
}
