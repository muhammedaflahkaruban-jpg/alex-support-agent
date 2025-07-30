import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingAnimation = ({ texts, speed = 100 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(fullText.slice(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, speed]);

  return (
    <span className="text-gray-400">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-gray-500"
      >
        |
      </motion.span>
    </span>
  );
};

const InteractiveGrid = () => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const gridSize = { cols: 20, rows: 15 };
  const cells = [];

  for (let row = 0; row < gridSize.rows; row++) {
    for (let col = 0; col < gridSize.cols; col++) {
      cells.push({ id: `${row}-${col}`, row, col });
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="grid gap-0 h-full w-full opacity-30"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`
        }}
      >
        {cells.map((cell) => {
          const distance = Math.sqrt(
            Math.pow(mousePos.x - (cell.col * window.innerWidth / gridSize.cols), 2) +
            Math.pow(mousePos.y - (cell.row * window.innerHeight / gridSize.rows), 2)
          );
          const intensity = Math.max(0, 1 - distance / 200);
          
          return (
            <motion.div
              key={cell.id}
              className="border border-gray-800"
              animate={{
                backgroundColor: `rgba(156, 163, 175, ${intensity * 0.1})`,
                borderColor: `rgba(156, 163, 175, ${0.2 + intensity * 0.3})`
              }}
              transition={{ duration: 0.3 }}
            />
          );
        })}
      </div>
      
      {/* Floating dots that follow mouse */}
      <motion.div
        className="absolute w-2 h-2 bg-gray-500 rounded-full"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="absolute w-1 h-1 bg-gray-600 rounded-full"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 10,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      />
      <motion.div
        className="absolute w-1 h-1 bg-gray-600 rounded-full"
        animate={{
          x: mousePos.x + 15,
          y: mousePos.y - 15,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
      />
    </div>
  );
};

export default function AlexHeroSection() {
  const aiCapabilities = [
    "Intelligent Conversations",
    "Advanced Reasoning", 
    "Creative Solutions",
    "Complex Analysis",
    "Seamless Integration"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black">
      {/* Interactive Grid Background */}
      <InteractiveGrid />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-5xl">
        
        {/* Main heading - Mobile First */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 sm:mb-6 md:mb-8 tracking-tight">
            <span className="text-white">Alex</span>
          </h1>
          
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Advanced AI assistant designed for{' '}
            <br className="hidden sm:block" />
            <TypingAnimation texts={aiCapabilities} speed={80} />
          </div>
        </motion.div>

        {/* Description - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          <p className="text-gray-500 text-sm sm:text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed px-4">
            Streamlined intelligence meets elegant simplicity. 
            <br className="hidden sm:block" />
            Experience AI assistance without complexity.
          </p>
        </motion.div>

        {/* CTA Button - Mobile friendly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-white font-light text-base sm:text-lg border border-gray-700 hover:border-gray-500 transition-all duration-300 bg-transparent w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            <span className="relative">
              Start Conversation
              <motion.span
                className="absolute bottom-0 left-0 w-0 h-px bg-gray-400 group-hover:w-full transition-all duration-300"
              />
            </span>
          </motion.button>
        </motion.div>

        {/* Mobile-first stats layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-16 text-gray-600"
        >
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-light text-gray-400 mb-1">24/7</div>
            <div className="text-xs sm:text-sm text-gray-600">Available</div>
          </div>
          <div className="hidden sm:block w-px h-8 md:h-12 bg-gray-800" />
          <div className="block sm:hidden w-12 h-px bg-gray-800" />
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-light text-gray-400 mb-1">&lt;1s</div>
            <div className="text-xs sm:text-sm text-gray-600">Response</div>
          </div>
          <div className="hidden sm:block w-px h-8 md:h-12 bg-gray-800" />
          <div className="block sm:hidden w-12 h-px bg-gray-800" />
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-light text-gray-400 mb-1">∞</div>
            <div className="text-xs sm:text-sm text-gray-600">Possibilities</div>
          </div>
        </motion.div>

        {/* Scroll indicator - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-gray-700"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}