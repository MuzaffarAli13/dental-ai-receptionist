"use client";

import React from "react";
import { ChatProvider } from "./context/ChatContext";
import FloatingButton from "./FloatingButton";
import ChatWindow from "./ChatWindow";

export const AIChatWidget: React.FC = () => {
  return (
    <ChatProvider>
      <FloatingButton />
      <ChatWindow />
    </ChatProvider>
  );
};

export default AIChatWidget;
export { useChat } from "./hooks/useChat";
export { useVoice } from "./hooks/useVoice";
