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

const TypewriterMessage = ({ content }: { content: string }) => {
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        let i = 0;
        const speed = 15; // smooth animation speed
        const timer = setInterval(() => {
            if (i < content.length) {
                setDisplayed(content.substring(0, i + 1));
                i++;

                // Keep chat scrolled to bottom as it organically types
                if (typeof window !== 'undefined') {
                    const chatBody = document.getElementById('edushield-chat-body');
                    if (chatBody) {
                        chatBody.scrollTop = chatBody.scrollHeight;
                    }
                }
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [content]);

    // Format safe HTML with markdown styles
    const formattedHtml = displayed
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n- /g, '<br/>• ')
        .replace(/\n/g, '<br/>');

    return <div dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
};

export default function AIChatbot() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const [contextData, setContextData] = useState<ChatContext | null>(null);
    const [chatbotEnabled, setChatbotEnabled] = useState<boolean | null>(null); // null = loading

    // Fetch real context data
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const profile = userDoc.data();

                        // Check chatbot preference — default true if not set
                        setChatbotEnabled(profile.chatbotEnabled !== false);

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
                } catch {
                    // silently fail — context is optional
                    setChatbotEnabled(true); // default to visible on error
                }
            } else {
                setContextData(null);
                setChatbotEnabled(false);
            }
        });
        return () => unsubscribe();
    }, []);

    // Suggestions based on role
    const getSuggestions = () => {
        if (!contextData) return [];
        if (contextData.role.toLowerCase() === 'student') {
            return [
                "What career paths match my strengths?",
                "How can I improve my weak subjects?",
                "What should I study for college?",
                "Help me build a study schedule"
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

    useEffect(() => {
        const handleOpenChatbot = () => setIsOpen(true);
        window.addEventListener('open-chatbot', handleOpenChatbot);
        return () => window.removeEventListener('open-chatbot', handleOpenChatbot);
    }, []);

    // Auto-scroll to bottom when messages or loading changes
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    // Hide entirely if pref is disabled, or still loading (null = waiting for auth)
    if (chatbotEnabled === null || chatbotEnabled === false) return null;

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
                <div className={`${styles.chatWindow} ${isFullScreen ? styles.chatWindowFullScreen : ''}`}>
                    <div className={styles.chatHeader}>
                        <div className={styles.headerInfo}>
                            <div className={styles.headerAvatar}>
                                <span className="material-symbols-outlined">psychology</span>
                            </div>
                            <div className={styles.headerTextWrap}>
                                <strong>EduShield Mentor</strong>
                                <span>AI Guidance Counselor</span>
                            </div>
                        </div>
                        <div className={styles.headerActions}>
                            <button className={styles.iconBtn} onClick={() => setIsFullScreen(!isFullScreen)} title={isFullScreen ? "Exit Full Screen" : "Full Screen"}>
                                <span className="material-symbols-outlined">
                                    {isFullScreen ? 'close_fullscreen' : 'open_in_full'}
                                </span>
                            </button>
                            <button className={styles.iconBtn} onClick={() => setIsOpen(false)} title="Close">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                    </div>

                    <div id="edushield-chat-body" className={styles.chatBody}>
                        {messages.length === 0 ? (
                            <div className={styles.welcome}>
                                <span className="material-symbols-outlined">handshake</span>
                                <h3>Hey {contextData?.name ? contextData.name.split(" ")[0] : "there"}!</h3>
                                <p>I'm your personalized AI Mentor. I've synced with your latest academic progress. I can help map out your future career, explore colleges, or guide you past a tough subject!</p>
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
                                        {msg.role === "assistant" ? (
                                            <TypewriterMessage content={msg.content} />
                                        ) : (
                                            <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n- /g, '<br/>• ').replace(/\n/g, '<br/>') }} />
                                        )}
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
