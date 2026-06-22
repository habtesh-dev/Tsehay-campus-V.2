import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Simple In-Memory Rate Limiter (For production, use Redis/Upstash)
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 messages per minute per IP

export async function POST(req: Request) {
  try {
    // Basic Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for') || 'anonymous-ip';
    const now = Date.now();
    
    if (rateLimit.has(ip)) {
      const userLimit = rateLimit.get(ip)!;
      if (now - userLimit.timestamp < RATE_LIMIT_WINDOW_MS) {
        if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json({ error: "Rate limit exceeded. Please wait a minute before sending more messages." }, { status: 429 });
        }
        userLimit.count += 1;
      } else {
        rateLimit.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now });
    }
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 500 });
    }

    const { messages, context } = await req.json();

    // The Gemini 1.5 Flash model is fast and versatile
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construct a system prompt to give the AI its persona
    const systemPrompt = `
      You are the "Tsehay AI Tutor", an expert, friendly AI assistant for an e-learning platform called Tsehay Campus.
      Your job is to help students understand their course material. 
      You can communicate fluently in both English and Amharic. If the user asks in Amharic, respond in Amharic.
      Keep your answers concise, encouraging, and highly educational. Format your responses with markdown for readability (bolding key terms, using lists).
      
      Current Course Context: ${context || "General Platform Question"}
    `;

    // Extract the latest user message
    const userMessage = messages[messages.length - 1].content;

    // Combine system prompt and user message for the API call
    // For a simple implementation, we prepend the system prompt to the user's message
    const prompt = `${systemPrompt}\n\nStudent Question:\n${userMessage}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
    
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
