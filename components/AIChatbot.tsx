"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./AIChatbot.module.css";

// Dummy context data simulating what the backend would fetch per-user based on auth
const DUMMY_CONTEXT_DATA = {
    student: {
        role: "Student",
        name: "Alex Student",
        grade: "10th",
        attendance: 85,
        riskScore: 35,
        riskFactors: ["Struggling in Physics"],
        subjects: [{ name: "Math", score: 92 }, { name: "Physics", score: 65 }, { name: "Literature", score: 88 }],
    },
    teacher: {
        role: "Teacher",
        name: "Sarah Jenkins",
        grade: "10th Math",
        attendance: "N/A",
        riskScore: "N/A",
        riskFactors: ["32% of students at critical risk in your class", "Attendance drop across 10th grade"],
        subjects: [],
    },
};

export default function AIChatbot() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Only show on dashboard pages
    if (!pathname.startsWith("/dashboard")) return null;

    // Determine role based on URL for dummy context mapping
    const roleContext = pathname.includes("teacher") || pathname.includes("principal") || pathname.includes("district")
        ? DUMMY_CONTEXT_DATA.teacher
        : DUMMY_CONTEXT_DATA.student;

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const newMessages = [...messages, { role: "user" as const, content: inputValue }];
        setMessages(newMessages);
        setInputValue("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: newMessages,
                    contextData: roleContext,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
            } else {
                setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${data.error}` }]);
            }
        } catch (error) {
            setMessages((prev) => [...prev, { role: "assistant", content: "Failed to connect to AI server." }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Auto scroll
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

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
                                Hi {roleContext.name.split(" ")[0]}! I&apos;m your AI Assistant.
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
                                        {/* Extremely simple markdown-to-html conversion for bold and lists */}
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
                        <button className={styles.sendBtn} onClick={handleSend} disabled={isLoading || !inputValue.trim()}>
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
