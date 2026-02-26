"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./AIChatbot.module.css";

import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface ChatContext {
    role: string;
    name: string;
    grade?: string | number;
    attendance?: string | number;
    riskScore?: string | number;
    riskFactors?: string[];
    subjects?: { name: string; score: number }[];
}

export default function AIChatbot() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const [contextData, setContextData] = useState<ChatContext | null>(null);

    // Fetch real context data
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const profile = userDoc.data();

                        if (profile.role === 'student' && profile.regNo) {
                            const dataDoc = await getDoc(doc(db, 'studentData', profile.regNo));
                            if (dataDoc.exists()) {
                                const sData = dataDoc.data();
                                const subjects = Object.keys(sData.subjects || {}).map(sub => ({
                                    name: sub,
                                    score: sData.subjects[sub].latestScore || 0
                                }));

                                setContextData({
                                    role: "Student",
                                    name: sData.name || profile.regNo,
                                    grade: sData.class || "N/A",
                                    attendance: sData.overallAttendancePct || 0,
                                    riskScore: "Fetching AI Score...", // Typically this would be pulled from recent predictions cache
                                    riskFactors: ["Consistent absences", "Low momentum in recent exams"], // Dummy dynamic factors
                                    subjects: subjects
                                });
                            }
                        } else {
                            // Non-student context
                            setContextData({
                                role: profile.role,
                                name: profile.school || "Staff Member",
                                riskFactors: ["Class attendance dropping", "Multiple students at critical risk"]
                            });
                        }
                    }
                } catch (err) {
                    console.error("Failed to fetch chat context", err);
                }
            } else {
                setContextData(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // Suggestions based on role
    const getSuggestions = () => {
        if (!contextData) return [];
        if (contextData.role.toLowerCase() === 'student') {
            return [
                "How can I improve my grades?",
                "Am I at risk in any subject?",
                "What's my attendance impact?",
                "Draft an improvement plan"
            ];
        } else {
            return [
                "Which students need intervention?",
                "Summarize overall class health",
                "How to boost attendance?",
                "Generate a parent outreach email"
            ];
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        handleSend(suggestion);
    };

    const handleSend = async (messageText: string = inputValue) => {
        if (!messageText.trim()) return;

        const newMessages = [...messages, { role: "user" as const, content: messageText }];
        setMessages(newMessages);
        setInputValue("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: newMessages,
                    contextData: contextData || { role: "Guest", name: "User" },
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
            } else {
                setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${data.error}` }]);
            }
        } catch {
            setMessages((prev) => [...prev, { role: "assistant", content: "Failed to connect to AI server." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button className={styles.fab} onClick={() => setIsOpen(true)}>
                    <span className="material-symbols-outlined">smart_toy</span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <div className={styles.headerTitle}>
                            <span className="material-symbols-outlined">smart_toy</span>
                            <strong>EduShield AI Agent</strong>
                        </div>
                        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className={styles.chatBody}>
                        {messages.length === 0 ? (
                            <div className={styles.welcome}>
                                Hi {contextData?.name ? contextData.name.split(" ")[0] : "there"}! I&apos;m your AI Assistant.
                                I have your academic profile ready. Ask me anything about your progress or intervention plans!
                            </div>
                        ) : (
                            messages.map((msg, i) => (
                                <div key={i} className={`${styles.messageWrap} ${msg.role === "user" ? styles.msgUser : styles.msgAi}`}>
                                    {msg.role === "assistant" && (
                                        <div className={styles.aiAvatar}>
                                            <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>smart_toy</span>
                                        </div>
                                    )}
                                    <div className={styles.messageBubble}>
                                        <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n- /g, '<br/>• ').replace(/\n/g, '<br/>') }} />
                                    </div>
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className={`${styles.messageWrap} ${styles.msgAi}`}>
                                <div className={styles.aiAvatar}>
                                    <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>smart_toy</span>
                                </div>
                                <div className={styles.typingIndicator}>
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef}></div>
                    </div>

                    <div className={styles.chatInputContainer}>
                        {messages.length === 0 && (
                            <div className={styles.suggestionChips}>
                                {getSuggestions().map((sug, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSuggestionClick(sug)}
                                        className={styles.suggestionChip}
                                    >
                                        {sug}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className={styles.chatInputArea}>
                            <input
                                type="text"
                                className={styles.chatInput}
                                placeholder="Ask anything..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                disabled={isLoading}
                            />
                            <button className={styles.sendBtn} onClick={() => handleSend()} disabled={isLoading || !inputValue.trim()}>
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
