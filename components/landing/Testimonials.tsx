'use client';

import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const row1 = [
    {
      name: 'Sarah Johnson',
      role: 'Restaurant Owner',
      content:
        'Alex transformed our online presence completely. Orders increased by 300% within the first month!',
      rating: 5,
      company: 'Bistro Delight',
    },
    {
      name: 'Michael Chen',
      role: 'E-commerce Entrepreneur',
      content:
        "The AI support bot handles 80% of our customer queries. It's like having a 24/7 customer service team.",
      rating: 5,
      company: 'TechGear Pro',
    },
    {
      name: 'Priya Sharma',
      role: 'Consultant',
      content:
        "Professional, affordable, and delivered exactly what was promised. Couldn't be happier with my new website.",
      rating: 5,
      company: 'Business Solutions Inc',
    },
  ];

  const row2 = [
    {
      name: 'David Martinez',
      role: 'Fitness Coach',
      content:
        'The website boosted my client bookings by 250%. Alex handles all the initial inquiries perfectly.',
      rating: 5,
      company: 'FitLife Studio',
    },
    {
      name: 'Emma Thompson',
      role: 'Online Retailer',
      content:
        'Amazing turnaround time and the e-commerce features are exactly what we needed for our growing business.',
      rating: 5,
      company: 'Artisan Crafts',
    },
    {
      name: 'James Wilson',
      role: 'Tech Startup Founder',
      content:
        'The technical excellence and attention to detail exceeded our expectations. Highly recommended!',
      rating: 5,
      company: 'InnovateNow',
    },
  ];

  const Card = ({ t }: { t: typeof row1[number] }) => (
    <div className="mx-3 lg:mx-4 w-64 lg:w-80 glass-card rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-lg flex-shrink-0 will-change-transform">
      <div className="flex items-center gap-1 mb-3 lg:mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="w-3 lg:w-4 h-3 lg:h-4 text-yellow-500 fill-current" />
        ))}
      </div>
      <p className="opacity-80 mb-3 lg:mb-4 italic leading-relaxed text-xs lg:text-sm">"{t.content}"</p>
      <div>
        <div className="font-bold text-sm lg:text-base">{t.name}</div>
        <div className="text-xs lg:text-sm opacity-70">
          {t.role} • {t.company}
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="testimonials"
      className="min-h-screen py-16 lg:py-20 relative overflow-hidden section-container"
      data-theme="sapphire"
      style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute top-32 left-20 w-48 lg:w-72 h-48 lg:h-72 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div
          className="absolute bottom-32 right-20 w-64 lg:w-96 h-64 lg:h-96 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 lg:mb-12">
        <div className="text-center mb-12 lg:mb-16 section-enter">
          <h2 className="section-title font-black mb-4 lg:mb-6 text-morph">Client Success Stories</h2>
          <p className="section-subtitle opacity-80 max-w-4xl mx-auto leading-relaxed">
            Join hundreds of satisfied clients who have transformed their businesses with our solutions
          </p>
        </div>
      </div>

      {/* Marquee Testimonials */}
      <div className="space-y-6 lg:space-y-8 relative z-10">
        {/* First Row - Left to Right */}
        <div className="marquee">
          <div className="marquee-content">
            {[...Array(2)].map((_, setIndex) =>
              row1.map((t, index) => <Card key={`left-${setIndex}-${index}`} t={t} />),
            )}
          </div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="marquee">
          <div className="marquee-content reverse">
            {[...Array(2)].map((_, setIndex) =>
              row2.map((t, index) => <Card key={`right-${setIndex}-${index}`} t={t} />),
            )}
          </div>
        </div>
      </div>

      {/* Distributed navigation: Contact button lives here for context */}
      <div className="text-center mt-12 lg:mt-16 section-enter relative z-10">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base font-semibold btn-primary rounded-xl lg:rounded-2xl"
        >
          Contact & Reviews Support
        </a>
      </div>
    </section>
  );
}