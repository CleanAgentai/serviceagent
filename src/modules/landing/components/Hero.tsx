import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Clock, DollarSign, Users, ChevronsDown, Sparkles, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [hoursCount, setHoursCount] = useState(0);
  const [showUnderline, setShowUnderline] = useState(false);
  // const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNotificationVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isNotificationVisible) {
      const countUp = () => {
        let current = 0;
        const increment = 15 / 90; // Count to 15 over 90 steps for much smoother animation
        const timer = setInterval(() => {
          current += increment;
          if (current >= 15) {
            setHoursCount(15);
            clearInterval(timer);
            // Show underline animation after counting is complete
            setTimeout(() => {
              setShowUnderline(true);
            }, 200); // Small delay for better visual effect
          } else {
            setHoursCount(Math.floor(current));
          }
        }, 16); // Update every 16ms (60fps) for ultra-smooth animation
      };
      countUp();
    }
  }, [isNotificationVisible]);
  
  return (
  <section className="relative mt-16 py-16 lg:py-20 bg-gradient-to-br from-background via-card/30 to-muted/20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gold/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-teal/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-terracotta/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* <div className="grid lg:grid-cols-2 gap-16 items-center"> */}
          <div className="grid md:grid-cols-2 md:gap-10 lg:gap-16 items-center">
            {/* Left Content - Methodical Flow */}
            <div className="space-y-8">
              {/* Badge */}
              <div 
                className="max-md:mt-8 max-md:flex max-md:justify-center max-md:items-center opacity-0 animate-fade-in"
                style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal/20 via-primary/15 to-gold/20 text-primary rounded-full text-sm font-medium border border-gradient-to-r  shadow-xl shadow-primary/20">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Hiring Platform
                </div>
              </div>

              {/* Headline */}
              <div 
                className="space-y-6 opacity-0 animate-fade-in"
                style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
              >
                <h1 className="text-6xl text-center md:text-left lg:text-7xl font-bold leading-tight">
                  <span className="text-foreground">Hiring Sucks.</span><br />
                  <span className="text-foreground">We Make It</span>{' '}
                  <span className="relative inline-block">
                    <span className="text-gold">Easy.</span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gold to-terracotta rounded-full"></div>
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl max-md:text-center max-md:px-8 text-muted-foreground leading-relaxed break-words hyphens-none">
                Save 15+ hours per hire with AI powered interviews. Every applicant is interviewed, scored, and recorded so you only review the best.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div 
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
              >
                <div className="flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Button 
                      size="lg" 
                      className="shrink-0 bg-gradient-to-r from-gold to-gold/90 hover:from-terracotta hover:to-terracotta/90 text-white px-8 py-6 text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                      aria-label="Start for Free"
                      onClick={() => navigate('/signup', { state: { plan: 'LAUNCH' } })}
                    >
                      Start Free Trial
                    </Button>
                    <p className="text-[10px] font-semibold uppercase text-muted-foreground text-center">
                    <span className="mr-[2px]">🎁</span> 14 Days Free
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Stats Cards */}
              <div 
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl sm:mt-10 lg:mt-0">
                  {/* 5min Setup */}
                  <div className="group relative">
                    <div className="h-full relative bg-gradient-to-br from-card to-gold/5 border border-gold/20 rounded-2xl p-6 text-center space-y-4 hover:border-gold/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mx-auto group-hover:from-gold/30 group-hover:to-gold/20 transition-all duration-300">
                          <Clock className="w-8 h-8 text-gold group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                        </div>
                        <div className="absolute inset-0 w-16 h-16 bg-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 mx-auto"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-primary group-hover:text-gold transition-colors duration-300">5min</div>
                        <div className="text-sm font-medium text-muted-foreground">Quick Setup</div>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-1 h-1 bg-gold rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                        <div className="w-1 h-1 bg-gold rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-1 bg-gold rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Save 87% Costs */}
                  <div className="group relative">
                    <div className="h-full relative bg-gradient-to-br from-card to-teal/5 border border-teal/20 rounded-2xl p-6 text-center space-y-4 hover:border-teal/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal/30 transition-all duration-300">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal/20 to-teal/10 rounded-full flex items-center justify-center mx-auto group-hover:from-teal/30 group-hover:to-teal/20 transition-all duration-300">
                          <DollarSign className="w-8 h-8 text-teal group-hover:scale-110 group-hover:animate-bounce transition-all duration-300" />
                        </div>
                        <div className="absolute inset-0 w-16 h-16 bg-teal/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 mx-auto"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-primary group-hover:text-teal transition-colors duration-300">87%</div>
                        <div className="text-sm font-medium text-muted-foreground">Cost Savings</div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-xs text-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          vs traditional hiring
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5x Faster Hiring */}
                  <div className="group relative">
                    <div className="h-full relative bg-gradient-to-br from-card to-terracotta/5 border border-terracotta/20 rounded-2xl p-6 text-center space-y-4 hover:border-terracotta/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-terracotta/30 transition-all duration-300">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-terracotta/20 to-terracotta/10 rounded-full flex items-center justify-center mx-auto group-hover:from-terracotta/30 group-hover:to-terracotta/20 transition-all duration-300">
                          <Zap className="w-8 h-8 text-terracotta group-hover:scale-110 transition-all duration-300" />
                        </div>
                        <div className="absolute inset-0 w-16 h-16 bg-terracotta/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 mx-auto"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-primary group-hover:text-terracotta transition-colors duration-300">5×</div>
                        <div className="text-sm font-medium text-muted-foreground">Faster Hiring</div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-xs text-terracotta font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          than manual process
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div 
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
              >
                <div className="flex items-center max-sm:justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                     <div className="flex -space-x-2">
                       <div className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                         <img src="/logos/companies/Clementines_Original.png" alt="Clementines" className="w-[140%] h-full object-cover" />
                        </div>
                        <div className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                          <img src="/logos/companies/ConnectedPower_Logo.png" alt="Connected Power" className="w-full h-full object-cover scale-75" />
                        </div>
                        <div className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                          <img src="/logos/companies/SmartEnroll.png" alt="SmartEnroll" className="w-full h-full object-cover" />
                       </div>
                     </div>
                    <span className="font-medium">150+ companies hiring better</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Simplified Dashboard Visual */}
            <div 
              className="relative opacity-0 animate-fade-in md:flex md:justify-end lg:justify-end md:mt-[-25rem] lg:mt-[-10rem]"
              // className="relative opacity-0 animate-fade-in md:flex lg:flex md:justify-start lg:justify-end mt-[-10rem]"
              style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
              <div className="hidden md:block relative">
              {/* <div className="max-md:hidden relative"> */}
                {/* Main Dashboard - 440px desktop, doubled height */}
                <div className="relative w-full lg:w-[440px] md:w-[280px] max-w-[320px] sm:max-w-[440px] hover:scale-105 transition-all duration-300">
                  <div 
                    className="block cursor-pointer"
                    onClick={() => navigate('/signup', { state: { plan: 'LAUNCH' } })}
                  >
                  <img 
                    src="/landing/DashboardWorker.png" 
                    alt="ServiceAgent worker with hard hat in active call showing professional hiring assistance" 
                    className="w-full rounded-lg shadow-xl"
                    style={{ 
                      height: 'auto', 
                      minHeight: '600px',
                      objectFit: 'cover'
                    }}
                    loading="eager"
                  />
                  </div>
                  
                  {/* Notification Card - Enhanced size and styling */}
                  <div 
                    className={`absolute -bottom-10 -left-10 lg:-left-10 md:-left-4 w-[280px] lg:w-[280px] md:w-[200px] sm:w-[200px] bg-white rounded-xl shadow-2xl border border-gray-100 p-4 md:p-5 hover:scale-110 transition-all duration-500 ${
                      isNotificationVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0 relative"
                        style={{ 
                          animation: 'pulse 2s infinite'
                        }}
                      >
                        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                        <div className="relative w-full h-full bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-bold text-lg leading-tight">
                          You saved <span className="text-green-600 relative inline-block">
                            {hoursCount} hours
                            {showUnderline && (
                              <span 
                                className="absolute bottom-0 left-0 h-0.5 bg-green-600 rounded-xl"
                                style={{
                                  width: '100%',
                                  animation: 'drawUnderline 1.2s ease-in-out forwards'
                                }}
                              ></span>
                            )}
                          </span> this week!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile positioning adjustments */}
                <style dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes drawUnderline {
                      from {
                        width: 0%;
                      }
                      to {
                        width: 100%;
                      }
                    }
                    @media (max-width: 640px) {
                      .absolute.-bottom-10.-left-10 {
                        position: relative !important;
                        bottom: auto !important;
                        left: auto !important;
                        margin-top: 20px !important;
                        width: 200px !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                      }
                    }
                    @media (max-width: 768px) {
                      .absolute.-top-8.-right-8 {
                        top: -16px !important;
                        right: -16px !important;
                      }
                      .absolute.-bottom-10.-left-10 {
                        bottom: -20px !important;
                        left: -20px !important;
                      }
                    }
                  `
                }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default Hero; 