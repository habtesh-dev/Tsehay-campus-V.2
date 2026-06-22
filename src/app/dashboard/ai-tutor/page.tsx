"use client";

import { useState } from "react";
import { Send, Bot, User, Sparkles, BookOpen, Search } from "lucide-react";

export default function AITutorPage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hello! I am your Tsehay AI Tutor. How can I help you with your courses today? You can ask me to explain concepts, summarize modules, or help you debug your code."
    },
    {
      role: "user",
      content: "Can you explain what the Facebook Pixel is in simple terms?"
    },
    {
      role: "ai",
      content: "Absolutely! Think of the Facebook Pixel like a **digital security camera** for your website.\n\nWhen someone visits your website, the Pixel \"sees\" what they do (like viewing a product, adding it to the cart, or buying it). It then sends this information back to Facebook.\n\nThis allows you to:\n1. **Retargeting**: Show ads specifically to people who visited your site but didn't buy.\n2. **Optimization**: Tell Facebook to find more people who are similar to your best customers.\n\nDoes that make sense, or would you like an example of how to install it?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: inputValue }]);
    setInputValue("");
    
    // Mock AI response for now if not connected, but let's try real fetch
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: inputValue }],
          context: "Module 1: Introduction to Facebook Ads" // Mock context
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch");
      }

      setMessages(prev => [...prev, { role: "ai", content: data.reply }]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: `Error connecting to AI Tutor. Please check if your GEMINI_API_KEY is set in .env.local\n\nDetails: ${error.message}` 
      }]);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto h-[calc(100vh-8rem)] flex gap-6">
      
      {/* Left Column: Chat Area */}
      <div className="flex-1 bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm flex flex-col overflow-hidden relative">
        
        {/* Chat Header */}
        <div className="h-16 border-b border-slate-100 dark:border-white/10 flex items-center justify-between px-6 bg-slate-50 dark:bg-transparent/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#3268BA] rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">Tsehay AI Tutor</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Always online • Amharic & English</p>
            </div>
          </div>
          <button className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-white transition">Clear Chat</button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-transparent/30">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
              
              {/* Avatar */}
              <div className="shrink-0 mt-1">
                {msg.role === "ai" ? (
                  <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center shadow-sm">
                    <Bot className="w-4 h-4 text-[#F9B03C]" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </div>
                )}
              </div>

              {/* Message Bubble */}
              <div className={`
                px-5 py-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm
                ${msg.role === "user" 
                  ? "bg-[#3268BA] text-white rounded-tr-sm" 
                  : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm"
                }
              `}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white dark:bg-[#111111] border-t border-slate-100 dark:border-white/10 shrink-0">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about your courses..."
              className="w-full bg-slate-100 border-transparent rounded-xl py-4 pl-5 pr-14 text-sm focus:bg-white dark:bg-[#111111] focus:border-slate-300 focus:ring-2 focus:ring-[#3268BA] transition shadow-inner"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 w-10 h-10 bg-[#F9B03C] rounded-lg flex items-center justify-center text-black hover:bg-[#e6a236] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 ml-1" />
            </button>
          </form>
          <div className="text-center mt-3">
            <span className="text-[10px] text-slate-400 font-medium">AI can make mistakes. Verify important information.</span>
          </div>
        </div>
      </div>

      {/* Right Column: Suggested Topics / Course Context (Hidden on mobile/tablet) */}
      <div className="hidden lg:flex w-80 flex-col gap-4">
        
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-[#3268BA]" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Current Context</h3>
          </div>
          <div className="bg-slate-50 dark:bg-transparent p-3 rounded-xl border border-slate-100 dark:border-white/10">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Active Course:</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-white">Facebook Ads Mastery</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Module 1: Introduction</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm flex-1">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-4 h-4 text-[#F9B03C]" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Suggested Prompts</h3>
          </div>
          <div className="space-y-2">
            {[
              "Explain the difference between Campaigns and Ad Sets.",
              "How much budget should I start with?",
              "What is a Lookalike Audience?",
              "Summarize the last video I watched.",
              "Translate the explanation of 'Pixel' into Amharic."
            ].map((prompt, i) => (
              <button 
                key={i}
                onClick={() => setInputValue(prompt)}
                className="w-full text-left p-3 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-transparent hover:bg-[#3268BA]/5 hover:text-[#3268BA] border border-slate-100 dark:border-white/10 rounded-xl transition line-clamp-2"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
