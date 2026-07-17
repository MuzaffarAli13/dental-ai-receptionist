"use client";

import React from "react";
import { useChat } from "../chatbot/hooks/useChat";
import { clinicConfig } from "../../ai/config";
import { CalendarDays, Sparkles, Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  const { setIsOpen } = useChat();

  return (
    <div className="relative flex flex-col justify-center items-center flex-1 w-full px-6 py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-teal-50/50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-black">
      
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-teal-350/20 dark:bg-teal-900/10 blur-[80px] sm:blur-[120px]" />
      
      {/* Clinic Header / Navigation bar */}
      <header className="absolute top-0 w-full max-w-7xl flex items-center justify-between px-6 py-6 sm:px-8">
        <div className="flex items-center gap-2">
          <div 
            className="flex items-center justify-center w-8 h-8 rounded-lg shadow-md text-white font-bold select-none text-base"
            style={{ backgroundColor: clinicConfig.themeColor.primary }}
          >
            🦷
          </div>
          <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
            {clinicConfig.logoText}
          </span>
        </div>
        
        <a 
          href={`tel:${clinicConfig.phoneNumber}`}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-650 hover:text-teal-700 dark:text-zinc-400 dark:hover:text-teal-400 transition-colors"
        >
          <Phone className="w-4 h-4 text-teal-650" />
          <span className="hidden sm:inline">Call Clinic:</span>
          <span>{clinicConfig.phoneNumber}</span>
        </a>
      </header>

      {/* Hero content */}
      <main className="w-full max-w-4xl flex flex-col items-center text-center gap-8 mt-8 sm:mt-12">
        {/* Sparkle badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/50 text-teal-850 dark:text-teal-300 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Next-Gen Dental Booking Agent</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1] max-w-3xl"
        >
          Your Perfect Smile,{" "}
          <span 
            className="text-transparent bg-clip-text bg-gradient-to-r"
            style={{ 
              backgroundImage: `linear-gradient(to right, ${clinicConfig.themeColor.primary}, ${clinicConfig.themeColor.secondary})`
            }}
          >
            Scheduled in Seconds.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg lg:text-xl text-zinc-650 dark:text-zinc-400 max-w-2xl leading-relaxed"
        >
          Skip the phone queues and appointment holds. Chat or speak directly with our smart AI receptionist to check availability, book instantly, and secure your visit.
        </motion.p>

        {/* CTA Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-white font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer w-full sm:w-auto"
            style={{ backgroundColor: clinicConfig.themeColor.primary }}
          >
            <CalendarDays className="w-5 h-5 shrink-0" />
            <span>Book Appointment with AI</span>
            <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </main>

      {/* Bottom floating hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ 
          duration: 4, 
          delay: 1.5,
          repeat: Infinity,
          repeatDelay: 5
        }}
        className="absolute bottom-24 right-24 hidden lg:flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 py-1.5 px-3 rounded-xl shadow-md pointer-events-none"
      >
        <span>Ask me to book!</span>
        <span className="text-sm">👉</span>
      </motion.div>
    </div>
  );
};
export default Hero;
