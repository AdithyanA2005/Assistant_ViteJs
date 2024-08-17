import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { IChat } from "@/lib/types.ts";
import { cn } from "@/lib/utils.ts";

interface BotChatBubbleProps {
  chat: IChat;
}
interface UserChatBubbleProps {
  chat: IChat;
}

export function BotChatBubble({ chat }: BotChatBubbleProps) {
  return (
    <div className="flex justify-start gap-2">
      <Avatar className="size-8">
        <AvatarImage src="/bot.png" alt="bot" />
        <AvatarFallback className="text-xs font-semibold">Bot</AvatarFallback>
      </Avatar>

      <div className="max-w-[90%]">
        <p
          className={cn(
            "text-md",
            chat.status === "failure" && "rounded-xl border border-red-500 px-4 py-1.5 text-red-500",
          )}
        >
          {chat.text}
        </p>
      </div>
    </div>
  );
}

BotChatBubble.Skeleton = function BotChatBubbleSkeleton() {
  return (
    <div className="flex justify-start gap-2">
      <Avatar className="size-8">
        <AvatarImage src="/bot.png" className="animate-pulse" alt="bot" />
        <AvatarFallback className="text-xs font-semibold">Bot</AvatarFallback>
      </Avatar>

      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export function UserChatBubble({ chat }: UserChatBubbleProps) {
  return (
    <div className={"flex justify-end gap-2"}>
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2",
          chat.status === "success" ? "bg-secondary" : "bg-red-900/40 text-red-500 filter backdrop-blur-3xl",
        )}
      >
        <p className="text-md">{chat.text}</p>
      </div>
    </div>
  );
}
