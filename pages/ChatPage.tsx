import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_USERS, MY_PROFILE } from '../constants';
import { Message, User } from '../types';
import { generateChatReply } from '../services/geminiService';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';

const ChatPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [partner, setPartner] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize partner
  useEffect(() => {
    const foundUser = MOCK_USERS.find(u => u.id === userId);
    if (foundUser) {
      setPartner(foundUser);
      // Initial greeting if no messages
      setMessages([
        {
          id: 'init-1',
          senderId: foundUser.id,
          content: `Hi ${MY_PROFILE.name}! I saw you're offering ${MY_PROFILE.skillsOffered[0]} and I'd love to learn more. Are you interested in ${foundUser.skillsOffered[0]}?`,
          timestamp: Date.now()
        }
      ]);
    }
  }, [userId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !partner) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: MY_PROFILE.id,
      content: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    
    // Simulate AI Response if partner is AI (all mock users are AI enabled)
    if (partner.isAI) {
      setIsTyping(true);
      try {
        const replyText = await generateChatReply(
            MY_PROFILE, 
            partner, 
            [...messages, newMsg]
        );
        
        const replyMsg: Message = {
          id: (Date.now() + 1).toString(),
          senderId: partner.id,
          content: replyText,
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, replyMsg]);
      } catch (error) {
        console.error("Failed to generate reply", error);
      } finally {
        setIsTyping(false);
      }
    }
  };

  if (!partner) {
    return <div className="p-8 text-center">User not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-64px)] flex flex-col bg-white md:border-x border-slate-200">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-200 flex items-center gap-4 bg-white sticky top-0 z-10">
        <Link to="/" className="p-2 hover:bg-slate-100 rounded-full text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <img 
          src={partner.avatar} 
          alt={partner.name} 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="font-bold text-slate-900">{partner.name}</h2>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Online
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => {
          const isMe = msg.senderId === MY_PROFILE.id;
          return (
            <div 
              key={msg.id} 
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] md:max-w-[70%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  isMe 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          <button 
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isTyping ? <Loader2 className="w-5 h-5 animate-spin"/> : <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;