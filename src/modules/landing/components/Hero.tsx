import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Clock, DollarSign, Users, ChevronsDown, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal/20 via-primary/15 to-gold/20 text-primary rounded-full text-sm font-medium border border-gradient-to-r from-teal/30 to-gold/30 shadow-xl shadow-primary/20">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Hiring Platform
                </div>
              </div>

              {/* Headline */}
              <div 
                className="space-y-6 opacity-0 animate-fade-in"
                style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
              >
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-foreground">Hiring Sucks.</span><br />
                  <span className="text-foreground">We Make It</span>{' '}
                  <span className="relative inline-block">
                    <span className="text-gold">Easy.</span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gold to-terracotta rounded-full"></div>
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl max-md:text-center max-md:px-8 text-muted-foreground leading-relaxed">
                  ServiceAgent uses AI to interview candidates, score them perfectly, and save the videos so you can quickly review and hire only the best talent.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div 
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
              >
                <div className="flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Link to="/signup">
                      <Button 
                        size="lg" 
                        className="shrink-0 bg-gradient-to-r from-gold to-gold/90 hover:from-terracotta hover:to-terracotta/90 text-white px-8 py-6 text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                        aria-label="Start free trial - first 5 candidates free, credit card required"
                      >
                        Start for Free
                      </Button>
                    </Link>
                    <p className="text-sm text-muted-foreground text-center">
                      First 5 candidates free
                    </p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="shrink-0 px-8 py-6 text-xl font-bold border-2 border-teal/30 text-teal hover:bg-teal/10 hover:border-teal/50 hover:text-teal transition-all duration-300 shadow-lg hover:shadow-teal/20"
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Watch Demo
                  </Button>
                </div>
              </div>
              
              {/* Enhanced Stats Cards */}
              <div 
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
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
                       <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                         <img src="/workers/PestControl.png" alt="ServiceAgent customer testimonial avatar showing professional headshot" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                          <img src="/workers/Plumber.png" alt="ServiceAgent satisfied client avatar demonstrating hiring success" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                          <img src="/workers/ResidentialCleaning.png" alt="ServiceAgent business owner testimonial photo for hiring platform" className="w-full h-full object-cover" />
                       </div>
                     </div>
                    <span className="font-medium">150+ companies hiring better</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Simplified Dashboard Visual */}
            <div 
              className="relative opacity-0 animate-fade-in md:flex md:justify-end lg:justify-end md:mt-[-20rem] lg:mt-[-10rem]"
              // className="relative opacity-0 animate-fade-in md:flex lg:flex md:justify-start lg:justify-end mt-[-10rem]"
              style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
              <div className="hidden relative md:block">
              {/* <div className="max-md:hidden relative"> */}
                {/* Main Dashboard - 440px desktop, doubled height */}
                <div className="relative w-full lg:w-[440px] md:w-[330px] max-w-[320px] sm:max-w-[440px]">
                  <img 
                    src="/DashboardWorker.png" 
                    alt="ServiceAgent worker with hard hat in active call showing professional hiring assistance" 
                    className="w-full rounded-lg shadow-xl"
                    style={{ 
                      height: 'auto', 
                      minHeight: '600px',
                      objectFit: 'cover'
                    }}
                    loading="eager"
                  />
                  
                  {/* Notification Card - Enhanced size and styling */}
                  <div 
                    className="absolute -bottom-10 -left-10 w-[280px] lg:w-[280px] md:w-[220px] sm:w-[200px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6 opacity-0 animate-fade-in"
                    style={{ 
                      animationDelay: '1s',
                      animationFillMode: 'forwards'
                    }}
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
                          You saved <span className="text-green-600">15 hours</span> this week
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile positioning adjustments */}
                <style dangerouslySetInnerHTML={{
                  __html: `
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


  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     setIsNavVisible(currentScrollY < lastScrollY || currentScrollY < 10);
  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [lastScrollY]);

  // const scrollToSection = (sectionId: string) => {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  // return (
  //   <section className="relative min-h-screen md:min-h-0 bg-gradient-to-br from-[#0B1C2D] via-[#0E7CFF] to-[#0B1C2D] overflow-hidden">
  //     {/* Enhanced Background Elements with ServiceAgent Colors */}
  //     <div className="absolute inset-0">
  //       <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#A1E3FF]/40 to-transparent rounded-full blur-3xl opacity-60 animate-pulse"></div>
  //       <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#0E7CFF]/30 to-transparent rounded-full blur-3xl opacity-50"></div>
  //       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#A1E3FF]/20 to-transparent rounded-full blur-3xl opacity-40"></div>
  //       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#0B1C2D]/10 via-transparent to-[#0E7CFF]/10 animate-gradient-shift"></div>
  //     </div>

  //     <div className="relative z-0 w-full mx-auto lg:px-12 md:pt-16 md:pb-16 lg:pt-20 xs:mt-28 md:mt-16 lg:mt-20">
  //       {/* Enhanced Hero Content */}
  //       <div className="max-w-7xl lg:max-w-max lg:px-12 mx-auto text-center px-4">
        
  //       <div className="relative flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 z-10 pb-16 mb-12 md:mb-16">
  //           <div className="text-center md:text-left text-6xl md:text-7xl md:ml-4 lg:ml-0 font-bold text-white mb-4 leading-tight animate-fade-in whitespace-nowrap">
  //             Reducing 
  //             <span className="hidden xs:inline max-[398px]:inline md:inline lg:inline"><br /></span> 
  //             <span className="inline md:hidden"></span>
  //             Time-To-Hire
  //             <br />
  //             <span className="text-[#A1E3FF] mb-16">By 85%</span>
  //           </div>
  //             <img
  //               src="/DashboardImage.png"
  //               alt="ServiceAgent Dashboard"
  //               className="relative w-4/5 md:w-[85%] lg:w-4/5 max-w-[80%] h-auto rounded-2xl shadow-green-diagonal animate-fade-in md:left-[7.5vw] lg:left-[10vw] xl:left-[12vw] xl:translate-y-[-10%] 2xl:left-[8vw] transition-transform duration-100 ease-in-out"
  //               style={{ animationDelay: '0.5s' }}
  //             />
  //           <div
  //             className="
  //               absolute z-20 max-w-[30%]
  //               bottom-[15%] left-[1/8] 
  //               md:translate-x-[22.5rem] md:bottom-[45%] 
  //               lg:translate-x-[30rem] lg:bottom-[12.5rem]
  //               xl:translate-x-[35rem] xl:bottom-[20rem]
  //               2xl:translate-x-[50rem] 2xl:bottom-[10rem]
  //               bg-white/95 border-2 border-green-500 text-black font-medium
  //               text-lg md:text-xl lg:text-2xl px-3 md:px-4 py-1.5
  //               rounded-md shadow-xl pointer-events-none
  //             "
  //             style={{ animationDelay: '0.5s' }}
  //           >
  //               You saved <span className="text-green-700">15 hours</span> this week!
  //             </div>
           
  //           <img 
  //             src="/DashboardWorker.png" 
  //             alt="ServiceAgent Worker" 
  //             className="absolute z-20 w-[7.5rem] lg:w-[10rem] h-auto rounded-2xl shadow-2xl animate-fade-in
  //             right-[5rem] md:right-[2.5rem] lg:right-[-2.5rem]
  //             bottom-[4rem] md:bottom-[3rem] lg:bottom-[5rem] xl:bottom-[7.5rem]
  //             pointer-events-none" 
  //           />
  //      </div>
  //       <div className="max-w-2xl relative flex flex-col items-center md:items-start justify-center md:justify-start mt-0 md:mt-[-30%] xl:mt-[-35%] 2xl:mt-[-15%] md:pr-48 gap-16 mb-16 ml-0 md:ml-4 lg:ml-0 animate-fade-in
  //             text-center md:text-left text-2xl font-medium text-white leading-tight hyphens-none break-words" style={{ animationDelay: '0.4s' }}>
  //               ServiceAgent instantly interviews every applicant with AI, scores them 1–10, and delivers you the top candidates so you can hire faster, smarter, and at lower cost.
  //             <Link to="/signup">
  //               <Button size="xl" className="min-w-[250px] max-sm:w-64 bg-white hover:bg-purple-400 text-[#0B1C2D] hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full py-8 text-2xl font-semibold">
  //                 Start Free Trial
  //               </Button>
  //             </Link>
  //       </div>
  //           {/* Key Statistics Highlight */}
  //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 mt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
  //             <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
  //               <div className="flex items-center justify-center mb-2">
  //                 <Clock className="h-6 w-6 text-[#A1E3FF] mr-2" />
  //                 <span className="text-3xl md:text-2xl font-bold text-white">10m</span>
  //               </div>
  //               <div className="text-2xl font-semibold text-white/90 mb-1">Go Live in Minutes</div>
  //               <div className="text-center text-lg lg:text-xl text-white/70">
  //                 Setup and start interviewing in minutes.
  //               </div>
  //             </div>
  //             <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
  //               <div className="flex items-center justify-center mb-2">
  //                 <ChevronsDown className="h-6 w-6 text-[#A1E3FF] mr-2" />
  //                 <span className="text-3xl md:text-2xl font-bold text-white">87%</span>
  //               </div>
  //               <div className="text-2xl font-semibold text-white/90 mb-1">Lower Hiring Costs</div>
  //               <div className="text-lg text-white/70">Save big on every new hire.</div>
  //             </div>
  //             <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
  //               <div className="flex items-center justify-center mb-2">
  //                 <Users className="h-6 w-6 text-[#A1E3FF] mr-2" />
  //                 <span className="text-3xl md:text-2xl font-bold text-white">5×</span>
  //               </div>
  //               <div className="text-2xl font-semibold text-white/90 mb-1">Better Candidates</div>
  //               <div className="text-lg text-white/70">AI picks the top performers for you.</div>
  //             </div>
  //           </div>
           
  //         </div>
  //       </div> 

  //       {/* Scroll Down Indicator */}
  //       <div className="absolute bottom-6 md:bottom-4 lg:bottom-4 w-full flex justify-center md:hidden">
  //         <ChevronDown className="h-8 w-8 text-white/70 cursor-pointer hover:text-white transition-colors" onClick={() => scrollToSection('stats')} />
  //       </div>
  //   </section>
//   );
// };

export default Hero; 