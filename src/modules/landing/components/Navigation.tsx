import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const location = useLocation();
  // Determine if on sign in or sign up page
  const isSignIn = location.pathname === "/login" || location.pathname === "/signin";
  const isSignUp = location.pathname === "/signup";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/90 via-white/95 to-white/90 backdrop-blur-xl border-b border-slate-200/30 shadow-lg">
      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#A1E3FF]/5 via-transparent to-[#0E7CFF]/5 pointer-events-none"></div>
      <div className="relative container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center ml-6">
            <Link to="/" aria-label="ServiceAgent Home" className="flex items-center">
            <img
              src="/Banner_SA_new.svg"
              alt="ServiceAgent Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#features" className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/#demo" className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/#pricing" className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/#testimonials" className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group">
              Reviews
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
          </Link>
            {!isSignIn && (
              <Link 
                to="/signin" 
                className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group"
              >
                Sign In
              </Link>
            )}
            {/* Book Demo Button */}
            <Button className="bg-gradient-to-r from-[#0E7CFF] to-[#0B1C2D] hover:from-[#0B1C2D] hover:to-[#0E7CFF] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-2 border border-white/20 group" onClick={() => window.open('https://calendly.com/serviceagent/30min', '_blank')}>
              Book Demo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          {/* Mobile Navigation - Only Sign In and Book Demo */}
          <div className="md:hidden flex items-center space-x-4">
            {!isSignIn && (
            <Link
                to="/signin" 
                className="bg-gradient-to-r from-[#0E7CFF] to-[#0B1C2D] hover:from-[#0B1C2D] hover:to-[#0E7CFF] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-2 border border-white/20"
            >
                Sign In
            </Link>
            )}
            <Button size="sm" className="bg-gradient-to-r from-[#0E7CFF] to-[#0B1C2D] hover:from-[#0B1C2D] hover:to-[#0E7CFF] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-4 py-2 border border-white/20 group" onClick={() => window.open('https://calendly.com/serviceagent/30min', '_blank')}>
              Book Demo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
