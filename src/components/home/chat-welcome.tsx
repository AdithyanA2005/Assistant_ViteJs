import { Logo } from "@/components/logo.tsx";
import { siteConfig } from "@/lib/config/site.ts";

export function ChatWelcome() {
  return (
    <div className="mt-[20vh] flex flex-col items-center justify-center">
      <Logo className="size-32" />
      <h1 className="text-center text-4xl font-bold">Welcome to the {siteConfig.name}</h1>
      <p className="mt-2 text-center text-lg">How can I help you today?</p>
    </div>
  );
}
