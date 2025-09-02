import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Check, Clock, Play, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

// const CTA = () => {
//   return (
//     <section className="relative py-24 bg-gradient-to-r from-[#0B1C2D] via-[#0E7CFF] to-[#0B1C2D] overflow-hidden">
//       {/* Background Gradient Effects */}
//       <div className="absolute inset-0">
//         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#A1E3FF]/30 to-transparent rounded-full blur-3xl opacity-60"></div>
//         <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-[#0E7CFF]/40 to-transparent rounded-full blur-2xl opacity-50"></div>
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-[#A1E3FF]/10 to-transparent"></div>
//       </div>

//       <div className="relative z-10 container mx-auto px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Want to Stop Wasting Time on Hiring?
//           </h2>
//           <p className="text-xl text-[#A1E3FF]/90 mb-8 max-w-2xl mx-auto">
//             Join 100+ service businesses using AI to 
//             <span className="block md:hidden"></span>
//             interview every applicant 24/7. 
//             <br />
//             No more ghosting. No more bad hires.
//           </p>
          
//           <div className="flex flex-row flex-wrap items-center justify-center gap-4 mb-12">
//             <Link to="/signup">
//               <Button 
//                 size="lg" 
//                 className="min-w-[300px] bg-white hover:bg-purple-400 text-[#0B1C2D] hover:text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full px-12 py-8 text-lg font-semibold whitespace-nowrap"
//               >
//                 Start Free 7 Day Trial
//               </Button>
//             </Link>
//           </div>

//           <div className="flex items-center justify-center gap-3 md:gap-6 text-[#A1E3FF]/90 text-xs md:text-sm [@media(max-width:548px)]:flex-col">
//             <div className="flex items-center whitespace-nowrap">
//               <CheckCircle className="h-4 w-4 mr-1 md:h-5 md:w-5 md:mr-2" />
//               <span>AI interviews every applicant instantly</span>
//             </div>
//             <div className="flex items-center whitespace-nowrap">
//               <CheckCircle className="h-4 w-4 mr-1 md:h-5 md:w-5 md:mr-2" />
//               <span>Credit card required for trial</span>
//             </div>
//             <div className="flex items-center whitespace-nowrap">
//               <CheckCircle className="h-4 w-4 mr-1 md:h-5 md:w-5 md:mr-2" />
//               <span>Cancel anytime with no hassle</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CTA; 

const CTA = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-muted/20 to-card/30 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold/4 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-teal/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-terracotta/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center space-y-12 pb-8">
            {/* Enhanced Heading */}
            <div 
              className="space-y-6 opacity-0 animate-fade-in"
              style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Stop wasting hours on interviews.
              </h2>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-tight">
                Start hiring in days.
              </h2>
            </div>

            {/* Enhanced CTA Actions */}
            <div 
              className="flex flex-col items-center justify-center space-y-6 opacity-0 animate-fade-in"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              {/* Enhanced Primary CTA Button */}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold via-terracotta to-teal rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  <Button
                    size="lg"
                    onClick={() => window.location.href = '/signup'}
                    className="relative bg-gradient-to-r from-gold to-gold/90 hover:from-terracotta hover:to-terracotta/90 text-white px-16 py-8 text-2xl font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                    aria-label="Start free trial for AI hiring software - first 5 candidates free, credit card required"
                  >
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6 animate-pulse" />
                      Start for Free
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse opacity-80"></div>
                    </div>
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-primary">First 5 candidates free</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Shield className="w-3 h-3" />
                    <span>Credit card required</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Secondary Action */}
              <div 
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const demoSection = document.getElementById('demo');
                    if (demoSection) {
                      demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="group inline-flex items-center text-primary font-medium text-lg hover:text-gold transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-gold/10 rounded-full flex items-center justify-center mr-3 group-hover:from-gold/20 group-hover:to-gold/10 transition-all duration-300 group-hover:scale-110">
                    <Play className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <span className="relative">
                    Watch Demo
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-gold transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </button>
              </div>
              
              {/* Bottom trust indicators */}
              <div 
                className="flex items-center justify-center gap-8 text-sm text-muted-foreground flex-wrap pt-8 opacity-0 animate-fade-in"
                style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal" />
                  <span>No Setup Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-terracotta" />
                  <span>Cancel Anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default CTA;