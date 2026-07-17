"use client";

import React from "react";
import { Volume2, VolumeX, RotateCcw, X, Sparkles } from "lucide-react";
import { useChat } from "./hooks/useChat";
import { clinicConfig } from "../../ai/config";

export const ChatHeader: React.FC = () => {
  const { setIsOpen, isVoiceEnabled, setIsVoiceEnabled, clearChat } = useChat();

  return (
    <div
      className="flex items-center justify-between px-4 py-3 border-b border-white/10 text-white rounded-t-2xl shadow-sm shrink-0"
      style={{ backgroundColor: clinicConfig.themeColor.primary }}
    >
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 shadow-inner">
          <Sparkles className="w-4.5 h-4.5 text-amber-300 animate-pulse" />
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border-2 border-teal-800" />
        </div>
        <div>
          <h3 className="font-semibold text-xs leading-none sm:text-sm">{clinicConfig.clinicName}</h3>
          <p className="text-[10px] text-teal-100/80 leading-none mt-1">
            Virtual Receptionist
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-teal-100 hover:text-white"
          title={isVoiceEnabled ? "Mute voice readout" : "Enable voice readout"}
        >
          {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-teal-200/60" />}
        </button>

        <button
          onClick={clearChat}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-teal-100 hover:text-white"
          title="Restart booking conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-teal-100 hover:text-white md:hidden"
          title="Close chat window"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
