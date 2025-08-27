import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Clock, DollarSign, Users, ChevronsDown } from "lucide-react";
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
    <section className="relative min-h-screen md:min-h-0 bg-gradient-to-br from-[#0B1C2D] via-[#0E7CFF] to-[#0B1C2D] overflow-hidden">
      {/* Enhanced Background Elements with ServiceAgent Colors */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#A1E3FF]/40 to-transparent rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#0E7CFF]/30 to-transparent rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#A1E3FF]/20 to-transparent rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#0B1C2D]/10 via-transparent to-[#0E7CFF]/10 animate-gradient-shift"></div>
      </div>

      <div className="relative z-0 w-full mx-auto lg:px-12 md:pt-16 md:pb-16 lg:pt-20 xs:mt-28 md:mt-16 lg:mt-20">
        {/* Enhanced Hero Content */}
        <div className="max-w-7xl lg:max-w-max lg:px-12 mx-auto text-center px-4">
        
        <div className="relative flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 z-10 pb-16 mb-12 md:mb-16">
            <div className="text-center md:text-left text-6xl md:text-7xl md:ml-4 lg:ml-0 font-bold text-white mb-4 leading-tight animate-fade-in whitespace-nowrap">
              Reducing 
              <span className="hidden xs:inline max-[398px]:inline md:inline lg:inline"><br /></span> 
              <span className="inline md:hidden"></span>
              Time-To-Hire
              <br />
              <span className="text-[#A1E3FF] mb-16">By 85%</span>
            </div>
              <img
                src="/DashboardImage.png"
                alt="ServiceAgent Dashboard"
                className="relative w-4/5 md:w-[85%] lg:w-4/5 max-w-[80%] h-auto rounded-2xl shadow-green-diagonal animate-fade-in md:left-[7.5vw] lg:left-[10vw] xl:left-[12vw] xl:translate-y-[-10%] 2xl:left-[8vw] transition-transform duration-100 ease-in-out"
                style={{ animationDelay: '0.5s' }}
              />
            <div
              className="
                absolute z-20 max-w-[30%]
                bottom-[15%] left-[1/8] 
                md:translate-x-[22.5rem] md:bottom-[45%] 
                lg:translate-x-[30rem] lg:bottom-[12.5rem]
                xl:translate-x-[35rem] xl:bottom-[20rem]
                2xl:translate-x-[50rem] 2xl:bottom-[10rem]
                bg-white/95 border-2 border-green-500 text-black font-medium
                text-lg md:text-xl lg:text-2xl px-3 md:px-4 py-1.5
                rounded-md shadow-xl pointer-events-none
              "
              style={{ animationDelay: '0.5s' }}
            >
                You saved <span className="text-green-700">15 hours</span> this week!
              </div>
           
            <img 
              src="/DashboardWorker.png" 
              alt="ServiceAgent Worker" 
              className="absolute z-20 w-[7.5rem] lg:w-[10rem] h-auto rounded-2xl shadow-2xl animate-fade-in
              right-[5rem] md:right-[2.5rem] lg:right-[-2.5rem]
              bottom-[4rem] md:bottom-[3rem] lg:bottom-[5rem] xl:bottom-[7.5rem]
              pointer-events-none" 
            />
       </div>
        <div className="max-w-2xl relative flex flex-col items-center md:items-start justify-center md:justify-start mt-0 md:mt-[-30%] xl:mt-[-35%] 2xl:mt-[-15%] md:pr-48 gap-16 mb-16 ml-0 md:ml-4 lg:ml-0 animate-fade-in
              text-center md:text-left text-2xl font-medium text-white leading-tight hyphens-none break-words" style={{ animationDelay: '0.4s' }}>
                ServiceAgent instantly interviews every applicant with AI, scores them 1–10, and delivers you the top candidates so you can hire faster, smarter, and at lower cost.
              <Link to="/signup">
                <Button size="xl" className="min-w-[250px] max-sm:w-64 bg-white hover:bg-purple-400 text-[#0B1C2D] hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full py-8 text-2xl font-semibold">
                  Start Free Trial
                </Button>
              </Link>
        </div>
            {/* Key Statistics Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 mt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-[#A1E3FF] mr-2" />
                  <span className="text-3xl md:text-2xl font-bold text-white">10m</span>
                </div>
                <div className="text-2xl font-semibold text-white/90 mb-1">Go Live in Minutes</div>
                <div className="text-center text-lg lg:text-xl text-white/70">
                  Setup and start interviewing in minutes.
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <ChevronsDown className="h-6 w-6 text-[#A1E3FF] mr-2" />
                  <span className="text-3xl md:text-2xl font-bold text-white">87%</span>
                </div>
                <div className="text-2xl font-semibold text-white/90 mb-1">Lower Hiring Costs</div>
                <div className="text-lg text-white/70">Save big on every new hire.</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-[#A1E3FF] mr-2" />
                  <span className="text-3xl md:text-2xl font-bold text-white">5×</span>
                </div>
                <div className="text-2xl font-semibold text-white/90 mb-1">Better Candidates</div>
                <div className="text-lg text-white/70">AI picks the top performers for you.</div>
              </div>
            </div>
           
          </div>
        </div> 

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 md:bottom-4 lg:bottom-4 w-full flex justify-center md:hidden">
          <ChevronDown className="h-8 w-8 text-white/70 cursor-pointer hover:text-white transition-colors" onClick={() => scrollToSection('stats')} />
        </div>
    </section>
  );
};

export default Hero; 