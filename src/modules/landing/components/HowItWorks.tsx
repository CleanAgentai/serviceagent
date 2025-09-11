import {
  Send,
  Users,
  ArrowRight,
  Target,
  Bot,
  Sparkles,
  Clock,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <section
      id="howitworks"
      className="py-16 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/5 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      <div className="container mx-auto px-6 relative">
        <div
          className="text-center space-y-6 mb-20 opacity-0 animate-fade-in"
          style={{
            animationDelay: '0.2s',
            animationFillMode: 'forwards',
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 text-teal rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Simple Process
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-primary leading-tight">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your hiring process in just 3 simple steps. <br />
            No complex setup, no learning curve.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-12 max-w-7xl mx-auto">
          {/* Step 1 - Modern Gold Theme */}
          <div
            className="flex-1 group opacity-0 animate-fade-in"
            style={{
              animationDelay: '0.4s',
              animationFillMode: 'forwards',
            }}
          >
            <div className="relative bg-gradient-to-br from-card to-gold/5 rounded-3xl p-10 shadow-2xl border border-gold/20 text-center space-y-8 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 hover:border-gold/40  w-full h-full">
              {/* Animated step number */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-gold to-gold/80 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-xl shadow-gold/40 group-hover:scale-110 transition-transform duration-300">
                    01
                  </div>
                  <div className="absolute inset-0 w-12 h-12 bg-gold rounded-full animate-ping opacity-20 group-hover:opacity-40" />
                </div>
              </div>

              {/* Icon with animation */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center group-hover:from-gold/30 group-hover:to-gold/20 transition-all duration-300">
                    <Send className="w-12 h-12 text-gold group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  </div>
                  <div className="absolute inset-0 w-24 h-24 bg-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary group-hover:text-gold transition-colors duration-300">
                  Post Your Job
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Post to Indeed, Facebook, or anywhere you already get
                  applicants. Our smart tracking starts working immediately.
                </p>
                <div className="pt-2 bottom-0 relative">
                  <span className="inline-flex items-center gap-2 text-gold font-medium text-sm group-hover:scale-105 transition-all duration-300">
                    <Clock className="w-4 h-4" />
                    Takes 2 minutes
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Arrow 1 */}
          <div
            className="hidden lg:flex items-center justify-center flex-col gap-4 opacity-0 animate-fade-in"
            style={{
              animationDelay: '0.6s',
              animationFillMode: 'forwards',
            }}
          >
            <div className="relative">
              <ArrowRight className="w-8 h-8 text-teal animate-pulse hover:scale-125 transition-all duration-300" />
            </div>
          </div>

          {/* Step 2 - Teal Theme */}
          <div
            className="flex-1 group opacity-0 animate-fade-in"
            style={{
              animationDelay: '0.8s',
              animationFillMode: 'forwards',
            }}
          >
            <div className="relative bg-gradient-to-br from-card to-teal/5 rounded-3xl p-10 shadow-2xl border border-teal/20 text-center space-y-8 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 hover:border-teal/40  w-full h-full">
              {/* Animated step number */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal to-teal/80 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-xl shadow-teal/40 group-hover:scale-110 transition-transform duration-300">
                    02
                  </div>
                  <div
                    className="absolute inset-0 w-12 h-12 bg-teal rounded-full animate-ping opacity-20 group-hover:opacity-40"
                    style={{ animationDelay: '0.5s' }}
                  />
                </div>
              </div>

              {/* Icon with animation */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-teal/20 to-teal/10 rounded-full flex items-center justify-center group-hover:from-teal/30 group-hover:to-teal/20 transition-all duration-300">
                    <Bot className="w-12 h-12 text-teal group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="absolute inset-0 w-24 h-24 bg-teal/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary group-hover:text-teal transition-colors duration-300">
                  AI Interviews Every Applicant
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Our AI conducts personalized interviews with each candidate
                  immediately after they apply. No scheduling, no delays.
                </p>
                <div className="pt-2 mt-auto">
                  <span className="inline-flex items-center gap-2 text-teal font-medium group-hover:scale-105 transition-all duration-300">
                    <Zap className="w-4 h-4" />
                    100% automated
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Arrow 2 */}
          <div
            className="hidden lg:flex items-center justify-center flex-col gap-4 opacity-0 animate-fade-in"
            style={{
              animationDelay: '1s',
              animationFillMode: 'forwards',
            }}
          >
            <div className="relative">
              <ArrowRight
                className="w-8 h-8 text-terracotta animate-pulse hover:scale-125 transition-all duration-300"
                style={{ animationDelay: '0.3s' }}
              />
            </div>
          </div>

          {/* Step 3 - Terracotta Theme */}
          <div
            className="flex-1 group opacity-0 animate-fade-in"
            style={{
              animationDelay: '1.2s',
              animationFillMode: 'forwards',
            }}
          >
            <div className="relative bg-gradient-to-br from-card to-terracotta/5 rounded-3xl p-10 shadow-2xl border border-terracotta/20 text-center space-y-8 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 hover:border-terracotta/40 w-full h-full">
              {/* Animated step number */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-terracotta to-terracotta/80 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-xl shadow-terracotta/40 group-hover:scale-110 transition-transform duration-300">
                    03
                  </div>
                  <div
                    className="absolute inset-0 w-12 h-12 bg-terracotta rounded-full animate-ping opacity-20 group-hover:opacity-40"
                    style={{ animationDelay: '1s' }}
                  />
                </div>
              </div>

              {/* Icon with animation and faces */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-terracotta/20 to-terracotta/10 rounded-full flex items-center justify-center group-hover:from-terracotta/30 group-hover:to-terracotta/20 transition-all duration-300">
                    <Users className="w-12 h-12 text-terracotta group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="absolute inset-0 w-24 h-24 bg-terracotta/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Small face images around the main icon */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                    <img
                      src="/workers/Hospitality.png"
                      alt="Top candidate"
                      className="w-full h-full object-cover select-none"
                    />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                    <img
                      src="/workers/Staffing.png"
                      alt="Top candidate"
                      className="w-full h-full object-cover select-none"
                    />
                  </div>
                  <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-6 h-6 rounded-full border-2 border-background overflow-hidden">
                    <img
                      src="/workers/Restaurant.png"
                      alt="Top candidate"
                      className="w-full h-full object-cover select-none"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary group-hover:text-terracotta transition-colors duration-300">
                  Get a Shortlist of Top Picks
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  We analyze every interview and deliver a ranked shortlist of
                  the best candidates, so you only review the cream of the crop.
                </p>
                <div className="pt-2 mt-auto">
                  <span className="inline-flex items-center gap-2 text-terracotta font-medium text-sm group-hover:scale-105 transition-all duration-300">
                    <Target className="w-4 h-4" />
                    5× more accurate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA section */}
        <div
          className="text-center mt-20 opacity-0 animate-fade-in"
          style={{
            animationDelay: '1.4s',
            animationFillMode: 'forwards',
          }}
        >
          <Link to="/signup">
            <div className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold/10 to-teal/10 rounded-full border border-gold/20 text-sm font-medium text-primary hover:shadow-xl hover:scale-105 shadow-lg transition-all duration-300">
              <Sparkles className="w-4 h-4 text-gold group-hover:scale-110 transition-transform duration-300" />
              Ready to transform your hiring process?
              <ArrowRight className="w-4 h-4 text-teal group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
