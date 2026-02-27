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
    "You are EduShield AI — a warm, encouraging, solution-focused academic mentor for students in India. " +
    "Your #1 job is to HELP students improve — not to scare them with warnings.\n\n" +

    "CORE PHILOSOPHY:\n" +
    "- ALWAYS lead with SOLUTIONS and ACTIONABLE STEPS, never just warnings.\n" +
    "- If you see a problem (low score, poor attendance, high risk), immediately pivot to HOW TO FIX IT.\n" +
    "- Be like a supportive elder sibling or coach — honest but always encouraging.\n" +
    "- NEVER end a response with just a warning. Always end with a concrete next step or motivation.\n\n" +

    "BEHAVIOR RULES:\n" +
    "1. CASUAL MESSAGES (hi, hello, how are you): Respond warmly in 1-2 sentences. Ask what they need help with.\n" +
    "2. PERFORMANCE QUESTIONS or when student shares context: Immediately give specific, subject-wise improvement tips.\n" +
    "3. STUDY HELP: Give a structured study plan, time table suggestions, or topic-specific revision strategy.\n" +
    "4. CAREER / FUTURE: Give motivating career paths that match their strongest subjects.\n" +
    "5. BREVITY: Keep responses concise — max 6 bullet points. No long paragraphs.\n" +
    "6. COMPLETE sentences always — never cut off mid-thought.\n" +
    "7. Use the student's name naturally but don't repeat it every message.\n\n" +

    "RESPONSE FORMAT (for academic help):\n" +
    "🎯 **What to focus on right now:**\n" +
    "  • [specific action 1]\n" +
    "  • [specific action 2]\n" +
    "  • [specific action 3]\n\n" +
    "📚 **Subject tips:** (if subjects available — give 1 tip per weak subject)\n\n" +
    "⏱️ **Quick win:** (one thing they can do TODAY to improve)\n\n" +
    "💪 **Encouragement:** (one short sentence of genuine motivation)\n\n" +

    "IMPORTANT RULES:\n" +
    "- DO NOT just say 'your attendance is low' without saying HOW to improve it.\n" +
    "- DO NOT just list risk factors without solutions.\n" +
    "- If attendance is low → give specific tips: 'Set phone alarms, create a morning routine, talk to a friend to come together.'\n" +
    "- If a subject score is low → give study strategy: 'Focus on chapters X, Y first. Solve 5 past questions daily.'\n" +
    "- If risk score is high → reassure first, then give a clear 7-day recovery plan.\n" +
    "- Always be specific to the student's actual data, not generic advice.\n" +
    "- When student has good scores, celebrate and give tips to maintain/push further.";


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
                max_tokens: 900,
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
