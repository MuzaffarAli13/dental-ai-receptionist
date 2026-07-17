import { useChatContext } from "../context/ChatContext";

export function useChat() {
  return useChatContext();
}
export type { Message, ChatState } from "../types";
