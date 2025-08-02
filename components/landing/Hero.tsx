'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HelpCircle, Send, Sparkles } from 'lucide-react';

export default function Hero() {
  const router = useRouter();
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  
  const typewriterTexts = [
    'Ask Alex about our web services...',
    'How can we boost your business?',
    'Need a modern website solution?',
    'Want 24/7 AI customer support?'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentText(typewriterTexts[textIndex]);
        setTextIndex((prev) => (prev + 1) % typewriterTexts.length);
        setIsTyping(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [textIndex]);

  const goToChatWithMessage = (message: string) => {
    const msg = message.trim();
    if (!msg) return;
    try {
      // backup in sessionStorage in case query parsing fails
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('initialChatMessage', msg);
      }
    } catch {}
    const query = new URLSearchParams({ message: msg }).toString();
    router.push(`/chat?${query}`);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-16 pb-8 section-container"
      data-theme="platinum"
      style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}
    >
      {/* Simplified animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 rounded-full opacity-40 floating animate-bounce"
          style={{
            background: 'var(--theme-accent)',
            animationDelay: '0s',
            animationDuration: '3s'
          }}
        />
        <div
          className="absolute top-3/4 right-1/4 w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 rounded-full opacity-30 floating animate-pulse"
          style={{
            background: 'var(--theme-accent)',
            animationDelay: '1s',
            animationDuration: '4s'
          }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-2 h-2 md:w-3 md:h-3 rounded-full opacity-25 floating animate-ping"
          style={{
            background: 'var(--theme-accent)',
            animationDelay: '2s',
            animationDuration: '5s'
          }}
        />
        
        {/* Gradient overlays */}
        <div
          className="absolute top-20 left-10 w-32 h-32 md:w-48 md:h-48 lg:w-72 lg:h-72 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 md:w-64 md:h-64 lg:w-96 lg:h-96 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6 md:space-y-8 lg:space-y-10">
        
        {/* Badge */}
        <div className="section-enter">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 glass-card rounded-full text-xs md:text-sm font-semibold">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" style={{ color: 'var(--theme-accent)' }} />
            <span className="opacity-80">AI-Powered Solutions</span>
          </div>
        </div>

        {/* Main heading */}
        <div className="section-enter space-y-3 md:space-y-4">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tight leading-none">
            Meet <span style={{ color: 'var(--theme-accent)' }}>Alex</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-medium opacity-80">
            Your Smart Business Assistant
          </p>
        </div>

        {/* Short description */}
        <div className="section-enter">
          <p className="text-sm md:text-base lg:text-lg opacity-70 max-w-2xl mx-auto leading-relaxed">
            Modern websites with AI support. Grow your business with 24/7 intelligent automation.
          </p>
        </div>

        {/* Premium AI Chat Input */}
        <div className="section-enter max-w-2xl lg:max-w-3xl mx-auto">
          <div className="relative glass-card rounded-2xl lg:rounded-3xl shadow-2xl p-2 lg:p-3 hover:shadow-3xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      goToChatWithMessage(inputValue);
                    }
                  }}
                  placeholder={currentText || typewriterTexts[0]}
                  className={`w-full px-4 py-3 lg:px-6 lg:py-4 text-sm lg:text-base bg-transparent border-none outline-none placeholder-opacity-50 transition-all duration-300 ${isTyping ? 'animate-pulse' : ''}`}
                  style={{ color: 'var(--theme-text)' }}
                />
                {/* Typing indicator */}
                {isTyping && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => goToChatWithMessage(inputValue)}
                className="w-12 h-12 lg:w-14 lg:h-14 btn-primary rounded-xl lg:rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: 'var(--theme-accent)' }}
                aria-label="Send message"
              >
                <Send className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Premium action buttons */}
        <div className="section-enter">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center max-w-lg mx-auto">
            <a
              href="/chat"
              className="group w-full sm:w-auto px-6 py-3 md:px-10 md:py-4 text-sm md:text-base bg-transparent border-2 font-semibold rounded-xl lg:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              style={{
                borderColor: 'var(--theme-accent)',
                color: 'var(--theme-accent)',
              }}
            >
              Try Alex
            </a>

            <a
              href="#contact"
              className="group w-full sm:w-auto px-6 py-3 md:px-10 md:py-4 text-sm md:text-base btn-primary font-semibold rounded-xl lg:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-white flex items-center justify-center"
              style={{ backgroundColor: 'var(--theme-accent)' }}
            >
              Book a Consult
            </a>
          </div>
        </div>

        {/* Premium FAQ Button */}
        <div className="section-enter">
          <a 
            href="#faq" 
            className="inline-flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 text-xs lg:text-sm font-medium rounded-lg lg:rounded-xl glass-card hover:scale-105 transition-all duration-300"
          >
            <HelpCircle className="w-3 h-3 lg:w-4 lg:h-4" />
            Have Questions? View FAQ
          </a>
        </div>

        {/* Premium stats with clean design */}
        <div className="section-enter pt-4 lg:pt-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 opacity-70 max-w-4xl mx-auto">
            {[
              { number: '500+', label: 'Websites Built' },
              { number: '24/7', label: 'AI Available' },
              { number: '<0.5s', label: 'Response Time' },
              { number: '100%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="text-2xl lg:text-4xl font-black mb-1 lg:mb-2 group-hover:animate-pulse"
                  style={{ color: 'var(--theme-accent)' }}
                  dangerouslySetInnerHTML={{ __html: stat.number }}
                />
                <div className="text-xs lg:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}