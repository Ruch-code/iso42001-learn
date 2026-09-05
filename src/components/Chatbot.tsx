import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ThumbsUp, ThumbsDown, Bot, User, Sparkles, Settings, Key } from 'lucide-react';
import { knowledgeBase, type KnowledgeEntry } from '../data/chatKnowledge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  feedback?: 'helpful' | 'not-helpful';
  suggestions?: string[];
  source?: 'knowledge-base' | 'ai';
}

const SYSTEM_PROMPT = `You are an expert ISO 42001 AI Management System assistant. You help new hires learn about ISO 42001, the international standard for AI management systems.

Key facts about ISO 42001:
- Published December 2023 as ISO/IEC 42001:2023
- First international certifiable standard for AI management systems
- Follows Annex SL structure (same as ISO 27001, ISO 9001)
- Covers: AI policy, governance, risk assessment, AI system lifecycle, data governance, third-party management, human oversight, monitoring
- Has 24 Annex A controls across 8 categories
- 60-70% overlap with ISO 27001 controls
- Helps demonstrate conformity with EU AI Act
- Complements NIST AI 600-1 (AI Risk Management Playbook)

Clauses 4-10 cover: Context, Leadership, Planning, Support, Operation, Performance Evaluation, Improvement.

Annex A controls: A.2 (AI Policy), A.3 (Internal Organization), A.4 (Resources), A.5 (AI System Lifecycle), A.6 (Data for AI Systems), A.7 (Information for Interested Parties), A.8 (Use of AI Systems), A.9 (Third-party Relationships), A.10 (Acquisition of AI Systems).

Rules:
- Be concise and helpful
- Use bullet points and structured formatting
- If unsure, say so honestly
- Focus on practical implementation advice
- Keep answers under 300 words unless detail is needed`;

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

function formatText(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const cleaned = line.replace(/\*\*(.*?)\*\*/g, (_, b) => `<strong>${b}</strong>`);
    if (line.trim() === '') return <div key={i} className="h-2" />;
    if (line.startsWith('• ')) {
      return (
        <div key={i} className="flex gap-2">
          <span className="text-blue-500">•</span>
          <span dangerouslySetInnerHTML={{ __html: cleaned.slice(2) }} />
        </div>
      );
    }
    return <span key={i} className="block" dangerouslySetInnerHTML={{ __html: cleaned }} />;
  });
}

async function callGeminiAPI(query: string, apiKey: string, chatHistory: Message[]): Promise<string> {
  const historyContents = chatHistory.slice(-10).map(m => ({
    role: m.sender === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }]
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [
          ...historyContents,
          { role: 'user', parts: [{ text: query }] }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
          topP: 0.8
        }
      })
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [aiEnabled, setAiEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('iso42001-gemini-key');
    if (savedKey) {
      setApiKey(savedKey);
      setApiKeyInput(savedKey);
      setAiEnabled(true);
    }
    const saved = localStorage.getItem('iso42001-chat');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch {}
    } else {
      setMessages([{
        id: 'welcome',
        text: "Hi! I'm your ISO 42001 AI assistant 🤖\n\nI can answer questions about:\n• ISO 42001 standard\n• Annex A controls\n• Risk & impact assessment\n• EU AI Act & NIST\n• Implementation tips\n" + (aiEnabled ? "\n💡 I'm powered by Google AI for any question!" : "\n🔧 Add a Gemini API key in settings for unlimited answers!"),
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
    if (isOpen && !showSettings) inputRef.current?.focus();
  }, [isOpen, showSettings]);

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput.trim());
      setAiEnabled(true);
      localStorage.setItem('iso42001-gemini-key', apiKeyInput.trim());
    } else {
      setApiKey('');
      setAiEnabled(false);
      localStorage.removeItem('iso42001-gemini-key');
    }
    setShowSettings(false);
  };

  const handleSend = async (text?: string) => {
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

    const match = findBestAnswer(query);

    if (match) {
      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: match.answer,
          sender: 'bot',
          timestamp: new Date(),
          suggestions: getSmartSuggestions(),
          source: 'knowledge-base'
        };
        setIsTyping(false);
        setMessages(prev => [...prev, botMsg]);
      }, 500 + Math.random() * 400);
      return;
    }

    if (!aiEnabled) {
      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: "I don't have a pre-loaded answer for that. For unlimited AI-powered answers, add a free Google Gemini API key in Settings! ⚙️\n\nGet your free key at: aistudio.google.com/apikey",
          sender: 'bot',
          timestamp: new Date(),
          suggestions: getSmartSuggestions()
        };
        setIsTyping(false);
        setMessages(prev => [...prev, botMsg]);
      }, 600);
      return;
    }

    try {
      const aiAnswer = await callGeminiAPI(query, apiKey, messages);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: aiAnswer,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: getSmartSuggestions(),
        source: 'ai'
      };
      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg = err?.message?.includes('API key')
        ? "Invalid API key. Please check your Gemini API key in Settings."
        : "Sorry, I couldn't reach the AI. Please try again or check your API key in Settings.";
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMsg,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: getSmartSuggestions()
      };
      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
    }
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
                  {aiEnabled ? (
                    <><Sparkles className="w-3 h-3" /><span>Powered by Google AI</span></>
                  ) : (
                    <><Key className="w-3 h-3" /><span>Knowledge base only</span></>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowSettings(!showSettings)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                title="Settings">
                <Settings className="w-4 h-4" />
              </button>
              <button onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-blue-50 border-b border-blue-100 p-4 animate-slide-up">
              <h4 className="font-semibold text-blue-900 text-sm mb-2">🔧 API Settings</h4>
              <p className="text-xs text-blue-700 mb-2">
                Add a free Google Gemini API key for AI-powered answers to any question.
              </p>
              <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener"
                className="text-xs text-blue-600 underline mb-2 inline-block">
                Get free key at aistudio.google.com/apikey →
              </a>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="Paste your Gemini API key..."
                  className="flex-1 px-3 py-2 border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <button onClick={handleSaveApiKey}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors whitespace-nowrap">
                  {apiKeyInput ? 'Save' : 'Clear'}
                </button>
              </div>
              {aiEnabled && (
                <p className="text-xs text-green-600 mt-2">✅ AI enabled — ask me anything!</p>
              )}
            </div>
          )}

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
                      <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-sm whitespace-pre-line'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm shadow-sm'
                      }`}>
                        {msg.sender === 'user' ? msg.text : formatText(msg.text)}
                      </div>

                      {msg.source && (
                        <div className="flex items-center gap-1 mt-1 ml-1">
                          {msg.source === 'knowledge-base' ? (
                            <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">📚 From knowledge base</span>
                          ) : (
                            <span className="text-xs text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full">✨ AI-generated</span>
                          )}
                        </div>
                      )}

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
                placeholder={aiEnabled ? "Ask me anything about ISO 42001..." : "Ask about ISO 42001..."}
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