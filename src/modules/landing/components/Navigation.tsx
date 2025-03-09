import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { openCalendly } from '@/app/shared/utils/calendly';

export function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  // Handle scroll events for header behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if header should be visible
      if (currentScrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navClasses = `sticky top-0 z-50 transition-all duration-200 transform ${
    hidden ? '-translate-y-full' : 'translate-y-0'
  } ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'} border-b border-gray-200`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14 md:h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="CleanAgent Home"
          >
            <img
              src="/robot-icon.png"
              alt=""
              className="h-6 w-auto sm:h-7 md:h-8"
              loading="eager"
              width="24" 
              height="24"
            />
            <span className="text-base sm:text-lg md:text-xl font-bold ml-1 sm:ml-1.5">
              <span className="text-blue-600">Clean</span>
              <span className="text-blue-600">Agent</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={scrollToSection('complete-ai-solution')}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm whitespace-nowrap"
            >
              Features
            </button>
            <button
              onClick={scrollToSection('pricing')}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm whitespace-nowrap"
            >
              Pricing
            </button>
            <Link
              to="/about-us"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm whitespace-nowrap"
            >
              About Us
            </Link>
            <Link
              to="/blog"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm whitespace-nowrap"
            >
              Blog
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm mr-2 sm:mr-4 whitespace-nowrap"
            >
              Sign In
            </Link>
            <button
              onClick={openCalendly}
              className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 transition-all duration-300 whitespace-nowrap"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 