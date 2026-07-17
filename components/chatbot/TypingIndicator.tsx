import React from "react";
import LoadingDots from "./LoadingDots";
import { clinicConfig } from "../../ai/config";

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 justify-start items-end max-w-[85%] animate-fade-in">
      <div
        className="flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-semibold select-none shadow-sm shrink-0"
        style={{ backgroundColor: clinicConfig.themeColor.primary }}
      >
        🦷
      </div>
      <div className="px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-none shadow-sm">
        <LoadingDots />
      </div>
    </div>
  );
};
export default TypingIndicator;
