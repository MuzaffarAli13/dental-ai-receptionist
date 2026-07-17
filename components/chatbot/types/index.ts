export interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

export type ChatState = "idle" | "typing" | "recording" | "speaking" | "error";
