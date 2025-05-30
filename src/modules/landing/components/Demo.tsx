import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Demo = () => {
  return (
    <section id="demo" className="relative py-24 bg-gradient-to-bl from-white via-[#A1E3FF]/8 to-[#0E7CFF]/5 overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-[#0E7CFF]/15 to-transparent rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-radial from-[#A1E3FF]/25 to-transparent rounded-full blur-2xl opacity-70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            See ServiceAgent in Action
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Watch how ServiceAgent transforms your hiring process from start to finish—live demo coming soon.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#0E7CFF] rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-[#0B1C2D] transition-colors cursor-pointer group">
                  <Play className="h-8 w-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-slate-600 text-lg">Live demo coming soon</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              className="bg-[#0E7CFF] hover:bg-[#0B1C2D] text-white px-12 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://calendly.com/serviceagent/30min', '_blank')}
            >
              Book a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo; 