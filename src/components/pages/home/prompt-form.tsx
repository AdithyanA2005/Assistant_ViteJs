import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MicIcon, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gemini } from "@/lib/bots/gemini";
import { speak } from "@/lib/helpers/speech.ts";
import { useChat } from "@/store/use-chat";

export function PromptForm() {
  const { addUserChat, addBotChat, setIsThinking, isThinking } = useChat();

  const [prompt, setPrompt] = useState<string>("");
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrompt(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUserChat(prompt);
    setPrompt("");

    setIsThinking(true);
    gemini
      .run(prompt)
      .then((response) => {
        addBotChat(response);
        speak(response);
      })
      .catch(() => addBotChat("Something went wrong", "failure"))
      .finally(() => setIsThinking(false));
  };

  // Disable submit button when prompt is empty or bot is thinking
  useEffect(() => {
    setSubmitDisabled(prompt === "" || isThinking);
  }, [prompt, isThinking]);

  return (
    <form onSubmit={onSubmit} className="flex w-full items-center gap-2">
      <div className="relative flex-1">
        <Input
          value={prompt}
          onChange={onChange}
          placeholder="Type a message"
          className="text-md mx-auto h-12 rounded-3xl border border-accent-foreground/20 bg-primary-foreground px-6 pr-11 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          variant="ghost"
          disabled={submitDisabled}
          size="icon"
          className="absolute right-3 top-1/2 size-10 -translate-y-1/2 rounded-xl text-primary disabled:cursor-not-allowed disabled:text-secondary-foreground"
        >
          <SendHorizontal className="size-5" />
        </Button>
      </div>

      <Button variant="ghost" size="icon" className="size-12 rounded-full">
        <MicIcon className="h-6 w-6 text-primary" />
      </Button>
    </form>
  );
}
