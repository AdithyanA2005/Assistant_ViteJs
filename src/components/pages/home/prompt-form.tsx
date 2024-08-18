import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MicIcon, SendHorizontal, SquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast.ts";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition.tsx";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis.tsx";
import { gemini } from "@/lib/bots/gemini";
import { cn } from "@/lib/utils.ts";
import { useChat } from "@/store/use-chat";

export function PromptForm() {
  const [prompt, setPrompt] = useState<string>("");
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  const { speak } = useSpeechSynthesis();
  const { isListening, listen, stopListening } = useSpeechRecognition();
  const { addUserChat, addBotChat, setIsThinking, isThinking } = useChat();

  // Function to send user input to the bot and receive a response and add both to the chat
  const takeAction = async (query: string) => {
    setIsThinking(true);
    addUserChat(query);

    try {
      const response = await gemini.run(query);
      addBotChat(response);
      speak(response).catch((error) => {
        console.error("Speech synthesis error:", error);
        toast({
          variant: "destructive",
          title: "Speech Synthesis Error",
          description: "An error occurred during speech synthesis. Please try again later.",
        });
      });
    } catch {
      addBotChat("Something went wrong", "failure");
    } finally {
      setIsThinking(false);
    }
  };

  // Function to handle input change
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrompt(value);
  };

  // Function to handle form submission
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPrompt("");
    await takeAction(prompt);
  };

  // Function to handle voice button click
  const onVoiceClick = async () => {
    if (isListening) {
      stopListening();
      return;
    }

    try {
      const recognizedText = await listen();
      await takeAction(recognizedText);
    } catch (error) {
      console.error("Speech recognition error:", (error as { message: string }).message);
      toast({
        variant: "destructive",
        title: "Speech Recognition Error",
        description: "An error occurred during speech recognition. Please try again later.",
      });
    }
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

      <Button
        disabled={isThinking}
        onClick={onVoiceClick}
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "size-12 rounded-full",
          isListening
            ? "bg-accent-foreground/80 text-primary-foreground hover:bg-accent-foreground hover:text-primary-foreground"
            : "text-primary",
        )}
      >
        {isListening ? <SquareIcon className="size-5" /> : <MicIcon className="h-6 w-6" />}
      </Button>
    </form>
  );
}
