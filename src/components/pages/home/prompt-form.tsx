import { FormEvent } from "react";
import { MicIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PromptForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: implement form submission
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Input
        placeholder="Type a message"
        className="text-md mx-auto h-14 rounded-3xl border border-accent-foreground/20 bg-primary-foreground px-6 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button variant="ghost" size="icon" className="absolute right-3 top-1/2 size-11 -translate-y-1/2 rounded-xl">
        <MicIcon className="h-6 w-6 text-primary" />
      </Button>
    </form>
  );
}
