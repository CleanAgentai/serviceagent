import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Clock, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0B1C2D] via-[#0E7CFF] to-[#0B1C2D] overflow-hidden">
      {/* Enhanced Background Elements with ServiceAgent Colors */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#A1E3FF]/40 to-transparent rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#0E7CFF]/30 to-transparent rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#A1E3FF]/20 to-transparent rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#0B1C2D]/10 via-transparent to-[#0E7CFF]/10 animate-gradient-shift"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-16">
        {/* Navigation/Header */}
        <nav className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/90 via-white/95 to-white/90 backdrop-blur-xl border-b border-slate-200/30 shadow-lg transition-transform duration-300 ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#A1E3FF]/5 via-transparent to-[#0E7CFF]/5"></div>
          <div className="relative container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center ml-6">
                  <img 
                    src="/Banner_SA_new.svg" 
                    alt="ServiceAgent Logo" 
                    className="h-12 w-auto"
                  />
                </div>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group">
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
                </a>
                <button onClick={() => scrollToSection('demo')} className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group">
                  How It Works
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
                </button>
                <a href="#pricing" className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group">
                  Pricing
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#testimonials" className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group">
                  Reviews
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
                </a>
                <Link to="/signin" className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group">
                  Sign In
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Button className="bg-gradient-to-r from-[#0E7CFF] to-[#0B1C2D] hover:from-[#0B1C2D] hover:to-[#0E7CFF] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-2 border border-white/20" onClick={() => window.open('https://calendly.com/serviceagent/30min', '_blank')}>
                  Book Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <a 
                  href="https://x.com/porter2301" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                  aria-label="Follow us on X (formerly Twitter)"
                >
                  {/* X icon here */}
                </a>
              </div>
              {/* Mobile Navigation - Only Sign In and Book Demo */}
              <div className="md:hidden flex items-center space-x-4">
                <Link to="/signin" className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 font-medium">
                  Sign In
                </Link>
                <Button size="sm" className="bg-gradient-to-r from-[#0E7CFF] to-[#0B1C2D] hover:from-[#0B1C2D] hover:to-[#0E7CFF] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-4 py-2 border border-white/20" onClick={() => window.open('https://calendly.com/serviceagent/30min', '_blank')}>
                  Book Demo
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Enhanced Hero Content */}
        <div className="max-w-4xl mx-auto text-center mt-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Hire Better Hourly Workers
              <br />
              <span className="text-[#A1E3FF]">10x Faster</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Turn your recruiting process on autopilot. Source, interview, and qualify candidates at scale - so you only spend time making the final call.
            </p>
            {/* Key Statistics Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-[#A1E3FF] mr-2" />
                  <span className="text-2xl font-bold text-white">92%</span>
                </div>
                <p className="text-sm text-white/80">Faster time-to-hire</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-6 w-6 text-[#A1E3FF] mr-2" />
                  <span className="text-2xl font-bold text-white">87%</span>
                </div>
                <p className="text-sm text-white/80">Cost reduction</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-[#A1E3FF] mr-2" />
                  <span className="text-2xl font-bold text-white">5x</span>
                </div>
                <p className="text-sm text-white/80">Better candidates</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="bg-white hover:bg-gray-50 text-[#0B1C2D] shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-12 py-6 text-lg font-semibold border border-white/30 group" onClick={() => window.open('https://calendly.com/serviceagent/30min', '_blank')}>
                Book Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform text-[#0B1C2D]" />
              </Button>
              <Button size="lg" variant="outline" className="px-12 py-6 text-lg font-semibold rounded-full border-2 border-white bg-white/10 text-white hover:border-white hover:bg-white hover:text-[#0B1C2D] transition-all duration-300 backdrop-blur-sm" onClick={() => scrollToSection('demo')}>
                See How It Works
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/70 cursor-pointer hover:text-white transition-colors" onClick={() => scrollToSection('stats')} />
        </div>
      </div>
    </section>
  );
};

export default Hero; 