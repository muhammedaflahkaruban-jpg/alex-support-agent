"use client"

import { 
  Rocket, 
  Zap,
  Shield,
  Smartphone,
  Heart,
  Target,
  
} from 'lucide-react';

import { motion } from "framer-motion"
import { useMemo } from 'react';

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

export function FeaturesSection() {
  return (<section id="features" className="min-h-screen py-20 md:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
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
  )
}
