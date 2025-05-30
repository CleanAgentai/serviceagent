import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

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
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-[#A1E3FF]/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of service companies already using ServiceAgent to hire faster, smarter, and more cost-effectively.
          </p>
          
          <div className="mb-12">
            <Button 
              size="lg" 
              className="bg-white text-[#0E7CFF] hover:bg-[#A1E3FF] hover:text-[#0B1C2D] px-12 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open('https://calendly.com/serviceagent/30min', '_blank')}
            >
              Book a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[#A1E3FF]/90">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Custom hiring strategy</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>No commitment required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 