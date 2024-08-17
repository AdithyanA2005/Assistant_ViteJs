export const SUPPORTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const GEMINI_ERRORS = {
  INVALID_ARGUMENT: "The request body is malformed.",
  FAILED_PRECONDITION: "Gemini API free tier is not available in your country.",
  PERMISSION_DENIED: "Your API key doesn't have the required permissions.",
  NOT_FOUND: "The requested resource wasn't found.",
  RESOURCE_EXHAUSTED: "You've exceeded the rate limit.",
  INTERNAL: "An unexpected error occurred on Google's side.",
  UNAVAILABLE: "The service may be temporarily overloaded or down.",
} as const;
