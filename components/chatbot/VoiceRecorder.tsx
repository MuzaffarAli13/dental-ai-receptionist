"use client";

import React from "react";
import { Mic, Square } from "lucide-react";
import { useVoice } from "./hooks/useVoice";

export const VoiceRecorder: React.FC = () => {
  const { isListening, startListening, stopListening, isSupported } = useVoice();

  if (!isSupported) {
    return null; // Gracefully hide voice button if Web Speech API isn't supported
  }

  return (
    <button
      type="button"
      onClick={isListening ? stopListening : startListening}
      className={`p-2 rounded-lg transition-all duration-250 cursor-pointer shrink-0 ${
        isListening
          ? "bg-red-500 hover:bg-red-600 text-white animate-pulse shadow-md"
          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-200"
      }`}
      title={isListening ? "Stop listening" : "Talk with AI receptionist"}
    >
      {isListening ? <Square className="w-4.5 h-4.5" /> : <Mic className="w-4.5 h-4.5" />}
    </button>
  );
};
export default VoiceRecorder;
