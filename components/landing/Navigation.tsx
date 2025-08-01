'use client';

import React from 'react';
import { Moon } from 'lucide-react';

export default function Navigation() {
  return (
    <nav
      className="fixed top-0 w-full backdrop-blur-xl z-50 border-b transition-all duration-500"
      style={{
        backgroundColor: `rgba(var(--theme-accent-rgb), 0.05)`,
        borderColor: `rgba(var(--theme-accent-rgb), 0.1)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div
            className="text-xl lg:text-2xl font-black text-morph"
            style={{ color: 'var(--theme-accent)' }}
          >
            Webvantic
          </div>
          <div className="flex items-center gap-3 lg:gap-6">
            <div className="hidden md:flex items-center gap-6">
              <a
                href="#services"
                className="text-sm lg:text-base font-medium opacity-80 hover:opacity-100 transition-opacity"
              >
                Services
              </a>
              <a
                href="#features"
                className="text-sm lg:text-base font-medium opacity-80 hover:opacity-100 transition-opacity"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-sm lg:text-base font-medium opacity-80 hover:opacity-100 transition-opacity"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-sm lg:text-base font-medium opacity-80 hover:opacity-100 transition-opacity"
              >
                Reviews
              </a>
            </div>
            <button
              className="p-2 lg:p-3 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: `rgba(var(--theme-accent-rgb), 0.1)` }}
              aria-label="Toggle theme"
            >
              <Moon className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}