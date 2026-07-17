"use client";

import { useEffect, useRef, useState } from "react";
import { useChatContext } from "../context/ChatContext";

export function useVoice() {
  const { sendMessage, chatState, setChatState, messages, isVoiceEnabled } = useChatContext();
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  // Sync ref to avoid dependency issues and typescript functional updater errors
  const chatStateRef = useRef(chatState);
  chatStateRef.current = chatState;

  // Initialize Speech Recognition & Synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthesisRef.current = window.speechSynthesis;

      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          setIsListening(true);
          setChatState("recording");
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            console.log("[useVoice] Speech recognized:", transcript);
            sendMessage(transcript, true);
          }
        };

        recognition.onerror = (event: any) => {
          if (event.error === "no-speech") {
            console.warn("[useVoice] No speech detected.");
          } else {
            console.error("[useVoice] Speech recognition error:", event.error);
          }
          setIsListening(false);
          // Only reset to idle if we were actually recording
          setChatState("idle");
        };

        recognition.onend = () => {
          setIsListening(false);
          // Only reset to idle if we are not typing
          if (chatStateRef.current === "recording") {
            setChatState("idle");
          }
        };

        recognitionRef.current = recognition;
      }
    }
  }, [sendMessage, setChatState]);

  // Handle TTS (Text-to-Speech) when a new model response arrives
  useEffect(() => {
    if (!isVoiceEnabled || !synthesisRef.current || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === "model") {
      // Cancel any ongoing speaking
      synthesisRef.current.cancel();

      // Clean emojis and linebreaks for speech synthesis engines
      const cleanText = lastMessage.content
        .replace(/[\u{1F300}-\u{1F6FF}]/gu, "") // strip emojis
        .replace(/\n+/g, ". ");

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "en-US";

      // Select voice
      const voices = synthesisRef.current.getVoices();
      const selectedVoice = voices.find(
        (v) => v.name.includes("Google US English") || v.name.includes("Natural")
      ) || voices[0];
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        setChatState("speaking");
      };

      utterance.onend = () => {
        setChatState("idle");
      };

      utterance.onerror = () => {
        setChatState("idle");
      };

      synthesisRef.current.speak(utterance);
    }
  }, [messages, isVoiceEnabled, setChatState]);

  // Toggle/cancel speech if voice setting is disabled
  useEffect(() => {
    if (!isVoiceEnabled && synthesisRef.current) {
      synthesisRef.current.cancel();
      if (chatStateRef.current === "speaking") {
        setChatState("idle");
      }
    }
  }, [isVoiceEnabled, setChatState]);

  const startListening = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn("Speech recognition already running:", err);
      }
    } else {
      alert("Voice speech recognition is not supported in this browser. Please try Chrome or Edge.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return {
    isListening,
    startListening,
    stopListening,
    isSupported: typeof window !== "undefined" && !(!(window as any).SpeechRecognition && !(window as any).webkitSpeechRecognition),
  };
}
