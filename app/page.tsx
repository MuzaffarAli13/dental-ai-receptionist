"use client";

import React from "react";
import { ChatProvider } from "../components/chatbot/context/ChatContext";
import Hero from "../components/hero/Hero";
import AIChatWidget from "../components/chatbot";

export default function Home() {
  return (
    <ChatProvider>
      <div className="flex flex-col min-h-screen">
        <Hero />
        <AIChatWidget />
      </div>
    </ChatProvider>
  );
}
