import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative py-24 bg-gradient-to-r from-[#0B1C2D] via-[#0E7CFF] to-[#0B1C2D] overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#A1E3FF]/30 to-transparent rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-[#0E7CFF]/40 to-transparent rounded-full blur-2xl opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-[#A1E3FF]/10 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Want to Stop Wasting Time on Hiring?
          </h2>
          <p className="text-xl text-[#A1E3FF]/90 mb-8 max-w-2xl mx-auto">
            Join 100+ service businesses using AI to interview every applicant 24/7. 
            <br />
            No more ghosting. No more bad hires.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="flex flex-col items-center bg-white hover:bg-transparent text-[#0B1C2D] hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-12 py-8 text-lg font-semibold border border-white/30"
              >
                Start Free 7 Day Trial
                <sub className="text-xs font-normal opacity-70">Credit card required. Cancel anytime.</sub>
              </Button>
            </Link>
            <Button 
              size="lg" 
              className="flex flex-col items-center bg-white hover:bg-transparent text-[#0B1C2D] hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-12 py-8 text-lg font-semibold border border-white/30"
              onClick={() => window.open('https://calendly.com/serviceagent/30min', '_blank')}
            >
              Book a 15-Min Demo
              <sub className="text-xs font-normal opacity-70">We’ll show you how it works fast.</sub>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3 md:gap-6 text-[#A1E3FF]/90 text-xs md:text-sm">
            <div className="flex items-center whitespace-nowrap">
              <CheckCircle className="h-4 w-4 mr-1 md:h-5 md:w-5 md:mr-2" />
              <span>AI interviews every applicant instantly</span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <CheckCircle className="h-4 w-4 mr-1 md:h-5 md:w-5 md:mr-2" />
              <span>Credit card required for trial</span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <CheckCircle className="h-4 w-4 mr-1 md:h-5 md:w-5 md:mr-2" />
              <span>Cancel anytime with no hassle</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 