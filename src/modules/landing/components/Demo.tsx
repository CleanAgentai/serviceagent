import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

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
            Watch how our AI transforms your hiring from start to finish.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="aspect-video">
              <div style={{ position: "relative", paddingBottom: "54.270833333333336%", height: 0 }}>
                <iframe 
                  src="https://www.loom.com/embed/c6331eb111804e92a20090266c736074?sid=a7df1056-af9a-4c8c-b4f2-561a565e7538" 
                  frameBorder="0" 
                  allowFullScreen
                  style={{ position: "absolute", border: "none", borderRadius: "0", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-4"
              >
                Try It Free for 7 Days
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <div className="mt-4">
              <button 
                onClick={() => window.open('https://calendly.com/serviceagent/30min', '_blank')}
                className="text-blue-600 hover:text-blue-700 underline transition-colors duration-300"
              >
                Prefer a personal touch? Book a live demo.
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo; 