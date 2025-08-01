'use client';

import React from 'react';
import { ArrowRight, CheckCircle, Globe, MessageCircle, Search, ShoppingCart } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Globe className="w-6 lg:w-8 h-6 lg:h-8" />,
      title: 'Website Development',
      description:
        'Custom, responsive websites built with modern technologies for optimal performance and user experience.',
      features: ['• Responsive Design', '• Lightning Fast', '• SEO Optimized', '• Mobile First'],
    },
    {
      icon: <MessageCircle className="w-6 lg:w-8 h-6 lg:h-8" />,
      title: 'AI Support Integration',
      description:
        'Intelligent chatbots like Alex to handle customer queries 24/7 automatically with smart responses.',
      features: ['• 24/7 Availability', '• Smart AI Responses', '• Lead Generation', '• Customer Support'],
    },
    {
      icon: <ShoppingCart className="w-6 lg:w-8 h-6 lg:h-8" />,
      title: 'E-commerce Solutions',
      description:
        'Complete online stores with secure payment processing and comprehensive inventory management.',
      features: ['• Payment Gateway', '• Inventory System', '• Order Management', '• Real-time Analytics'],
    },
    {
      icon: <Search className="w-6 lg:w-8 h-6 lg:h-8" />,
      title: 'SEO Optimization',
      description:
        'Boost your online visibility with comprehensive search engine optimization and content strategy.',
      features: ['• Keyword Research', '• Content Strategy', '• Technical SEO', '• Performance Tracking'],
    },
  ];

  return (
    <section
      id="services"
      className="min-h-screen py-8 md:py-12 lg:py-16 relative overflow-hidden section-container flex flex-col justify-center"
      data-theme="emerald"
      style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-10 w-48 lg:w-72 h-48 lg:h-72 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div
          className="absolute bottom-20 right-10 w-64 lg:w-96 h-64 lg:h-96 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-56 lg:w-80 h-56 lg:h-80 rounded-full blur-3xl opacity-10 transform -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-center">
        <div className="text-center mb-8 lg:mb-12 section-enter">
          <h2 className="section-title font-black mb-3 lg:mb-4 text-morph morph-target">Our Services</h2>
          <p className="section-subtitle opacity-80 max-w-3xl mx-auto leading-relaxed">
            Comprehensive web solutions designed to elevate your business and engage your customers with cutting-edge
            technology
          </p>
        </div>

        {/* Responsive grid: 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto w-full mb-8 lg:mb-12">
          {services.map((service) => (
            <div key={service.title} className="section-enter">
              <div className="relative h-[280px] md:h-[320px] lg:h-[350px] service-card">
                {/* Card background */}
                <div className="glass-card rounded-xl lg:rounded-2xl shadow-2xl h-full absolute inset-0" />

                {/* Card content */}
                <div className="relative p-4 lg:p-6 h-full flex flex-col">
                  {/* Icon */}
                  <div className="relative mb-4">
                    <div
                      className="w-12 lg:w-14 h-12 lg:h-14 rounded-xl icon-wrap backdrop-blur-sm border glass-card flex items-center justify-center"
                      style={{
                        backgroundColor: `rgba(var(--theme-accent-rgb), 0.15)`,
                        borderColor: `rgba(var(--theme-accent-rgb), 0.3)`,
                        color: 'var(--theme-accent)',
                      }}
                    >
                      {service.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base lg:text-lg font-black mb-3 lg:mb-4">{service.title}</h3>

                  {/* Description */}
                  <p className="text-xs lg:text-sm opacity-80 mb-4 lg:mb-6 leading-relaxed flex-1">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div
                          className="w-4 lg:w-5 h-4 lg:h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                          style={{ backgroundColor: 'var(--theme-accent)' }}
                        >
                          <CheckCircle className="w-2.5 lg:w-3 h-2.5 lg:h-3" />
                        </div>
                        <span className="text-xs lg:text-sm opacity-80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA fab */}
                  <div
                    className="absolute bottom-3 lg:bottom-4 right-3 lg:right-4 w-8 lg:w-10 h-8 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg text-white cta-fab"
                    style={{ backgroundColor: 'var(--theme-accent)' }}
                    aria-label="View service"
                  >
                    <ArrowRight className="w-4 lg:w-5 h-4 lg:h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Button */}
        <div className="text-center section-enter">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base font-semibold btn-primary rounded-xl lg:rounded-2xl"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </section>
  );
}