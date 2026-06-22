"use client";

import Link from "next/link";
import { Bot } from "lucide-react";
import { usePathname } from "next/navigation";

export function FloatingAIIcon() {
  const pathname = usePathname();

  // Hide the floating icon if we are already on the AI Tutor page to avoid redundancy
  if (pathname === "/dashboard/ai-tutor") return null;

  return (
    <Link 
      href="/dashboard/ai-tutor" 
      className="fixed bottom-6 right-6 z-50 bg-[#F9B03C] hover:bg-[#e6a236] text-white p-4 rounded-full shadow-2xl shadow-[#F9B03C]/40 hover:-translate-y-1 transition-all duration-300 group flex items-center justify-center border-2 border-white/50"
      aria-label="Ask Tsehay AI"
    >
      <Bot className="w-8 h-8 group-hover:scale-110 transition-transform duration-300 text-white dark:text-[#111111]" />
      
      {/* Tooltip */}
      <span className="absolute -top-12 right-0 bg-[#0f172a] text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-xl border border-white/10">
        Ask Tsehay AI
      </span>
      
      {/* Ripple Effect */}
      <span className="absolute inset-0 rounded-full bg-white/30 opacity-0 group-hover:animate-ping -z-10"></span>
    </Link>
  );
}
