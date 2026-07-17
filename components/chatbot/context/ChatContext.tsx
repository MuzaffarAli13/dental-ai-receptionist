"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Message, ChatState } from "../types";
import { sendChatMessage } from "../services/chatService";

interface ChatContextProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  messages: Message[];
  chatState: ChatState;
  setChatState: React.Dispatch<React.SetStateAction<ChatState>>;
  isVoiceEnabled: boolean;
  setIsVoiceEnabled: (enabled: boolean) => void;
  sendMessage: (content: string, isVoice?: boolean) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatState, setChatState] = useState<ChatState>("idle");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  // Initialize with greeting
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        content: "Hello 👋\nWelcome to Smile Dental Clinic.\nHow may I help you today?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        content: "Hello 👋\nWelcome to Smile Dental Clinic.\nHow may I help you today?",
        timestamp: new Date(),
      },
    ]);
    setChatState("idle");
  };

  const sendMessage = async (content: string, isVoice = false) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
      isVoice,
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setChatState("typing");

    try {
      // Map existing messages to history payload, omitting IDs and Date objects
      const historyPayload = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const data = await sendChatMessage(content, historyPayload);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "model",
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setChatState(isVoiceEnabled ? "speaking" : "idle");
    } catch (error) {
      console.error("Chat error:", error);
      setChatState("error");
      
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "model",
        content: "I'm sorry, I'm having trouble connecting right now. Please check your connection or try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        setIsOpen,
        messages,
        chatState,
        setChatState,
        isVoiceEnabled,
        setIsVoiceEnabled,
        sendMessage,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
