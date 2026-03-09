import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Sparkles, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm your Notion Template Assistant. I can help you find the perfect workflow or answer questions about our templates. What are you looking for today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Using Search Grounding and Pro model as requested
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [
          { role: 'user', parts: [{ text: `You are an expert Notion consultant for "TemplatesHub". 
          We sell these templates:
          1. Ultimate Life Planner ($12) - Productivity, Life
          2. Freelancer OS ($15) - Business, Finance
          3. Second Brain Starter Kit ($9) - Knowledge, Learning
          4. Personal Finance Tracker ($10) - Finance, Goals
          5. Startup Launch Pad ($18) - Business, Startups
          6. Goal & Habit Tracker ($8) - Productivity, Health
          
          User question: ${userMessage}` }] }
        ],
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "Be helpful, concise, and use a friendly, Notion-like tone. Suggest specific templates from our list if they match the user's needs."
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-notion-accent text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white border border-notion-border rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-notion-border flex items-center justify-between bg-notion-bg-alt">
              <div className="flex items-center gap-2 font-semibold">
                <Sparkles size={18} className="text-notion-accent" />
                <span>AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-notion-hover p-1 rounded">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    m.role === 'user' 
                      ? 'bg-notion-accent text-white' 
                      : 'bg-notion-hover text-notion-text'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-notion-hover p-3 rounded-lg text-sm animate-pulse">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-notion-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about templates..."
                  className="flex-1 border border-notion-border rounded-[3px] px-3 py-2 text-sm focus:outline-none focus:border-notion-accent"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-notion-accent text-white p-2 rounded-[3px] hover:opacity-90 disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
                <Search size={10} />
                <span>Powered by Gemini with Google Search</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
