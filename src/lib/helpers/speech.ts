import emojiReg from "emoji-regex";
import { toast } from "@/components/ui/use-toast.ts";

export function speak(text: string) {
  // Check if browser supports speech synthesis
  if (!("speechSynthesis" in window)) return alert("Browser not compatible, Please update your browser.");

  // Cancel any existing speech synthesis when user clicks on screen
  window.addEventListener("click", () => speechSynthesis.cancel());

  // Clean the text before speaking (remove emojis)
  const cleanedText = text
    .replace(emojiReg(), "") // Remove emojis
    .replace(/[[\]{}]/g, ""); // Remove brackets;

  // Create a new speech synthesis utterance
  const utterance = new SpeechSynthesisUtterance(cleanedText);
  utterance.onerror = (event) => {
    console.error("Speech synthesis error:", event.error);
    toast({
      variant: "destructive",
      title: "Speech Synthesis Error",
      description: "An error occurred during speech synthesis. Please try again later.",
    });
  };

  // Select voice - My preferred voices are (Samantha, 0) or (Aaron, 1) or (Nicky, 93)
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[93];

  // Speak the text
  speechSynthesis.speak(utterance);
}
