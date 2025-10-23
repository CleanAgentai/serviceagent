import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Check, Clock, Play, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";


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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight whitespace-nowrap">
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
                    aria-label="Start for Free"
                  >
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6 animate-pulse" />
                      Start for Free
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse opacity-80"></div>
                    </div>
                  </Button>
                </div>
                <div className="space-y-2">
                <p className="text-[8px] md:text-[10px] font-semibold uppercase text-muted-foreground text-center">
                  <span className="mr-[2px]">🎁</span> 14 Days Free
                </p>
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