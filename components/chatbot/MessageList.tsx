"use client";

import React, { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { useChat } from "./hooks/useChat";

export const MessageList: React.FC = () => {
  const { messages, chatState } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatState]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col min-h-0">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      
      {chatState === "typing" && <TypingIndicator />}
      
      <div ref={bottomRef} />
    </div>
  );
};
export default MessageList;
