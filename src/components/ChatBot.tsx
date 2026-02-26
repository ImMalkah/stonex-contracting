import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

// ─── Types ──────────────────────────────────────────────────────────
interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

// ─── System prompt with full business context ───────────────────────
const SYSTEM_PROMPT = `You are the friendly and professional AI assistant for **Stonex Contracting**, a heavy equipment and construction company based in the Greater Toronto Area (GTA).

## About Stonex Contracting
- Trusted GTA partner for machine rentals, excavation, and concrete work.
- Service areas: Hamilton, Mississauga, Toronto, Oakville, Burlington, Brampton, and surrounding GTA regions.

## Concrete Services
- Finishes: white/broom finish, exposed aggregate, stamped concrete.
- Projects: Walkways, driveways, patios, and foundations.

## Equipment Rental Pricing
- Wheeled skid steers: $250/day, $1,500/week
- Track skid steers: $350/day, $1,800/week
- Mini excavator: $250/day, $1,500/week
- Trim dozer: $400/day, $5,000/month
- All rentals include insurance, safety equipment, and GTA-wide delivery.

## Contact
- Phone: (289) 925-2669
- Email: info@stonexcontracting.ca
- Website: stonexcontracting.ca

## Behavior Guidelines
- ONLY answer questions related to Stonex Contracting, its services, and pricing.
- If a user asks about unrelated topics, politely redirect them to ask about our equipment or contracting services.
- Be warm but concise.
- For complex quotes, encourage calling the team directly.`;

// ─── Gemini client (lazy init) ──────────────────────────────────────
let genai: GoogleGenAI | null = null;

function getAIModel() {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "YOUR_GEMINI_API_KEY_HERE") return null;
    if (!genai) genai = new GoogleGenAI(key);

    return genai.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
        systemInstruction: SYSTEM_PROMPT
    });
}

// ─── Quick suggestion chips ─────────────────────────────────────────
const SUGGESTIONS = [
    "What concrete finishes do you offer?",
    "How much does a mini ex cost?",
    "Do you serve Mississauga?",
    "Can you do driveways and patios?",
];

export const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content:
                "Hey there! 👋 I'm the Stonex assistant. Whether you need equipment rental info, pricing, or help planning your project — I'm here for you. How can I help?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPulse, setShowPulse] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
                const model = getAIModel();

                if (!model) {
                    await new Promise((r) => setTimeout(r, 800));
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: (Date.now() + 1).toString(),
                            role: "assistant",
                            content:
                                "I'm currently in fallback mode. Please reach out to us at **(289) 925-2669** for immediate help!",
                            timestamp: new Date(),
                        },
                    ]);
                    return;
                }

                // Format history for the chat session
                const history = messages
                    .filter((m) => m.id !== "welcome")
                    .map((m) => ({
                        role: m.role === "assistant" ? "model" : "user",
                        parts: [{ text: m.content }],
                    }));

                const chat = model.startChat({ history });
                const result = await chat.sendMessage(trimmed);
                const reply = result.response.text();

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
                const isQuota = err?.message?.includes("429") || err?.message?.includes("quota");

                setMessages((prev) => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: isQuota
                            ? "I've reached my daily limit for now. Please reach us at **(289) 925-2669** — our team is ready to help!"
                            : "I'm having a little trouble right now. You can reach us directly at **(289) 925-2669**!",
                        timestamp: new Date(),
                    },
                ]);
            } finally {
                setIsLoading(false);
            }
        },
        [isLoading, messages]
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
                        id="chat-trigger"
                    >
                        <MessageCircle className="w-7 h-7" />
                        {showPulse && (
                            <span className="absolute inset-0 rounded-full bg-gh-red animate-ping opacity-40" />
                        )}
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
                                    <p className="text-white/40 text-xs">{isLoading ? "Typing…" : "Online • Typically replies instantly"}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                                >
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
                                        <span className="text-white/40 text-xs">Thinking…</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {messages.length <= 1 && !isLoading && (
                            <div className="px-4 pb-2 flex flex-wrap gap-2">
                                {SUGGESTIONS.map((s) => (
                                    <button key={s} onClick={() => sendMessage(s)} className="text-xs px-3 py-1.5 rounded-full bg-white/8 text-white/60 hover:bg-gh-red/20 hover:text-gh-red transition-colors border border-white/5">
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
                                placeholder="Ask about our services…"
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
