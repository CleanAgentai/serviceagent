import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navClasses = `sticky top-0 z-50 transition-all duration-200 transform ${
    hidden ? "-translate-y-full" : "translate-y-0"
  } ${
    scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
  } border-b border-gray-200`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14 md:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="ServiceAgent Home"
          >
            <img
              src="/Banner_SA_new.svg"
              alt="ServiceAgent Logo"
              className="h-10 sm:h-10 md:h-10 w-auto"
            />
            {/* <span className="text-lg sm:text-xl font-semibold text-gray-900"></span> */}
          </Link>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm whitespace-nowrap"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-gradient-to-r from-[#3DA6C7] to-[#1E529D] 
           hover:from-[#3099BC] hover:to-[#17467F] 
           text-white rounded-lg transition-all duration-300 
           shadow-md hover:shadow-xl text-sm whitespace-nowrap"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
