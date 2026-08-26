import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ThumbsUp, ThumbsDown, Bot, User, Sparkles } from 'lucide-react';
import { knowledgeBase, type KnowledgeEntry } from '../data/chatKnowledge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  feedback?: 'helpful' | 'not-helpful';
  suggestions?: string[];
}

function findBestAnswer(query: string): KnowledgeEntry | null {
  const lower = query.toLowerCase().trim();
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.length;
      }
    }
    if (lower.includes(entry.question.toLowerCase().slice(0, 20))) {
      score += 10;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore > 2 ? bestMatch : null;
}

function getSmartSuggestions(): string[] {
  const suggestions = [
    'What is ISO 42001?',
    'How to do risk assessment?',
    'EU AI Act and ISO 42001 overlap',
    'What are the Annex A controls?',
    'How long does implementation take?',
    'What is human oversight?',
    'Quick wins for ISO 42001',
    'ISO 27001 vs 42001 difference'
  ];
  return suggestions.sort(() => Math.random() - 0.5).slice(0, 3);
}

function getFallbackAnswer(query: string): string {
  const lower = query.toLowerCase();
  
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hello! 👋 I'm your ISO 42001 assistant. I can help you understand the standard, its controls, implementation process, and how it relates to EU AI Act and NIST. What would you like to know?";
  }
  
  if (lower.includes('thank') || lower.includes('thanks')) {
    return "You're welcome! Happy to help with any ISO 42001 questions. Feel free to ask anything else! 😊";
  }
  
  if (lower.includes('help') || lower.includes('what can you')) {
    return "I can help with:\n\n• ISO 42001 fundamentals and structure\n• Annex A controls explained\n• Risk and impact assessment guidance\n• Implementation roadmap\n• EU AI Act and NIST 600-1 mapping\n• ISO 27001 integration\n• Documentation requirements\n• Audit preparation\n\nJust ask a question!";
  }

  return "I'm not sure about that specific question. Here are some topics I can help with:\n\n• ISO 42001 basics and structure\n• Annex A controls\n• Risk assessment\n• EU AI Act\n• NIST AI 600-1\n• Implementation tips\n\nTry rephrasing your question or pick one of the suggestions below!";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(getSmartSuggestions());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('iso42001-chat');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch {}
    } else {
      setMessages([{
        id: 'welcome',
        text: "Hi! I'm your ISO 42001 AI assistant 🤖\n\nI can answer questions about:\n• ISO 42001 standard\n• Annex A controls\n• Risk & impact assessment\n• EU AI Act & NIST\n• Implementation tips\n\nWhat would you like to know?",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: getSmartSuggestions()
      }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    localStorage.setItem('iso42001-chat', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = (text?: string) => {
    const query = text || input.trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: query,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const match = findBestAnswer(query);
      let answer: string;
      let suggestionsList: string[] = [];

      if (match) {
        answer = match.answer;
        suggestionsList = getSmartSuggestions();
      } else {
        answer = getFallbackAnswer(query);
        suggestionsList = getSmartSuggestions();
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: answer,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: suggestionsList
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
    }, 800 + Math.random() * 700);
  };

  const handleFeedback = (msgId: string, type: 'helpful' | 'not-helpful') => {
    setMessages(prev => prev.map(m => 
      m.id === msgId ? { ...m, feedback: type } : m
    ));
    
    const feedback = JSON.parse(localStorage.getItem('iso42001-chat-feedback') || '{}');
    feedback[msgId] = type;
    localStorage.setItem('iso42001-chat-feedback', JSON.stringify(feedback));
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-bounce-slow group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">ISO 42001 Assistant</h3>
                <div className="flex items-center gap-1 text-xs text-blue-100">
                  <Sparkles className="w-3 h-3" />
                  <span>AI-Powered Help</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.sender === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-blue-500 to-purple-500'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-sm'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm shadow-sm'
                      }`}>
                        {msg.text}
                      </div>

                      {msg.sender === 'bot' && !msg.feedback && msg.id !== 'welcome' && (
                        <div className="flex items-center gap-2 mt-1.5 ml-1">
                          <span className="text-xs text-gray-400">Was this helpful?</span>
                          <button onClick={() => handleFeedback(msg.id, 'helpful')}
                            className="p-1 hover:bg-green-100 rounded transition-colors">
                            <ThumbsUp className="w-3.5 h-3.5 text-gray-400 hover:text-green-600" />
                          </button>
                          <button onClick={() => handleFeedback(msg.id, 'not-helpful')}
                            className="p-1 hover:bg-red-100 rounded transition-colors">
                            <ThumbsDown className="w-3.5 h-3.5 text-gray-400 hover:text-red-600" />
                          </button>
                        </div>
                      )}

                      {msg.feedback === 'helpful' && (
                        <div className="text-xs text-green-600 mt-1 ml-1">👍 Glad it helped!</div>
                      )}
                      {msg.feedback === 'not-helpful' && (
                        <div className="text-xs text-red-500 mt-1 ml-1">Thanks for the feedback — I'll improve!</div>
                      )}

                      {msg.suggestions && msg.sender === 'bot' && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {msg.suggestions.map((s, i) => (
                            <button key={i} onClick={() => handleSend(s)}
                              className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors border border-blue-100">
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about ISO 42001..."
                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              />
              <button type="submit" disabled={!input.trim()}
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}