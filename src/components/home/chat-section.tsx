import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useChat } from "@/store/use-chat";

export function ChatSection() {
  const { chats } = useChat();

  return (
    <section className="flex flex-col gap-6">
      {chats.map((chat, index) => (
        <div key={index} className={cn("flex justify-start gap-2", chat.owner === "user" && "flex-row-reverse")}>
          {chat.owner === "bot" ? (
            <Avatar className="size-8">
              <AvatarImage src="/bot.png" alt="bot" />
              <AvatarFallback className="text-xs font-semibold">Bot</AvatarFallback>
            </Avatar>
          ) : null}

          <div className={cn(chat.owner === "user" ? "max-w-[70%] rounded-2xl bg-secondary px-4 py-2" : "max-w-[90%]")}>
            <p className="text-md">{chat.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
