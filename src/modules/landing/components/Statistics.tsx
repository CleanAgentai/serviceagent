import { Card, CardContent } from "@/components/ui/card";
import { Video, Brain, FileVideo, BarChart3, Link2, BarChart, Zap, Clock, Target, Play, TrendingUp, DollarSign, Check } from "lucide-react";

const bentoFeatures = [
  {
    Icon: Video,
    name: "Instant AI Interviews",
    description: "Conduct video and chat interviews automatically with AI-powered questioning tailored to each role.",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-60">
        <div className="absolute top-6 right-6 w-24 h-24 bg-primary/20 rounded-lg flex items-center justify-center">
          <Video className="w-12 h-12 text-primary" />
        </div>
      </div>
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Brain,
    name: "Smart AI Scoring",
    description: "Get 1-10 candidate scores with detailed AI reasoning for every response and interaction.",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-100 opacity-60">
        <div className="absolute top-6 right-6 w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
          <Brain className="w-10 h-10 text-primary" />
        </div>
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: FileVideo,
    name: "Reviewable Recordings",
    description: "Watch back any interview at your convenience with full video playback and transcript access.",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 opacity-60">
        <div className="absolute top-4 right-4 w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
          <FileVideo className="w-8 h-8 text-primary" />
        </div>
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: BarChart3,
    name: "Analytics Dashboard",
    description: "Track hiring metrics, performance trends, and ROI with comprehensive analytics.",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-100 opacity-60">
        <div className="absolute top-4 right-4 w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-8 h-8 text-primary" />
        </div>
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Link2,
    name: "ATS Integrations",
    description: "Seamlessly connect with Workable, Bullhorn, BambooHR, and 20+ other popular ATS platforms.",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-cyan-100 opacity-60">
        <div className="absolute top-6 right-6 w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
          <Link2 className="w-10 h-10 text-primary" />
        </div>
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

const features = [
  {
    title: "Instant AI Interviews",
    description: "Video + chat interviews conducted automatically",
    icon: "🎥"
  },
  {
    title: "Smart Scoring",
    description: "1-10 scoring with detailed reasoning",
    icon: "🧠"
  },
  {
    title: "Reviewable Recordings",
    description: "Watch back any interview at your convenience",
    icon: "📹"
  },
  {
    title: "ATS Integrations",
    description: "Works with Workable, Bullhorn, BambooHR & more",
    icon: "🔗"
  },
  {
    title: "Analytics Dashboard",
    description: "Track hiring metrics and performance",
    icon: "📊"
  },
  {
    title: "Custom Branding",
    description: "White-label with your company branding",
    icon: "🎨"
  }
];

const Statistics = () => {
  return (
    <section id="stats" className="py-24 bg-gradient-to-b from-background to-card/20 relative overflow-hidden">
    {/* Decorative background elements */}
    <div className="absolute top-1/4 left-0 w-72 h-72 bg-teal/3 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />
    
    <div className="container mx-auto px-6 relative">
      {/* Section Header */}
      <div 
        className="text-center space-y-6 mb-20 opacity-0 animate-fade-in"
        style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          Platform Features
        </div>
        <h2 className="text-5xl lg:text-6xl font-bold text-primary leading-tight">
          Powerful Features
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Everything you need to transform your hiring process with AI-powered intelligence
        </p>
      </div>

      {/* Feature Grid - Left to Right Flow */}
      <div className="max-w-7xl mx-auto">
        {/* Row 1: Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-stretch">
          {/* Feature 1: AI Interviews */}
          <div 
            className="group opacity-0 animate-fade-in"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <div className="relative bg-gradient-to-br from-card to-gold/5 rounded-3xl p-8 border border-gold/20 shadow-xl hover:shadow-3xl hover:-translate-y-3 hover:border-gold/40 transition-all duration-500 max-md:mb-4">
              {/* Icon Badge */}
              <div className="absolute -top-4 left-8">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center shadow-xl shadow-gold/40 group-hover:scale-110 transition-transform duration-300">
                  <Video className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="pt-8 space-y-4">
                <div className="flex items-center gap-2 text-gold">
                  <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  <span className="text-sm font-medium uppercase tracking-wide">Core Feature</span>
                </div>
                <h3 className="text-2xl font-bold text-primary group-hover:text-gold transition-colors duration-300">
                  Instant AI Interviews
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Conduct intelligent video and chat interviews automatically with AI-powered questioning tailored to each role and candidate.
                </p>
                <div className="flex items-center gap-2 text-gold font-medium">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Available 24/7</span>
                </div>
              </div>
              
              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-gold/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>

          {/* Feature 2: Smart Scoring */}
          <div 
            className="group opacity-0 animate-fade-in"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <div className="relative bg-gradient-to-br from-card to-teal/5 rounded-3xl p-8 border border-teal/20 shadow-xl hover:shadow-3xl hover:-translate-y-3 hover:border-teal/40 transition-all duration-500 max-md:mb-4">
              {/* Icon Badge */}
              <div className="absolute -top-4 left-8">
                <div className="w-16 h-16 bg-gradient-to-br from-teal to-teal/80 rounded-full flex items-center justify-center shadow-xl shadow-teal/40 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="pt-8 space-y-4">
                <div className="flex items-center gap-2 text-teal">
                  <div className="w-2 h-2 bg-teal rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <span className="text-sm font-medium uppercase tracking-wide">AI Intelligence</span>
                </div>
                <h3 className="text-2xl font-bold text-primary group-hover:text-teal transition-colors duration-300">
                  Smart AI Scoring
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get comprehensive 1-10 candidate scores with detailed AI reasoning for every response and interaction point.
                </p>
                <div className="flex items-center gap-2 text-teal font-medium">
                  <Target className="w-4 h-4" />
                  <span className="text-sm">5× more accurate</span>
                </div>
              </div>
              
              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-teal/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>

          {/* Feature 3: Reviewable Recordings */}
          <div 
            className="group opacity-0 animate-fade-in"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            <div className="relative bg-gradient-to-br from-card to-terracotta/5 rounded-3xl p-8 border border-terracotta/20 shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:border-terracotta/40 transition-all duration-500">
              {/* Icon Badge */}
              <div className="absolute -top-4 left-8">
                <div className="w-16 h-16 bg-gradient-to-br from-terracotta to-terracotta/80 rounded-full flex items-center justify-center shadow-lg shadow-terracotta/30 group-hover:scale-110 transition-transform duration-300">
                  <FileVideo className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="pt-8 space-y-4">
                <div className="flex items-center gap-2 text-terracotta">
                  <div className="w-2 h-2 bg-terracotta rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                  <span className="text-sm font-medium uppercase tracking-wide">Review & Playback</span>
                </div>
                <h3 className="text-2xl font-bold text-primary group-hover:text-terracotta transition-colors duration-300">
                  Reviewable Recordings
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Watch back any interview at your convenience with full video playback and detailed transcript access.
                </p>
                <div className="flex items-center gap-2 text-terracotta font-medium">
                  <Play className="w-4 h-4" />
                  <span className="text-sm">Full transcripts</span>
                </div>
              </div>
              
              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-terracotta/10 to-terracotta/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 2: Secondary Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Feature 4: Analytics Dashboard */}
          <div 
            className="group opacity-0 animate-fade-in"
            style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
          >
            <div className="relative bg-gradient-to-br from-card to-accent/5 rounded-3xl p-10 border border-accent/20 shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:border-accent/40 transition-all duration-500 max-md:mb-4">
              {/* Icon Badge */}
              <div className="absolute -top-4 left-10">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="pt-8 space-y-6">
                <div className="flex items-center gap-2 text-accent">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.9s' }} />
                  <span className="text-sm font-medium uppercase tracking-wide">Data & Insights</span>
                </div>
                <h3 className="text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                  Analytics Dashboard
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Track hiring metrics, performance trends, and ROI with comprehensive analytics and detailed reporting capabilities.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-accent font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Live metrics</span>
                  </div>
                  <div className="flex items-center gap-2 text-accent font-medium">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">ROI tracking</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-8 right-8 w-24 h-24 bg-accent/10 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
            </div>
          </div>

          {/* Feature 5: ATS Integrations */}
          <div 
            className="group opacity-0 animate-fade-in"
            style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
          >
            <div className="relative bg-gradient-to-br from-card to-primary/5 rounded-3xl p-10 border border-primary/20 shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:border-primary/40 transition-all duration-500">
              {/* Icon Badge */}
              <div className="absolute -top-4 left-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                  <Link2 className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="pt-8 space-y-6">
                <div className="flex items-center gap-2 text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1.2s' }} />
                  <span className="text-sm font-medium uppercase tracking-wide">Seamless Integration</span>
                </div>
                <h3 className="text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">
                  ATS Integrations
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Seamlessly connect with Workable, Bullhorn, BambooHR, and 20+ other popular ATS platforms for unified workflow.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">20+ platforms</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">Instant sync</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-8 right-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Statistics; 