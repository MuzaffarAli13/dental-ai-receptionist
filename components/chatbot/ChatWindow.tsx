"use client";

import React from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { QuickReplies } from "./QuickReplies";
import { ChatInput } from "./ChatInput";
import { useChat } from "./hooks/useChat";
import { motion, AnimatePresence } from "framer-motion";

export const ChatWindow: React.FC = () => {
  const { isOpen, sendMessage } = useChat();

  const handleQuickReplySelect = (replyText: string) => {
    sendMessage(replyText);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] max-h-[75vh] flex flex-col bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden"
        >
          <ChatHeader />

          <MessageList />

          <QuickReplies onSelect={handleQuickReplySelect} />

          <ChatInput />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ChatWindow;
