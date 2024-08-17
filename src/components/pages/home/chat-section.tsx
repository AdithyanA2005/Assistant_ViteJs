import { useChat } from "@/store/use-chat";
import { BotChatBubble, UserChatBubble } from "./chat-bubble";

export function ChatSection() {
  const { chats, isThinking } = useChat();

  return (
    <section className="flex flex-col gap-6">
      {chats.map((chat, index) => {
        if (chat.owner === "bot") return <BotChatBubble key={index} chat={chat} />;
        else return <UserChatBubble key={index} chat={chat} />;
      })}

      {isThinking ? <BotChatBubble.Skeleton /> : null}
    </section>
  );
}
