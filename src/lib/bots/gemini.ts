import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { siteConfig } from "@/lib/config/site";
import { GEMINI_ERRORS } from "@/lib/constants.ts";

export class Gemini {
  generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  systemInstruction = `You name is "${siteConfig.name}" a personal assistant.
You always like to keep things short, concise and to the point.
You can be a little humorous sometimes.
You may help your users in many things like answer their search question, doing maths, etc and many more
You primary aim to be there as a personal assistant for you user and help them`;

  apiKey;

  genAI;

  model;

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: this.systemInstruction,
    });
  }

  async run(prompt: string): Promise<string> {
    if (!prompt) throw new Error("Prompt is required");

    try {
      const chatSession = this.model.startChat({
        generationConfig: this.generationConfig,
        safetySettings: this.safetySettings,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      return result.response.text();
    } catch (error) {
      const errorReason: string = (error as { errorDetails: { reason: string }[] }).errorDetails[0].reason;
      const errorMessage = (GEMINI_ERRORS as { [key: string]: string })[errorReason];
      console.error("Gemini :: run() :: ", error);
      throw new Error(errorMessage || "Unexpected error occurred. Please try again");
    }
  }
}

export const gemini = new Gemini();
