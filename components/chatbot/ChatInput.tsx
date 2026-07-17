"use client";

import React, { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { useChat } from "./hooks/useChat";
import { VoiceRecorder } from "./VoiceRecorder";
import { clinicConfig } from "../../ai/config";

export const ChatInput: React.FC = () => {
  const [text, setText] = useState("");
  const { sendMessage, chatState } = useChat();
  const isLoading = chatState === "typing";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    sendMessage(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-3 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 shrink-0"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
        placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
        className="flex-1 px-3.5 py-2 text-sm bg-zinc-55 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent disabled:opacity-60 text-zinc-900 dark:text-zinc-100"
      />
      
      <VoiceRecorder />

      <button
        type="submit"
        disabled={!text.trim() || isLoading}
        className="p-2 rounded-lg text-white disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all duration-150 shrink-0 cursor-pointer"
        style={{ backgroundColor: clinicConfig.themeColor.primary }}
        title="Send message"
      >
        <SendHorizontal className="w-4.5 h-4.5" />
      </button>
    </form>
  );
};
export default ChatInput;
