import { BotIcon } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

export function LoadingScreen() {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-background">
      <h1 className="text-4xl font-bold text-accent-foreground">{siteConfig.name}</h1>
      <div className="relative grid place-items-center">
        <BotIcon className="size-16" />
      </div>
    </div>
  );
}
