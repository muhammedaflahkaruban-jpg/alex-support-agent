'use client';

import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';

export default function Pricing() {
  const packages = [
    {
      name: 'Basic',
      price: '₹3,999',
      description: 'Perfect for small businesses and startups',
      features: [
        '5 Sections (Home, About, Services, Portfolio, Contact)',
        'Responsive Design',
        'Contact Form',
        'Basic SEO Setup',
        '7-10 Days Delivery',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: '₹7,999',
      description: 'Ideal for growing businesses',
      features: [
        'Everything in Basic',
        'E-commerce Functionality',
        'Blog Setup',
        'Advanced Animations',
        'Social Media Integration',
        'Google Analytics',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '₹15,999',
      description: 'Complete solution for established businesses',
      features: [
        'Everything in Professional',
        'Advanced AI Bot Integration',
        'Custom Email System',
        'Advanced SEO',
        'Priority Support',
        'Maintenance Package',
      ],
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="min-h-screen py-16 lg:py-20 relative overflow-hidden section-container"
      data-theme="amber"
      style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-10 w-64 lg:w-96 h-64 lg:h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div
          className="absolute bottom-20 right-10 w-56 lg:w-80 h-56 lg:h-80 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16 section-enter">
          <h2 className="section-title font-black mb-4 lg:mb-6 text-morph">Investment Plans</h2>
          <p className="section-subtitle opacity-80 max-w-4xl mx-auto leading-relaxed">
            Choose the perfect package for your business growth. Transparent pricing, exceptional value, guaranteed results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`relative section-enter ${pkg.popular ? 'lg:scale-105' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-4 lg:-top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <span
                    className="text-white px-4 lg:px-6 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-bold shadow-lg"
                    style={{ backgroundColor: 'var(--theme-accent)' }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`h-full glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl border-2 ${
                  pkg.popular ? 'border-current' : 'border-transparent'
                }`}
                style={{
                  borderColor: pkg.popular ? 'var(--theme-accent)' : 'transparent',
                }}
              >
                <div className="text-center mb-6 lg:mb-8">
                  <h3 className="text-xl lg:text-2xl font-black mb-2 lg:mb-3">{pkg.name}</h3>
                  <div
                    className="text-3xl lg:text-4xl font-black mb-2 lg:mb-3"
                    style={{ color: 'var(--theme-accent)' }}
                  >
                    {pkg.price}
                  </div>
                  <p className="opacity-80 text-sm lg:text-base">{pkg.description}</p>
                </div>

                <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-4 lg:w-5 h-4 lg:h-5 text-green-500 flex-shrink-0" />
                      <span className="opacity-80 text-xs lg:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl text-sm lg:text-base font-bold transition-all duration-300 ${
                    pkg.popular ? 'btn-primary text-white shadow-lg' : 'glass-card hover:bg-opacity-30'
                  }`}
                  style={{
                    backgroundColor: pkg.popular ? 'var(--theme-accent)' : `rgba(var(--theme-accent-rgb), 0.1)`,
                    color: pkg.popular ? 'white' : 'var(--theme-accent)',
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Book Consultation Button */}
        <div className="text-center mt-12 lg:mt-16 section-enter">
          <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base font-semibold rounded-xl lg:rounded-2xl glass-card hover:scale-105 transition-all duration-300">
            <Calendar className="w-4 lg:w-5 h-4 lg:h-5" />
            Book Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}