import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// ─── OpenRouter Client (Primary) ─────────────────────────────────────────────
// OpenRouter is OpenAI-compatible — just point to their endpoint
const openRouterClient = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY || "",
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
        "HTTP-Referer": "https://edushield.ai",
        "X-Title": "EduShield AI Mentor",
    },
});

// ─── Gemini Client (Fallback) ──────────────────────────────────────────────
const GEMINI_KEY = process.env.GEMINI_API_KEY || "";

// ─── System Prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT =
    "You are EduShield AI, a friendly and professional academic mentor for students. " +
    "You have access to the student's academic data, but you DON'T use it unless they specifically ask about their performance, subjects, or grades.\n\n" +

    "CRITICAL BEHAVIOR RULES:\n" +
    "1. CASUAL MESSAGES: If the student says hi, hello, hey, or anything casual — respond warmly and BRIEFLY in 1-2 sentences. Ask what they need help with today. Do NOT analyze their data unprompted.\n" +
    "2. ACADEMIC QUESTIONS: Only when the student asks about their grades, subjects, improvement, study plans, or career — then use their data to give structured advice.\n" +
    "3. BREVITY: Keep all responses short. Max 5-6 bullet points for analysis. 1-2 sentences for conversation.\n" +
    "4. NO REPETITIVE GREETINGS: After the first message, don't say 'Hey [Name]' again every reply.\n" +
    "5. NEVER stop mid-sentence. Always complete your thought.\n" +
    "6. Be human, warm, and encouraging. Act like a real mentor — not a data processor.\n\n" +

    "WHEN doing academic analysis (only if asked), use this format:\n" +
    "• Insight: (brief observation)\n" +
    "• Root Cause: (short reason)\n" +
    "• Action Steps: (2-3 specific steps)\n" +
    "• Next Goal: (one clear target)";

// ─── POST Handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
    try {
        const { messages, contextData } = await req.json();

        if (!messages || messages.length === 0) {
            return NextResponse.json({ error: "No messages provided" }, { status: 400 });
        }

        // Build student context block
        let structuredContext = "";
        if (contextData) {
            structuredContext =
                `[STUDENT CONTEXT]\n` +
                `Name: ${contextData.name || "Unknown"}\n` +
                `Role: ${contextData.role || "Unknown"}\n` +
                `Class/Grade: ${contextData.grade || "Unknown"}\n` +
                `Attendance: ${contextData.attendance || "Unknown"}%\n` +
                `Risk Factors: ${contextData.riskFactors ? contextData.riskFactors.join(", ") : "None"}\n` +
                `Subjects:\n` +
                `${contextData.subjects ? contextData.subjects.map((s: { name: string; score: number }) => `  - ${s.name}: ${s.score}/100`).join("\n") : "Not available"}\n` +
                `[/STUDENT CONTEXT]\n\n`;
        }

        // Build message array (OpenAI format)
        const chatMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
            { role: "system", content: SYSTEM_PROMPT },
        ];

        for (let i = 0; i < messages.length; i++) {
            const msg = messages[i];
            if (i === messages.length - 1 && msg.role === "user") {
                chatMessages.push({ role: "user", content: structuredContext + msg.content });
            } else {
                chatMessages.push({
                    role: msg.role === "assistant" ? "assistant" : "user",
                    content: msg.content,
                });
            }
        }

        // ── 1️⃣  Try OpenRouter (Primary) ──────────────────────────────────────
        let responseText: string | null = null;

        try {
            const response = await openRouterClient.chat.completions.create({
                model: "meta-llama/llama-3.3-70b-instruct:free",
                messages: chatMessages,
                max_tokens: 700,
                temperature: 0.7,
            });
            responseText = response.choices[0]?.message?.content || null;
        } catch {
            // OpenRouter failed — silently fall through to Gemini
        }

        // ── 2️⃣  Gemini Fallback ────────────────────────────────────────────────
        if (!responseText && GEMINI_KEY) {
            try {
                const genAI = new GoogleGenerativeAI(GEMINI_KEY);
                const geminiModel = genAI.getGenerativeModel({
                    model: "gemini-2.5-flash",
                    systemInstruction: SYSTEM_PROMPT,
                });
                const userTurn = chatMessages.filter(m => m.role !== "system").map(m => m.content).join("\n");
                const result = await geminiModel.generateContent(userTurn);
                responseText = result.response.text();
            } catch {
                // Gemini also failed — fall through to 503 response
            }
        }

        if (!responseText) {
            return NextResponse.json({ error: "All AI providers are currently unavailable. Please try again." }, { status: 503 });
        }

        return NextResponse.json({ message: responseText });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to fetch response.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
