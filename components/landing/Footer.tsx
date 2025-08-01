'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 lg:py-16" data-theme="sapphire">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl lg:text-3xl font-black text-white mb-4 lg:mb-6">
              Webvantic
            </div>
            <p className="text-gray-300 mb-6 lg:mb-8 max-w-md text-sm lg:text-base leading-relaxed">
              Transforming businesses with modern websites and AI-powered customer support. 
              Your success is our mission, your growth is our achievement.
            </p>
            <div className="flex items-center gap-4">
              <div className="text-xs lg:text-sm text-gray-400 font-medium">
                Powered by Alex AI
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 lg:mb-6 text-sm lg:text-base">Services</h4>
            <ul className="space-y-2 lg:space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors text-xs lg:text-sm">Website Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-xs lg:text-sm">AI Integration</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-xs lg:text-sm">E-commerce</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-xs lg:text-sm">SEO Optimization</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 lg:mb-6 text-sm lg:text-base">Company</h4>
            <ul className="space-y-2 lg:space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors text-xs lg:text-sm">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-xs lg:text-sm">Our Work</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-xs lg:text-sm">Testimonials</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-xs lg:text-sm">Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 lg:mt-12 pt-6 lg:pt-8 text-center text-gray-400">
          <p className="text-sm lg:text-base">&copy; 2025 Webvantic. All rights reserved. Built with ❤️ by Aflah Dev.</p>
        </div>
      </div>
    </footer>
  );
}