import React from "react";
import { Message } from "./types";
import { clinicConfig } from "../../ai/config";
import { Mic } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isModel = message.role === "model";

  return (
    <div className={`flex gap-2.5 max-w-[85%] ${isModel ? "self-start" : "self-end flex-row-reverse"}`}>
      {isModel ? (
        <div
          className="flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-semibold select-none shadow-sm shrink-0"
          style={{ backgroundColor: clinicConfig.themeColor.primary }}
        >
          🦷
        </div>
      ) : (
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] shrink-0 font-medium">
          {message.isVoice ? <Mic className="w-3.5 h-3.5 text-teal-600" /> : "YOU"}
        </div>
      )}

      <div
        className={`px-3.5 py-2 rounded-2xl shadow-sm text-sm leading-relaxed ${
          isModel
            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-150 rounded-tl-none border border-zinc-200/50 dark:border-zinc-800/50"
            : "text-white rounded-tr-none"
        }`}
        style={{
          backgroundColor: isModel ? undefined : clinicConfig.themeColor.primary,
        }}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
};
export default MessageBubble;
