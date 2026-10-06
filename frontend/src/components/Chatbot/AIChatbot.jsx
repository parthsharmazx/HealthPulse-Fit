import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  ShieldAlert,
  Trash2,
  Dumbbell,
  Apple,
  Scale,
  RefreshCw
} from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AIChatbot = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello ${user?.name ? user.name.split(' ')[0] : 'there'}! I'm **PulseAI**, your clinical sports nutrition & fitness coach. 🏋️‍♂️🥗\n\nI can analyze your workouts, calibrate daily macros (Protein, Carbs, Fats), interpret your BMI, and tailor safe progressive routines.\n\nHow can I help power your goals today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'Optimal protein intake for hypertrophy',
    '15-min HIIT fat burn session',
    'Post-workout meal for muscle recovery',
    'How do I break a bench press plateau?',
    'Is creatine safe and how do I take it?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    if (!messageText) setInput('');
    setIsTyping(true);

    try {
      const response = await api.sendChatMessage(textToSend, {
        name: user?.name,
        goal: user?.goal,
        height: user?.height,
        weight: user?.weight,
        bmi: user?.bmi,
        calorieTarget: user?.dailyCalorieTarget
      });

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: response.reply
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: `### PulseAI Fitness Advisory 💡\n\nFor your **${user?.goal || 'fitness'}** focus and current weight of **${user?.weight || 72} kg**:\n- **Protein Intake**: Maintain 1.6g – 2.2g of protein per kg of body weight (~${Math.round((user?.weight || 72) * 1.8)}g/day).\n- **Progressive Overload**: Focus on compound lifts in the 8-12 rep range with 1-2 reps in reserve.\n- **Hydration**: Drink at least 3 liters of water on training days.\n\n⚠️ *Medical Disclaimer: PulseAI provides general fitness guidance. Always consult a healthcare professional for clinical advice.*`
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: `Chat cleared! Ask me anything regarding nutrition, progressive resistance routines, or recovery techniques.`
      }
    ]);
  };

  // Simple text renderer with bullet points and bold formatting
  const renderMessageContent = (text) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return <h4 key={idx} className="font-extrabold text-sm text-forest-900 mt-2 mb-1">{line.replace('### ', '')}</h4>;
          }
          if (line.startsWith('- ') || line.startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start space-x-1.5 pl-2">
                <span className="text-forest-700 font-bold">•</span>
                <span>{line.substring(2)}</span>
              </div>
            );
          }
          if (line.startsWith('⚠️') || line.includes('Disclaimer:')) {
            return <div key={idx} className="mt-2 pt-2 border-t border-forest-100 text-[11px] text-gray-500 italic">{line}</div>;
          }
          return <p key={idx}>{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-300">
      
      {/* Prominent Medical Disclaimer Banner */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex items-start space-x-3 text-amber-900 shadow-sm">
        <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950">
            Medical & Clinical Disclaimer
          </h4>
          <p className="text-[11px] sm:text-xs text-amber-900/90 mt-0.5 leading-relaxed">
            PulseAI is an automated fitness and nutritional guidance tool designed for educational purposes. It does not provide medical diagnoses, treatment prescriptions, or clinical advice. Consult your physician before initiating strenuous training or extreme calorie restrictions.
          </p>
        </div>
      </div>

      {/* Chat Window Card */}
      <div className="bg-white rounded-3xl border border-forest-100 shadow-soft overflow-hidden flex flex-col h-[600px]">
        
        {/* Chat Header */}
        <div className="p-4 sm:p-5 bg-forest-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-forest-800 flex items-center justify-center text-sage-300 shadow-inner">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm sm:text-base">PulseAI Fitness Advisor</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-forest-200">Powered by Sports Nutrition & Biomechanics Engine</p>
            </div>
          </div>

          <button
            onClick={clearChat}
            className="p-2 text-forest-200 hover:text-white hover:bg-forest-800 rounded-xl transition text-xs flex items-center space-x-1"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-3 bg-forest-50/60 border-b border-forest-100 flex items-center space-x-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-forest-800 uppercase shrink-0 pl-1">
            Prompt Ideas:
          </span>
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleSend(prompt)}
              className="text-[11px] font-medium text-forest-900 bg-white hover:bg-forest-100/80 px-3 py-1.5 rounded-full border border-forest-200/80 transition whitespace-nowrap shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FAFDFB]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-xl bg-forest-800 text-sage-300 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-forest-800 text-white rounded-tr-none'
                    : 'bg-white text-slate-dark border border-forest-100 rounded-tl-none'
                }`}
              >
                {renderMessageContent(msg.text)}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
            </div>
          ))}

          {/* Typing Animation */}
          {isTyping && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-forest-800 text-sage-300 flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-forest-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-forest-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-forest-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-forest-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-4 bg-white border-t border-forest-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about workout form, macro splits, fat loss routines..."
              className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-xs sm:text-sm text-slate-dark focus:border-forest-600 focus:ring-2 focus:ring-forest-100 outline-none transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-3 rounded-2xl bg-forest-800 hover:bg-forest-900 disabled:opacity-50 text-white shadow-md shadow-forest-900/10 transition transform hover:scale-105"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-center text-[10px] text-gray-400 mt-2">
            PulseAI is trained on modern exercise physiology and clinical nutrition literature.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
