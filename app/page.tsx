'use client'
import React, { useEffect, useRef, useState } from 'react';

import Navigation from '@/components/landing/Navigation';
import Hero from '@/components/landing/Hero';
import Services from '@/components/landing/Services';
import Features from '@/components/landing/Features';
import Pricing from '@/components/landing/Pricing';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/landing/Footer';

export default function WebvanticLanding() {
  const [currentTheme, setCurrentTheme] = useState('platinum');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll('[data-theme]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const theme = entry.target.getAttribute('data-theme');
            if (theme) {
              setCurrentTheme(theme);
              document.documentElement.setAttribute('data-current-theme', theme);
            }
          }
        });
      },
      {
        threshold: [0.5],
        rootMargin: '-20% 0px -20% 0px',
      }
    );
    observerRef.current = observer;

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return (
    <>

      <div className="min-h-screen">
        {/* Navigation */}
        <Navigation />

       <Hero/>
        {/* Services Section */}
        <Services/>
        {/* About Section */}
       

        {/* Features Section */}
        <Features/>

        {/* Pricing Section */}
        <Pricing/>

        {/* Testimonials Section with Marquee */}
        <Testimonials/>

        {/* Footer */}
       <Footer/>
      </div>
    </>
  );
}