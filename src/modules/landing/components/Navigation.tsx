import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation({ isNavVisible = true }: { isNavVisible?: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignIn = location.pathname === "/login" || location.pathname === "/signin";
  const isSignUp = location.pathname === "/signup";
  const isPostSignup = location.pathname === "/post-signup";
  const isPlanOnboarding = location.pathname === "/plan-onboarding";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Only render nav on allowed pages
  if (isPostSignup || isPlanOnboarding) return null;

  // Helper for smooth scroll
  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        // If not on landing, go home and scroll after navigation
        navigate(`/#${id}`);
        setTimeout(() => {
          const el2 = document.getElementById(id);
          if (el2) el2.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }, 100);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-white/90 via-white/95 to-white/90 backdrop-blur-xl border-b border-slate-200/30 shadow-lg transition-transform duration-300 ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
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
            <button onClick={() => handleScrollTo("features")} className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group bg-transparent border-none outline-none cursor-pointer">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button onClick={() => handleScrollTo("demo")} className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group bg-transparent border-none outline-none cursor-pointer">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button onClick={() => handleScrollTo("pricing")} className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group bg-transparent border-none outline-none cursor-pointer">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button onClick={() => handleScrollTo("testimonials")} className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group bg-transparent border-none outline-none cursor-pointer">
              Reviews
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
            </button>
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
          {/* Mobile Navigation - Burger/X toggle */}
          <div className="md:hidden flex items-center">
            <button
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0E7CFF]"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? (
                <X className="h-8 w-8 text-[#0E7CFF] transition-all duration-200" />
              ) : (
                <Menu className="h-8 w-8 text-[#0E7CFF] transition-all duration-200" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      <div className={`fixed left-0 right-0 top-16 z-[10001] flex justify-center transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        style={{ willChange: 'transform, opacity' }}>
        <div className="bg-white rounded-b-2xl p-8 w-full max-w-[600px] flex flex-col items-center space-y-10 max-h-[80vh] overflow-y-auto" style={{ boxShadow: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
          <button onClick={() => handleScrollTo("features")} className="text-xl font-bold text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 w-full text-center">Features</button>
          <button onClick={() => handleScrollTo("demo")} className="text-xl font-bold text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 w-full text-center">How It Works</button>
          <button onClick={() => handleScrollTo("pricing")} className="text-xl font-bold text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 w-full text-center">Pricing</button>
          <button onClick={() => handleScrollTo("testimonials")} className="text-xl font-bold text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 w-full text-center">Reviews</button>
          {!isSignIn && (
            <Link to="/signin" className="text-xl font-bold text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 w-full text-center" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
          )}
          <Button className="w-full bg-gradient-to-r from-[#0E7CFF] to-[#0B1C2D] hover:from-[#0B1C2D] hover:to-[#0E7CFF] text-white transition-all duration-300 rounded-full px-8 py-4 border border-white/20 text-xl font-bold mt-2" onClick={() => { setMobileMenuOpen(false); window.open('https://calendly.com/serviceagent/30min', '_blank'); }}>
            Book Demo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
