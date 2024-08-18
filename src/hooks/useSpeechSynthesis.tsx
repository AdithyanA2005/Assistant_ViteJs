import { useState, useRef, useEffect } from "react";
import emojiReg from "emoji-regex";

interface UseSpeechSynthesis {
  isSpeaking: boolean;
  speak: (text: string) => Promise<void>;
  stopSpeaking: () => void;
}

export function useSpeechSynthesis(): UseSpeechSynthesis {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Cancel any existing speech synthesis when user clicks on screen
  useEffect(() => {
    window.addEventListener("click", stopSpeaking);
    return () => {
      window.removeEventListener("click", stopSpeaking);
    };
  }, []);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const speak = (text: string): Promise<void> => {
    // Clean the text (remove emojis and brackets)
    const cleanedText = text
      .replace(emojiReg(), "") // Remove emojis
      .replace(/[[\]{}]/g, ""); // Remove brackets;

    return new Promise((resolve, reject) => {
      if (!utteranceRef.current) {
        utteranceRef.current = new SpeechSynthesisUtterance();
        utteranceRef.current.rate = 1.0; // Adjust rate as needed
        utteranceRef.current.pitch = 1.0; // Adjust pitch as needed

        // Select voice - My preferred voices are (Samantha, 0) or (Aaron, 1) or (Nicky, 93) or (Google Hindi, 164)
        const voices = speechSynthesis.getVoices();
        utteranceRef.current.voice = voices[1];
      }

      utteranceRef.current.onstart = () => {
        setIsSpeaking(true);
      };

      utteranceRef.current.onend = () => {
        setIsSpeaking(false);
        resolve();
      };

      utteranceRef.current.onerror = (event) => {
        setIsSpeaking(false);
        reject(event.error);
      };

      utteranceRef.current.text = cleanedText;
      window.speechSynthesis.speak(utteranceRef.current);
    });
  };

  return { isSpeaking, speak, stopSpeaking };
}
