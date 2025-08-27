import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openCalendly } from "@/app/shared/utils/calendly";

export function Navigation({ isNavVisible = true }: { isNavVisible?: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignIn = location.pathname === "/login" || location.pathname === "/signin";
  const isSignUp = location.pathname === "/signup";
  const isPostSignup = location.pathname === "/post-signup";
  const isPlanOnboarding = location.pathname === "/plan-onboarding";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const industriesRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (industriesRef.current && !industriesRef.current.contains(event.target as Node)) {
        setIndustriesOpen(false);
      }
    }
    if (industriesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [industriesOpen]);

  // Auto-close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div className="relative mx-auto max-w-7xl lg:max-w-full px-2 sm:px-6 lg:px-12">
        <div className="flex items-center justify-start h-24 md:h-20">
          <div className="flex items-center">
            <Link to="/" aria-label="ServiceAgent Home" className="flex items-center min-w-32">
            <img
              src="/Banner_SA_new.svg"
              alt="ServiceAgent Logo"
              className="block w-3/4 md:w-full sm:h-6 md:h-20 transition-all duration-200"
            />
          </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center md:flex-1 ml-2 md:ml-4">
            <div className="flex items-center justify-end space-x-4 lg:space-x-6 xl:space-x-8 w-full text-lg md:text-xl">
            <button onClick={() => handleScrollTo("features")} className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group bg-transparent border-none outline-none cursor-pointer">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button onClick={() => handleScrollTo("demo")} className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group bg-transparent border-none outline-none cursor-pointer">
              Tour
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
            </button>
            {/* Industries Dropdown */}
            <div className="relative" ref={industriesRef}>
              <button
                className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group bg-transparent border-none outline-none cursor-pointer flex items-center"
                onClick={() => setIndustriesOpen((open) => !open)}
                aria-expanded={industriesOpen}
                aria-haspopup="true"
                type="button"
              >
                Industries
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
              </button>
              {industriesOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 z-50" style={{top: '100%'}}>
                  <ul className="py-2">
                    {[
                      { label: 'Residential Cleaning', path: '/industries/residential-cleaning' },
                      { label: 'Commercial Cleaning', path: '/industries/commercial-cleaning' },
                      { label: 'HVAC', path: '/industries/hvac' },
                      { label: 'Plumbing', path: '/industries/plumbing' },
                      { label: 'Landscaping', path: '/industries/landscaping' },
                      { label: 'Pest Control', path: '/industries/pest-control' },
                      { label: 'Franchises', path: '/industries/franchises' },
                      { label: 'Staffing', path: '/industries/staffing' },
                      { label: 'Outsourcing Firms', path: '/industries/outsourcing-firms' },
                      { label: 'Restaurants', path: '/industries/restaurants' },
                      { label: 'Hospitality', path: '/industries/hospitality' },
                    ].map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className="block px-5 py-2 text-slate-700 hover:bg-blue-50 hover:text-[#0E7CFF] transition-all duration-200 rounded-lg"
                          onClick={() => setIndustriesOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button onClick={() => handleScrollTo("pricing")} className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group bg-transparent border-none outline-none cursor-pointer">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
            </button>
            {!isSignIn && (
            <Link
                to="/signin" 
                className="whitespace-nowrap text-center text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group"
            >
              Sign in
            </Link>
            )}
            <button onClick={openCalendly} className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group bg-transparent border-none outline-none cursor-pointer">
              Get a Demo
            </button>
            {/* Start Trial Button */}
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-purple-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-2 md:px-8 py-6 border border-white/20 text-lg md:text-xl">
                Start Free Trial
              </Button>
            </Link>
            </div>
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
      {mobileMenuOpen && (
        <div className={`md:hidden fixed left-0 right-0 top-24 z-[10001] flex justify-center transition-all duration-300 opacity-100 translate-y-0 pointer-events-auto`}
          style={{ willChange: 'transform, opacity' }}>
          <div className="bg-white rounded-b-2xl p-8 w-full max-w-[600px] flex flex-col items-center space-y-10 max-h-[80vh] overflow-y-auto" style={{ boxShadow: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
            <button onClick={openCalendly} className="text-xl font-bold text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 w-full text-center">Get A Demo</button>
            <button onClick={() => handleScrollTo("demo")} className="text-xl font-bold text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 w-full text-center">Tour</button>
            <button onClick={() => handleScrollTo("pricing")} className="text-xl font-bold text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 w-full text-center">Pricing</button>
            {!isSignIn && (
              <Link to="/signin" className="text-xl font-bold text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 w-full text-center" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
            )}
            <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r bg-blue-600 hover:bg-purple-400 text-white transition-all duration-300 rounded-full px-8 py-4 text-xl font-bold mt-2">
                Start Free Trial
              </Button>
            </Link>
            
          </div>
        </div>
      )}
    </nav>
  );
}
