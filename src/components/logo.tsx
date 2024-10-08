import { BotIcon } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

interface NavLogoProps {
  className?: string;
}

export function Logo({ className }: NavLogoProps) {
  return (
    <a
      href="/"
      className={cn(
        "group flex size-fit shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary md:text-base",
        className,
      )}
    >
      <BotIcon className="size-full transition-all group-hover:scale-110" />
      <span className="sr-only">{siteConfig.name}</span>
    </a>
  );
}
