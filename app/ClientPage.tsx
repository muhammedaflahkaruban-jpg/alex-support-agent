'us'
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion,} from 'motion/react';
import { 
  Moon, 
  Sun, 
  Globe,  Search,
  ShoppingCart,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Send,
  Rocket,
  Star,
  Zap,
  Shield,
  Smartphone,
  Heart,
  Target,
  
} from 'lucide-react';

// Optimized Typing Animation Component
const TypingAnimation = React.memo(({ texts, speed = 100 }) => {
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
    <span className="text-gray-600 dark:text-gray-300">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-gray-500 dark:text-gray-400"
      >
        |
      </motion.span>
    </span>
  );
});

// Optimized Interactive Grid Component
const InteractiveGrid = React.memo(() => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isMobile) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove, isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.01);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const gridSize = useMemo(() => ({ 
    cols: isMobile ? 20 : 80, 
    rows: isMobile ? 30 : 50 
  }), [isMobile]);

  const cells = useMemo(() => {
    const cellArray = [];
    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        cellArray.push({ id: `${row}-${col}`, row, col });
      }
    }
    return cellArray;
  }, [gridSize]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="grid gap-0 h-full w-full opacity-20 dark:opacity-10"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`
        }}
      >
        {cells.map((cell) => {
          if (isMobile) {
            const waveEffect = Math.sin(time + cell.col * 0.2 + cell.row * 0.2) * 0.3 + 0.3;
            return (
              <motion.div
                key={cell.id}
                className="border border-gray-300 dark:border-white"
                animate={{
                  backgroundColor: `rgba(200, 200, 255, ${waveEffect * 0.1})`,
                  borderColor: `rgba(200, 200, 255, ${0.1 + waveEffect * 0.2})`,
                }}
                transition={{ duration: 0.3 }}
              />
            );
          }

          const distance = Math.sqrt(
            Math.pow(mousePos.x - (cell.col * window.innerWidth / gridSize.cols), 2) +
            Math.pow(mousePos.y - (cell.row * window.innerHeight / gridSize.rows), 2)
          );
          const intensity = Math.max(0, 1 - distance / 300);
          const waveEffect = Math.sin(time + cell.col * 0.1 + cell.row * 0.1) * 0.5 + 0.5;
          
          return (
            <motion.div
              key={cell.id}
              className="border border-gray-300 dark:border-white"
              animate={{
                backgroundColor: `rgba(200, 200, 255, ${(intensity * 0.2) + (waveEffect * 0.05)})`,
                borderColor: `rgba(200, 200, 255, ${0.1 + intensity * 0.6 + waveEffect * 0.2})`,
                boxShadow: intensity > 0.3 ? `0 0 40px rgba(200, 200, 255, ${intensity * 0.5})` : 'none',
                scale: 1 + intensity * 0.1
              }}
              transition={{ duration: 0.1 }}
            />
          );
        })}
      </div>
      
      {!isMobile && (
        <>
          <motion.div
            className="absolute w-6 h-6 bg-gradient-to-r from-white to-gray-200 dark:from-white dark:to-gray-300 rounded-full shadow-2xl backdrop-blur-sm"
            animate={{
              x: mousePos.x - 12,
              y: mousePos.y - 12,
            }}
            transition={{ type: "spring", stiffness: 1000, damping: 40 }}
          />
          <motion.div
            className="absolute w-4 h-4 bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-200 dark:to-gray-400 rounded-full shadow-xl backdrop-blur-sm"
            animate={{
              x: mousePos.x - 40,
              y: mousePos.y - 20,
            }}
            transition={{ type: "spring", stiffness: 800, damping: 45, delay: 0.03 }}
          />
          <motion.div
            className="absolute w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-400 dark:to-gray-600 rounded-full shadow-lg backdrop-blur-sm"
            animate={{
              x: mousePos.x + 30,
              y: mousePos.y - 25,
            }}
            transition={{ type: "spring", stiffness: 600, damping: 35, delay: 0.06 }}
          />
        </>
      )}
    </div>
  );
});

// Optimized Marquee Component
const Marquee = React.memo(({ children, direction = 'left', speed = 50, className = '' }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
});

export default function WebvanticLanding() {
  const [isDark, setIsDark] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const businessFeatures = useMemo(() => [
    "Modern Websites",
    "Budget-Friendly Solutions", 
    "Live AI Support",
    "Business Growth",
    "Smart Automation"
  ], []);

  const services = useMemo(() => [
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Website Development",
      description: "Custom, responsive websites built with modern technologies for optimal performance and user experience.",
      features: ["• Responsive Design", "• Lightning Fast", "• SEO Optimized", "• Mobile First"]
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: "AI Support Integration",
      description: "Intelligent chatbots like Alex to handle customer queries 24/7 automatically with smart responses.",
      features: ["• 24/7 Availability", "• Smart AI Responses", "• Lead Generation", "• Customer Support"]
    },
    {
      icon: <ShoppingCart className="w-12 h-12" />,
      title: "E-commerce Solutions",
      description: "Complete online stores with secure payment processing and comprehensive inventory management.",
      features: ["• Payment Gateway", "• Inventory System", "• Order Management", "• Real-time Analytics"]
    },
    {
      icon: <Search className="w-12 h-12" />,
      title: "SEO Optimization",
      description: "Boost your online visibility with comprehensive search engine optimization and content strategy.",
      features: ["• Keyword Research", "• Content Strategy", "• Technical SEO", "• Performance Tracking"]
    }
  ], []);

  const features = useMemo(() => [
    {
      icon: <Zap className="w-16 h-16" />,
      title: "Lightning Performance",
      description: "Optimized for speed and performance across all devices with cutting-edge technology.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Shield className="w-16 h-16" />,
      title: "Enterprise Security", 
      description: "Built with security best practices and reliable hosting infrastructure for peace of mind.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Smartphone className="w-16 h-16" />,
      title: "Mobile Excellence",
      description: "Perfect viewing experience on all screen sizes with responsive design principles.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Rocket className="w-16 h-16" />,
      title: "Future-Ready Code",
      description: "Well-structured, maintainable code following industry standards and best practices.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Heart className="w-16 h-16" />,
      title: "User-Centric Design",
      description: "Designed with user experience and conversion optimization at the core of everything.",
      color: "from-red-400 to-rose-500"
    },
    {
      icon: <Target className="w-16 h-16" />,
      title: "Goal-Oriented Results",
      description: "Every element strategically designed to achieve your specific business objectives.",
      color: "from-indigo-400 to-purple-500"
    }
  ], []);

  const packages = useMemo(() => [
    {
      name: "Basic",
      price: "₹3,999",
      description: "Perfect for small businesses and startups",
      features: [
        "5 Sections (Home, About, Services, Portfolio, Contact)",
        "Responsive Design",
        "Contact Form",
        "Basic SEO Setup",
        "7-10 Days Delivery"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "₹7,999",
      description: "Ideal for growing businesses",
      features: [
        "Everything in Basic",
        "E-commerce Functionality",
        "Blog Setup",
        "Advanced Animations",
        "Social Media Integration",
        "Google Analytics"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹15,999",
      description: "Complete solution for established businesses",
      features: [
        "Everything in Professional",
        "Advanced AI Bot Integration",
        "Custom Email System",
        "Advanced SEO",
        "Priority Support",
        "Maintenance Package"
      ],
      popular: false
    }
  ], []);

  const testimonials = useMemo(() => [
    {
      name: "Sarah Johnson",
      role: "Restaurant Owner",
      content: "Alex transformed our online presence completely. Orders increased by 300% within the first month!",
      rating: 5,
      company: "Bistro Delight"
    },
    {
      name: "Michael Chen",
      role: "E-commerce Entrepreneur", 
      content: "The AI support bot handles 80% of our customer queries. It's like having a 24/7 customer service team.",
      rating: 5,
      company: "TechGear Pro"
    },
    {
      name: "Priya Sharma",
      role: "Consultant",
      content: "Professional, affordable, and delivered exactly what was promised. Couldn't be happier with my new website.",
      rating: 5,
      company: "Business Solutions Inc"
    },
    {
      name: "David Martinez",
      role: "Fitness Coach",
      content: "The website boosted my client bookings by 250%. Alex handles all the initial inquiries perfectly.",
      rating: 5,
      company: "FitLife Studio"
    },
    {
      name: "Emma Thompson",
      role: "Online Retailer",
      content: "Amazing turnaround time and the e-commerce features are exactly what we needed for our growing business.",
      rating: 5,
      company: "Artisan Crafts"
    },
    {
      name: "James Wilson",
      role: "Tech Startup Founder",
      content: "The technical excellence and attention to detail exceeded our expectations. Highly recommended!",
      rating: 5,
      company: "InnovateNow"
    }
  ], []);

  const stats = useMemo(() => [
    { number: "500+", label: "Websites Built" },
    { number: "24/7", label: "AI Available" },
    { number: "<0.5s", label: "Response Time" },
    { number: "100%", label: "Satisfaction Rate" }
  ], []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur-xl z-50 border-b border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="text-2xl md:text-3xl font-black text-black dark:text-white"
              whileHover={{ scale: 1.05 }}
            >
              Webvantic
            </motion.div>
            <div className="flex items-center gap-4 md:gap-8">
              <div className="hidden md:flex items-center gap-8">
                <a href="#services" className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors font-medium">Services</a>
                <a href="#features" className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors font-medium">Features</a>
                <a href="#pricing" className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors font-medium">Pricing</a>
                <a href="#testimonials" className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors font-medium">Reviews</a>
              </div>
              <motion.button
                onClick={() => setIsDark(!isDark)}
                className="p-3 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-all backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Black & Silver White Theme */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-black pt-20">
        <InteractiveGrid />
        
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/60 dark:from-black/80 dark:via-transparent dark:to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/50 dark:via-gray-900/50 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-7xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-8"
          >
            <div className="text-sm md:text-base font-bold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
              Webvantic
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 md:mb-12"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-6 md:mb-8 tracking-tight leading-none">
              <span className="bg-gradient-to-r from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                Meet Alex
              </span>
            </h1>
            <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
              Your AI-Powered Business Assistant
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 md:mb-12"
          >
            <div className="text-lg md:text-xl lg:text-2xl font-medium text-gray-600 dark:text-gray-400 mb-6 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing business with{' '}
              <TypingAnimation texts={businessFeatures} speed={80} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
              We build modern, responsive websites with integrated AI support systems. 
              Our budget-friendly solutions help businesses grow with intelligent automation 
              and 24/7 customer engagement through Alex, your dedicated AI assistant.
            </p>
          </motion.div>

          {/* AI Chat Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12 md:mb-16 max-w-3xl mx-auto"
          >
            <div className="relative bg-white/20 dark:bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/30 dark:border-white/10 shadow-2xl p-3 md:p-4 hover:shadow-3xl transition-all duration-500 hover:bg-white/30 dark:hover:bg-white/10">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Alex anything about our services..."
                  className="flex-1 px-6 md:px-8 py-4 md:py-5 text-base md:text-lg bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black rounded-2xl hover:from-gray-800 hover:to-gray-600 dark:hover:from-gray-200 dark:hover:to-gray-400 transition-all duration-300 shadow-xl flex items-center justify-center group"
                >
                  <Send className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-16 md:mb-24"
          >
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="px-10 md:px-12 py-4 md:py-5 text-base md:text-lg bg-white dark:bg-black text-black dark:text-white font-semibold rounded-2xl border-2 border-black dark:border-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 shadow-xl w-full sm:w-auto"
            >
              Try Alex Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="px-10 md:px-12 py-4 md:py-5 text-base md:text-lg bg-black dark:bg-white text-white dark:text-black font-semibold rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-xl w-full sm:w-auto"
            >
              View Our Work
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-gray-600 dark:text-gray-400 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section - Green & White Theme */}
      <section id="services" className="min-h-screen py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950 dark:via-green-950 dark:to-teal-950">
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20 dark:from-black/20 dark:via-transparent dark:to-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 dark:bg-green-800/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-800/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-200/30 dark:bg-teal-800/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-emerald-900 dark:text-emerald-100 mb-6">
              Our Services
            </h2>
            <p className="text-lg md:text-xl text-emerald-800 dark:text-emerald-200 max-w-4xl mx-auto leading-relaxed">
              Comprehensive web solutions designed to elevate your business and engage your customers with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 50
                }}
                className="group h-full"
              >
                <div className="relative h-full min-h-[500px]">
                  {/* Ultra Liquid Glass Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/2 backdrop-blur-3xl rounded-3xl border border-white/40 dark:border-white/20 shadow-2xl group-hover:shadow-4xl transition-all duration-700" />
                  
                  {/* Animated Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-700" />
                  
                  {/* Content */}
                  <div className="relative p-8 md:p-12 h-full flex flex-col">
                    <div className="relative mb-8">
                      <motion.div 
                        className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-500/20 to-green-500/20 dark:from-emerald-400/30 dark:to-green-400/30 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/30 dark:border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <div className="text-emerald-600 dark:text-emerald-400">
                          {service.icon}
                        </div>
                      </motion.div>
                      
                      {/* Floating Particles */}
                      <motion.div 
                        className="absolute -top-3 -right-3 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-0 group-hover:opacity-100"
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div 
                        className="absolute -bottom-3 -left-3 w-3 h-3 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-100"
                        animate={{ y: [5, -5, 5] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-black text-emerald-900 dark:text-emerald-100 mb-6 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-base md:text-lg text-emerald-800 dark:text-emerald-200 mb-8 flex-grow leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <motion.div 
                          key={idx} 
                          className="flex items-center gap-4"
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.2) + (idx * 0.1) }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm md:text-base text-emerald-800 dark:text-emerald-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Animated Action Button */}
                    <motion.div
                      className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg"
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowRight className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Purple & Blue Theme */}
      <section id="features" className="min-h-screen py-20 md:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-32 right-20 w-64 h-64 bg-purple-300/30 dark:bg-purple-700/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 left-20 w-80 h-80 bg-blue-300/30 dark:bg-blue-700/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-indigo-300/30 dark:bg-indigo-700/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-purple-900 dark:text-purple-100 mb-6">
              Why Choose Excellence
            </h2>
            <p className="text-lg md:text-xl text-purple-800 dark:text-purple-200 max-w-4xl mx-auto leading-relaxed">
              We deliver exceptional web experiences with cutting-edge technology, innovative design, and unmatched performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full min-h-[400px] bg-white/30 dark:bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-white/20 p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">
                  
                  {/* Icon Section */}
                  <div className="relative mb-8">
                    <motion.div 
                      className={`w-24 h-24 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-500`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </motion.div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black text-purple-900 dark:text-purple-100 mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-purple-800 dark:text-purple-200 text-center leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full opacity-60 group-hover:animate-bounce"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full opacity-60 group-hover:animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Orange & Gold Theme */}
      <section id="pricing" className="min-h-screen py-20 md:py-32 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-200/30 dark:bg-orange-800/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-200/30 dark:bg-amber-800/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-orange-900 dark:text-orange-100 mb-6">
              Investment Plans
            </h2>
            <p className="text-lg md:text-xl text-orange-800 dark:text-orange-200 max-w-4xl mx-auto leading-relaxed">
              Choose the perfect package for your business growth. Transparent pricing, exceptional value, guaranteed results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative ${pkg.popular ? 'transform scale-105' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <motion.span 
                      className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-full font-bold shadow-lg"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Most Popular
                    </motion.span>
                  </div>
                )}
                
                <div className={`h-full bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-10 hover:shadow-2xl transition-all duration-300 border-2 ${pkg.popular ? 'border-orange-400 dark:border-orange-500' : 'border-white/30 dark:border-white/20'} hover:scale-105`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-black text-orange-900 dark:text-orange-100 mb-3">
                      {pkg.name}
                    </h3>
                    <div className="text-4xl md:text-5xl font-black text-orange-600 dark:text-orange-400 mb-3">
                      {pkg.price}
                    </div>
                    <p className="text-orange-800 dark:text-orange-200">
                      {pkg.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.2) + (idx * 0.1) }}
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                        <span className="text-orange-800 dark:text-orange-200">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30' 
                        : 'bg-orange-100 dark:bg-orange-900/50 text-orange-900 dark:text-orange-100 hover:bg-orange-200 dark:hover:bg-orange-900/70'
                    }`}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Pink & Rose Theme with Marquee */}
      <section id="testimonials" className="min-h-screen py-20 md:py-32 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-pink-950 dark:via-rose-950 dark:to-red-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-32 left-20 w-72 h-72 bg-pink-200/30 dark:bg-pink-800/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-20 w-96 h-96 bg-rose-200/30 dark:bg-rose-800/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-pink-900 dark:text-pink-100 mb-6">
              Client Success Stories
            </h2>
            <p className="text-lg md:text-xl text-pink-800 dark:text-pink-200 max-w-4xl mx-auto leading-relaxed">
              Join hundreds of satisfied clients who have transformed their businesses with our solutions
            </p>
          </motion.div>
        </div>

        {/* Scrolling Testimonials Marquee */}
        <div className="space-y-8">
          {/* First Row - Left to Right */}
          <Marquee direction="left" speed={40} className="py-4">
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div
                key={`left-${index}`}
                className="mx-4 w-80 bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/40 dark:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-pink-800 dark:text-pink-200 mb-4 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-bold text-pink-900 dark:text-pink-100">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-pink-700 dark:text-pink-300">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </Marquee>

          {/* Second Row - Right to Left */}
          <Marquee direction="right" speed={45} className="py-4">
            {testimonials.slice().reverse().concat(testimonials.slice().reverse()).map((testimonial, index) => (
              <div
                key={`right-${index}`}
                className="mx-4 w-80 bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/40 dark:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-pink-800 dark:text-pink-200 mb-4 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-bold text-pink-900 dark:text-pink-100">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-pink-700 dark:text-pink-300">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* FAQ Section - Teal & Cyan Theme */}
      <section className="min-h-screen py-20 md:py-32 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-950 dark:via-cyan-950 dark:to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-80 h-80 bg-teal-200/30 dark:bg-teal-800/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-200/30 dark:bg-cyan-800/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-teal-900 dark:text-teal-100 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-teal-800 dark:text-teal-200 max-w-4xl mx-auto leading-relaxed">
              Everything you need to know about our services, process, and commitment to your success
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "How long does it take to build a website?",
                answer: "A basic website typically takes 7-10 days once we have all your content and requirements. More complex projects with e-commerce or custom features may take 2-3 weeks. We provide regular updates throughout the process."
              },
              {
                question: "Do you provide hosting and domain services?",
                answer: "We provide guidance and setup assistance for hosting and domains. While we don't directly provide hosting, we help you choose the best options for your needs and set everything up for you, ensuring optimal performance."
              },
              {
                question: "Can I update my website content myself?",
                answer: "Absolutely! We build user-friendly websites that allow you to easily update content, images, and basic information without technical knowledge. We also provide training and documentation."
              },
              {
                question: "What makes Alex different from other chatbots?",
                answer: "Alex is specifically trained on your business and services. Unlike generic chatbots, Alex understands your customers' needs and can provide personalized, helpful responses 24/7, increasing conversion rates."
              },
              {
                question: "Do you offer ongoing support and maintenance?",
                answer: "Yes! We provide ongoing support and maintenance packages to keep your website secure, updated, and running smoothly. Support is included in our Enterprise package, with options available for all plans."
              },
              {
                question: "What is your refund policy?",
                answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with our work, we'll either revise it to meet your expectations or provide a full refund. Your success is our priority."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-2xl p-6 md:p-8 border border-white/40 dark:border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-lg md:text-xl font-bold text-teal-900 dark:text-teal-100 mb-4">
                  {faq.question}
                </h3>
                <p className="text-teal-800 dark:text-teal-200 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Back to Black & Silver */}
      <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:from-black dark:via-gray-900 dark:to-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="col-span-1 md:col-span-2">
              <motion.div 
                className="text-3xl md:text-4xl font-black text-white dark:text-white mb-6"
                whileHover={{ scale: 1.05 }}
              >
                Webvantic
              </motion.div>
              <p className="text-gray-300 dark:text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                Transforming businesses with modern websites and AI-powered customer support. 
                Your success is our mission, your growth is our achievement.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400 dark:text-gray-400 font-medium">
                  Powered by Alex AI
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Services</h4>
              <ul className="space-y-3 text-gray-300 dark:text-gray-300">
                <li><a href="#" className="hover:text-white dark:hover:text-white transition-colors">Website Development</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-white transition-colors">AI Integration</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-white transition-colors">E-commerce</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-white transition-colors">SEO Optimization</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-gray-300 dark:text-gray-300">
                <li><a href="#" className="hover:text-white dark:hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-white transition-colors">Our Work</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 dark:border-gray-700 mt-12 pt-8 text-center text-gray-400 dark:text-gray-400">
            <p className="text-lg">&copy; 2025 Webvantic. All rights reserved. Built with ❤️ by Aflah Dev.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}