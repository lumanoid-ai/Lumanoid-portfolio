import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_PROMPT = "You are the AI assistant for Luminoid AI, a company that builds custom AI Chatbots, AI Agents, and AI Integrations for businesses. Be professional, helpful, and concise. Help visitors understand our services, answer questions about AI solutions, and encourage them to book a consultation call. Keep responses under 3 sentences unless more detail is needed.";

export default function ChatWidget({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! I am the Luminoid AI Assistant. How can I help you transform your business with AI today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInstance = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !chatInstance.current) {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (apiKey && apiKey !== 'your_key_here') {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ 
                model: 'gemini-2.5-flash-lite-preview-06-17',
                systemInstruction: SYSTEM_PROMPT
            });
            chatInstance.current = model.startChat({ history: [] });
        }
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !chatInstance.current) {
        if (!chatInstance.current) {
            setMessages(prev => [...prev, { role: 'user', text: input }, { role: 'model', text: 'Missing API Key in .env file.' }]);
            setInput('');
        }
        return;
    }
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    
    try {
      const result = await chatInstance.current.sendMessage(userMsg);
      const text = result.response.text();
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error connecting to the AI.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          className="fixed bottom-6 right-6 w-full max-w-[400px] h-[520px] bg-[#111111] rounded-2xl shadow-2xl flex flex-col z-[100] border border-white/10 overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#0A0A0A]">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary rounded-sm transform rotate-45 flex items-center justify-center relative"></div>
              <span className="font-bold font-heading text-white tracking-tight">Luminoid Assistant</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors duration-200">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-3 rounded-xl max-w-[85%] text-sm leading-relaxed ${
                  msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-[#1A1A1A] text-gray-200 border border-white/5 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-xl bg-[#1A1A1A] text-gray-200 border border-white/5 rounded-bl-none flex items-center gap-1">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-4 border-t border-white/10 bg-[#0A0A0A]">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors duration-200"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-primary disabled:text-gray-600 hover:text-[#E05A1E] transition-colors duration-200"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
