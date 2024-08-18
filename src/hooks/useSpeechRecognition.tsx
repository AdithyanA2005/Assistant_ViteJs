import { useState, useRef } from "react";

interface UseSpeechRecognition {
  isListening: boolean;
  listen: () => Promise<string>;
  stopListening: () => void;
}

export function useSpeechRecognition(): UseSpeechRecognition {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const listen = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!recognitionRef.current) {
        recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognitionRef.current.lang = "en-US"; // Adjust language as needed
      }

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        resolve("");
      };

      recognitionRef.current.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        resolve(transcript); // Resolve the promise with the recognized text
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        reject(event.error);
      };

      recognitionRef.current.start();
    });
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return { isListening, listen, stopListening };
}
