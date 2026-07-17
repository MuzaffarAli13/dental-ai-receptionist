import React from "react";

interface QuickRepliesProps {
  onSelect: (reply: string) => void;
}

const DEFAULT_REPLIES = [
  "Book an appointment 🦷",
  "Working hours? 🕒",
  "Contact details 📞",
  "Is this an emergency? 🚨"
];

export const QuickReplies: React.FC<QuickRepliesProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 py-2 px-4 justify-start">
      {DEFAULT_REPLIES.map((reply) => (
        <button
          key={reply}
          onClick={() => onSelect(reply)}
          className="text-xs px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-teal-600 hover:text-teal-700 dark:hover:text-teal-400 dark:hover:border-teal-500 transition-colors shadow-sm duration-200 cursor-pointer"
        >
          {reply}
        </button>
      ))}
    </div>
  );
};
export default QuickReplies;
