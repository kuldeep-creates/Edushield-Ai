import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// The generative model to use
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction:
        "You are EduShield AI, an intelligent academic advisor and early warning assistant. " +
        "You provide precise, actionable, and structured insights based purely on the structured data provided. " +
        "CRITICAL RULES:\n" +
        "1. BULLET STRUCTURE: Always use clean bullet points for lists.\n" +
        "2. SECTION HEADINGS: Use clear, bold section headings (e.g., **Intervention Plan**).\n" +
        "3. TONE: Professional, analytical, entirely objective. DO NOT use emotional exaggeration (e.g., NO 'Oh no!', NO 'This is terrible!', NO 'I am so excited!').\n" +
        "4. NO HALLUCINATION: Only reference data explicitly provided in the user's context. Do not make up grades, subjects, or student names.",
});

export async function POST(req: Request) {
    try {
        const { messages, contextData } = await req.json();

        if (!messages || messages.length === 0) {
            return NextResponse.json(
                { error: "No messages provided" },
                { status: 400 }
            );
        }

        // Build the structured context prompt based strictly on user instructions
        let structuredContext = "";
        if (contextData) {
            structuredContext = `[CURRENT CONTEXT DATA]
ROLE: ${contextData.role || "Unknown"}
Name: ${contextData.name || "Unknown"}
Class/Grade: ${contextData.grade || "Unknown"}
Attendance: ${contextData.attendance || "Unknown"}%
Risk Score: ${contextData.riskScore || "Unknown"}
Top Risk Factors:
${contextData.riskFactors ? contextData.riskFactors.map((f: string) => `- ${f}`).join("\n") : "None"}
Weak Subjects:
${contextData.subjects ? contextData.subjects.map((s: any) => `- ${s.name}: ${s.score}`).join("\n") : "None"}

Please answer the user's final message in the context of this data. Keep formatting strict.
[/CURRENT CONTEXT DATA]\n\n`;
        }

        // Combine history for Gemini (Gemini uses 'user' and 'model' roles)
        // We will pass the conversation history, and prepend the context to the very last user message.
        const history = [];
        let lastUserMessage = "";

        for (let i = 0; i < messages.length; i++) {
            const msg = messages[i];
            if (i === messages.length - 1 && msg.role === "user") {
                lastUserMessage = msg.content;
            } else {
                // Map roles to gemini (assistant -> model, user -> user)
                history.push({
                    role: msg.role === "assistant" ? "model" : "user",
                    parts: [{ text: msg.content }],
                });
            }
        }

        // If the last message wasn't user (unlikely), handle it
        if (!lastUserMessage && messages.length > 0) {
            lastUserMessage = messages[messages.length - 1].content;
        }

        const finalPrompt = structuredContext + lastUserMessage;

        // Start chat session
        const chatSession = model.startChat({
            history: history,
        });

        // Send the final message
        const result = await chatSession.sendMessage(finalPrompt);
        const responseText = result.response.text();

        return NextResponse.json({ message: responseText });
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch response from Gemini." },
            { status: 500 }
        );
    }
}
