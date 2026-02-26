import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import Groq from "groq-sdk";
import { supabase } from "../lib/supabase";

// ─── Types ──────────────────────────────────────────────────────────
interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface KnowledgeItem {
    category: string;
    content: string;
}

// ─── Knowledge Base Base Prompt ────────────────────────────────────────
const BASE_SYSTEM_PROMPT = `You are the professional AI assistant for **Stonex Contracting**.
Only answer based on our business profile. If a user asks something unrelated, steer them back to our machinery or contracting work.

## Business Knowledge:
`;

const BEHAVIOR_PROMPT = `
## Behavior
- Answer only about Stonex Contracting.
- Keep answers under 2 sentences when possible.
- Be helpful but brisk.
- For bookings, direct them to call (289) 925-2669.`;

// ─── Groq client (lazy init) ──────────────────────────────────────
let groqClient: Groq | null = null;

function getGroqClient() {
    const key = process.env.GROQ_API_KEY;
    if (!key || key.trim() === "") return null;
    if (!groqClient) {
        groqClient = new Groq({
            apiKey: key,
            dangerouslyAllowBrowser: true
        });
    }
    return groqClient;
}

// ─── Quick suggestion chips ─────────────────────────────────────────
const SUGGESTIONS = [
    "Concrete finishing options?",
    "Mini excavator price?",
    "Do you serve Hamilton?",
];

export const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "How can Stonex help your project today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPulse, setShowPulse] = useState(true);
    const [dynamicPrompt, setDynamicPrompt] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch dynamic knowledge base from Supabase
    useEffect(() => {
        const fetchKnowledge = async () => {
            const { data, error } = await supabase
                .from('chatbot_knowledge')
                .select('category, content');

            if (error || !data) {
                console.error("Error fetching knowledge base:", error);
                // Fallback to basic info if DB fails
                setDynamicPrompt("- Stonex offers concrete, excavation, and machine rentals.\n- Phone: (289) 925-2669");
                return;
            }

            const knowledgeString = data
                .map((item: KnowledgeItem) => `- **${item.category}**: ${item.content}`)
                .join("\n");

            setDynamicPrompt(knowledgeString);
        };

        fetchKnowledge();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
            setShowPulse(false);
        }
    }, [isOpen]);

    const sendMessage = useCallback(
        async (text: string) => {
            const trimmed = text.trim();
            if (!trimmed || isLoading) return;

            const userMsg: Message = {
                id: Date.now().toString(),
                role: "user",
                content: trimmed,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMsg]);
            setInput("");
            setIsLoading(true);

            try {
                const client = getGroqClient();

                if (!client) {
                    await new Promise((r) => setTimeout(r, 800));
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: (Date.now() + 1).toString(),
                            role: "assistant",
                            content: "I'm in manual mode. Call us at **(289) 925-2669**!",
                            timestamp: new Date(),
                        },
                    ]);
                    return;
                }

                const chatMessages = messages
                    .filter(m => m.id !== "welcome")
                    .map(m => ({
                        role: m.role as "user" | "assistant",
                        content: m.content
                    }));

                const fullSystemPrompt = `${BASE_SYSTEM_PROMPT}${dynamicPrompt}${BEHAVIOR_PROMPT}`;

                const completion = await client.chat.completions.create({
                    model: "openai/gpt-oss-20b",
                    messages: [
                        { role: "system", content: fullSystemPrompt },
                        ...chatMessages,
                        { role: "user", content: trimmed }
                    ],
                    temperature: 0.6,
                    max_completion_tokens: 300,
                });

                let reply = completion.choices[0]?.message?.content || "Please contact us directly for that!";
                reply = reply.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

                setMessages((prev) => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: reply,
                        timestamp: new Date(),
                    },
                ]);
            } catch (err: any) {
                console.error("Chat error:", err);
                setMessages((prev) => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: "Service interrupted. Reach us at **(289) 925-2669**.",
                        timestamp: new Date(),
                    },
                ]);
            } finally {
                setIsLoading(false);
            }
        },
        [isLoading, messages, dynamicPrompt]
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gh-red rounded-full flex items-center justify-center text-white shadow-2xl cursor-pointer"
                    >
                        <MessageCircle className="w-7 h-7" />
                        {showPulse && <span className="absolute inset-0 rounded-full bg-gh-red animate-ping opacity-40" />}
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-3rem)] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-white/20"
                        style={{ background: "linear-gradient(180deg, #1A1D21 0%, #22252B 100%)" }}
                    >
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-gh-red/20 rounded-xl flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-gh-red" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Stonex Assistant</p>
                                    <p className="text-white/40 text-xs">{isLoading ? "Thinking…" : "Online"}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
                            {messages.map((msg) => (
                                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${msg.role === "assistant" ? "bg-gh-red/20 text-gh-red" : "bg-gh-teal/20 text-gh-teal"}`}>
                                        {msg.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    </div>
                                    <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "assistant" ? "bg-white/8 text-white/90 rounded-tl-md" : "bg-gh-red text-white rounded-tr-md"}`}>
                                        {msg.content.split("**").map((part, i) => i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : <span key={i}>{part}</span>)}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-gh-red/20 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-gh-red" />
                                    </div>
                                    <div className="bg-white/8 px-4 py-3 rounded-2xl rounded-tl-md flex items-center gap-1.5">
                                        <Loader2 className="w-4 h-4 text-gh-red animate-spin" />
                                        <span className="text-white/40 text-xs">Analyzing…</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {messages.length <= 1 && !isLoading && (
                            <div className="px-4 pb-2 flex flex-wrap gap-2">
                                {SUGGESTIONS.map((s) => (
                                    <button key={s} onClick={() => sendMessage(s)} className="text-xs px-3 py-1.5 rounded-full bg-white/8 text-white/60 hover:bg-gh-red/20 hover:text-gh-red border border-white/5 transition-colors">
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-white/10 flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Message Stonex..."
                                disabled={isLoading}
                                className="flex-1 bg-white/8 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gh-red/50 disabled:opacity-50"
                            />
                            <motion.button type="submit" disabled={!input.trim() || isLoading} className="w-10 h-10 bg-gh-red rounded-xl flex items-center justify-center text-white disabled:opacity-30 shrink-0">
                                <Send className="w-4 h-4" />
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
