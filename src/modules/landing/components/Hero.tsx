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

      <div className="relative z-0 container mx-auto px-4 pt-16 pb-16">
        {/* Enhanced Hero Content */}
        <div className="max-w-7xl mx-auto text-center mt-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Reducing Time-To-Hire
              <br />
              <span className="text-[#A1E3FF]">By 85%</span>
            </h1>
            <h2 className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              ServiceAgent cuts your hiring cycle from 3 weeks to 3 days. 
              <br />
              Our AI instantly interviews every applicant using video and chat, ranks them
              <br />
              on a scale of 1‑10, and stores the full interview for you to review.
            </h2>
            {/* Key Statistics Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-[#A1E3FF] mr-2" />
                  <span className="text-2xl font-bold text-white">10m</span>
                </div>
                <p className="text-sm font-semibold text-white/90 mb-1">Go Live in Minutes</p>
                <p className="text-xs text-white/70">Setup your account and start interviewing new candidates in less than 10 minutes.</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-6 w-6 text-[#A1E3FF] mr-2" />
                  <span className="text-2xl font-bold text-white">87%</span>
                </div>
                <p className="text-sm font-semibold text-white/90 mb-1">Lower Hiring Costs</p>
                <p className="text-xs text-white/70">Save big on every new hire.</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-[#A1E3FF] mr-2" />
                  <span className="text-2xl font-bold text-white">5×</span>
                </div>
                <p className="text-sm font-semibold text-white/90 mb-1">Better Candidates</p>
                <p className="text-xs text-white/70">AI picks the top performers for you.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/signup">
                <Button size="lg" className="bg-white hover:bg-transparent/30 text-[#0B1C2D] hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-12 py-8 text-lg font-semibold border border-white/40">
                  Start Free 7-Day Trial
                </Button>
              </Link>
              <Button size="lg" className="bg-white hover:bg-transparent/30 text-[#0B1C2D] hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-12 py-8 text-lg font-semibold border border-white/40" onClick={() => window.open('https://calendly.com/serviceagent/30min', '_blank')}>
                Book a Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="mt-2 absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/70 cursor-pointer hover:text-white transition-colors" onClick={() => scrollToSection('stats')} />
        </div>
      </div>
    </section>
  );
};

export default Hero; 