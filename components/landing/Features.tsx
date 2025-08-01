'use client';

import React from 'react';
import { Heart, Rocket, Shield, Smartphone, Target, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Zap className="w-6 lg:w-8 h-6 lg:h-8" />,
      title: 'Lightning Performance',
      description: 'Optimized for speed and performance across all devices with cutting-edge technology.',
    },
    {
      icon: <Shield className="w-6 lg:w-8 h-6 lg:h-8" />,
      title: 'Enterprise Security',
      description: 'Built with security best practices and reliable hosting infrastructure for peace of mind.',
    },
    {
      icon: <Smartphone className="w-6 lg:w-8 h-6 lg:h-8" />,
      title: 'Mobile Excellence',
      description: 'Perfect viewing experience on all screen sizes with responsive design principles.',
    },
    {
      icon: <Rocket className="w-6 lg:w-8 h-6 lg:h-8" />,
      title: 'Future-Ready Code',
      description: 'Well-structured, maintainable code following industry standards and best practices.',
    },
    {
      icon: <Heart className="w-6 lg:w-8 h-6 lg:h-8" />,
      title: 'User-Centric Design',
      description: 'Designed with user experience and conversion optimization at the core of everything.',
    },
    {
      icon: <Target className="w-6 lg:w-8 h-6 lg:h-8" />,
      title: 'Goal-Oriented Results',
      description: 'Every element strategically designed to achieve your specific business objectives.',
    },
  ];

  return (
    <section
      id="features"
      className="min-h-[calc(100vh-4rem)] py-4 relative overflow-hidden section-container flex flex-col justify-center"
      data-theme="royal"
      style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute top-32 right-20 w-40 lg:w-64 h-40 lg:h-64 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div
          className="absolute bottom-32 left-20 w-56 lg:w-80 h-56 lg:h-80 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-48 lg:w-72 h-48 lg:h-72 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-center">
        <div className="text-center mb-6 lg:mb-8 section-enter">
          <h2 className="section-title font-black mb-3 lg:mb-4 text-morph">
            Why Choose Excellence
          </h2>
          <p className="section-subtitle opacity-80 max-w-3xl mx-auto leading-relaxed">
            We deliver exceptional web experiences with cutting-edge technology, innovative design, and unmatched performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 max-w-6xl mx-auto w-full">
          {features.map((feature) => (
            <div key={feature.title} className="relative section-enter">
              <div className="relative h-full min-h-[220px] md:min-h-[240px] lg:min-h-[260px] glass-card rounded-xl lg:rounded-2xl p-5 lg:p-6 flex flex-col">
                <div className="relative mb-4">
                  <div
                    className="w-12 lg:w-14 h-12 lg:h-14 rounded-xl flex items-center justify-center mx-auto shadow-lg text-white"
                    style={{ backgroundColor: 'var(--theme-accent)' }}
                  >
                    {feature.icon}
                  </div>
                </div>

                <div className="flex-1 flex flex-col text-center">
                  <h3 className="text-base lg:text-lg font-black mb-2 lg:mb-3">
                    {feature.title}
                  </h3>
                  <p className="opacity-80 leading-relaxed text-sm lg:text-sm flex-1">
                    {feature.description}
                  </p>
                </div>

                <div
                  className="absolute top-2 lg:top-3 right-2 lg:right-3 w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full"
                  style={{ backgroundColor: `rgba(var(--theme-accent-rgb), 0.6)` }}
                />
                <div
                  className="absolute bottom-2 lg:bottom-3 left-2 lg:left-3 w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full"
                  style={{ backgroundColor: `rgba(var(--theme-accent-rgb), 0.6)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}