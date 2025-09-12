import { useState } from "react";
import { CheckCircle, ArrowRight, DollarSign, Shield, Check, Zap, Clock, Users, TrendingUp, Star, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const Services = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      title: "Launch Plan",
      price: isYearly ? "$119" : "$149",
      originalPrice: isYearly ? "$149" : null,
      period: isYearly ? "/month (billed yearly)" : "/month",
      description: "For small businesses getting started",
      features: [
        "20 AI interviews/month",
        "4 job posts/week",
        "Top candidates ranked for you",
        "Email support",
        "Saves 10+ hours/month on hiring"
      ],
      popular: false,
      cta: "Start for Free",
      ctaLink: "/signup"
    },
    {
      title: "Scale Plan",
      price: isYearly ? "$479" : "$599",
      originalPrice: isYearly ? "$599" : null,
      period: isYearly ? "/month (billed yearly)" : "/month",
      description: "For growing companies with higher volume hiring",
      features: [
        "100 AI interviews/month",
        "20 job posts/week",
        "Your logo + branding for candidates",
        "Interview transcripts + analytics",
        "Priority support",
        "Integration with your ATS",
        "Saves 50+ hours/month and fills roles faster"
      ],
      popular: true,
      cta: "Start for Free",
      ctaLink: "/signup"
    },
    {
      title: "Enterprise Plan",
      price: "Custom Pricing",
      originalPrice: null,
      period: "",
      description: "For franchises, chains, or large teams hiring at scale",
      features: [
        "Unlimited AI interviews + job posts",
        "24/7 phone support",
        "Dedicated account manager",
        "Custom branding + white-label",
        "Integration with your ATS",
        "Let our team set everything for you",
      ],
      popular: false,
      cta: "Contact Sales",
      ctaLink: "https://calendly.com/serviceagent/30min"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-teal/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div 
          className="text-center space-y-6 mb-16 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4">
            <DollarSign className="w-4 h-4" />
            Simple Pricing
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-primary leading-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose the plan that works for you. All plans include access to our platform and dedicated support.
          </p>
        </div>

        <div className="flex justify-center items-center mb-20">
        <span className={`mr-4 font-medium transition-all duration-300 ${isYearly ? 'text-slate-900' : 'text-slate-600'}`}>
      Yearly (Save 20%)
    </span>

      <FormControlLabel
        label=""
        control={
          <Switch
            checked={isYearly}
            onChange={(_, checked) => setIsYearly(checked)}
            inputProps={{ 'aria-label': 'Toggle yearly billing' }}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#F4A261',
                '& + .MuiSwitch-track': { backgroundColor: '#F4A261' },
              },
            }}          
          />
        }
      />
    </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Launch Plan */}
          <div 
            className="group opacity-0 animate-fade-in max-md:mb-16"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <div className="relative bg-gradient-to-br from-card to-teal/5 rounded-3xl p-8 border border-teal/20 shadow-xl hover:shadow-3xl hover:-translate-y-3 hover:border-teal/40 transition-all duration-500 h-full flex flex-col">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-teal to-teal/80 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-teal/40 group-hover:scale-110 transition-transform duration-300 mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary group-hover:text-teal transition-colors duration-300 mb-2">{plans[0].title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  For small businesses getting started
                </p>

                <div className="text-center mb-8">
                  {plans[0].price === "Custom Pricing" ? (
                    <span className="text-4xl font-extrabold text-slate-900">
                      {plans[0].price}
                    </span>
                  ) : (
                    <div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <span className="text-4xl font-bold text-primary">
                          {plans[0].price}
                        </span>
                        <span className="text-muted-foreground">
                          /month
                        </span>
                      </div>
                      {!isYearly && (
                        <div className="text-sm text-muted-foreground">(billed monthly)</div>
                      )}
                      {isYearly && (
                        <div className="text-sm text-muted-foreground">(billed yearly)</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="flex-1 space-y-4 mb-8">
                {[
                  "20 AI interviews/month",
                  "4 job posts/week", 
                  "Top candidates ranked for you",
                  "Email support",
                  "Saves 15+ hours/month on hiring"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-teal/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-teal" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="space-y-3">
                <Link to="/signup" className="block w-full">
                  <Button 
                    className="flex w-full bg-gradient-to-r from-teal to-teal/90 hover:from-teal/90 hover:to-teal text-white py-3 text-lg font-bold rounded-xl shadow-xl shadow-teal/40 hover:scale-105 active:scale-95 transition-all duration-300"
                    aria-label="Start free trial with Launch Plan - 20 AI interviews per month, 14 day free trial"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Start for Free
                    </div>
                  </Button>
                </Link>
                <div className="text-center space-y-1">
                  <p className="text-xs text-muted-foreground">14 Days Free Trial</p>
                </div>
              </div>
            </div>
          </div>
        
          {/* Scale Plan - Popular */}
          <div 
            className="group opacity-0 animate-fade-in max-md:mb-16"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <div className="relative bg-gradient-to-br from-card to-gold/5 rounded-3xl p-8 border-2 border-gold/40 shadow-3xl hover:shadow-[0_25px_80px_-12px_rgba(0,0,0,0.25)] lg:scale-105 hover:-translate-y-4 hover:border-gold/60 transition-all duration-300 h-full flex flex-col transform">
              {/* Header */}
              <div className="text-center mb-8 pt-4">
                <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-gold/40 group-hover:scale-110 transition-transform duration-300 mb-6">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary group-hover:text-gold transition-colors duration-300 mb-2">{plans[1].title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plans[1].description}
                </p>

                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-gold to-gold/90 text-white px-6 py-2 rounded-full text-sm text-center font-bold shadow-xl shadow-gold/40 flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>

                <div className="text-center mb-8">
                  {plans[1].price === "Custom Pricing" ? (
                    <span className="text-4xl font-extrabold text-slate-900">
                      {plans[1].price}
                    </span>
                  ) : (
                    <div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <span className="text-4xl font-bold text-primary">
                          {plans[1].price}
                        </span>
                        <span className="text-muted-foreground">
                          /month
                        </span>
                      </div>
                      {!isYearly && (
                        <div className="text-sm text-muted-foreground">(billed monthly)</div>
                      )}
                      {isYearly && (
                        <div className="text-sm text-muted-foreground">(billed yearly)</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="flex-1 space-y-4 mb-8">
                {[
                  "100 AI interviews/month",
                  "20 job posts/week",
                  "Your logo + branding for candidates", 
                  "Interview transcripts + analytics",
                  "Priority support",
                  "Integration with your ATS",
                  "Saves 50+ hours/month and fills roles faster"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gold/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-left text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="space-y-3">
                <Link to="/signup" className="block w-full">
                  <Button 
                    className="flex w-full bg-gradient-to-r from-gold to-gold/90 hover:from-terracotta hover:to-terracotta/90 text-white py-3 text-lg font-bold rounded-xl shadow-xl shadow-gold/40 hover:shadow-terracotta/50 hover:scale-105 active:scale-95 transition-all duration-300"
                    aria-label="Start free trial with Scale Plan - 100 AI interviews per month, most popular choice"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Start for Free
                    </div>
                  </Button>
                </Link>
                <div className="text-center space-y-1">
                  <p className="text-xs text-muted-foreground">14 Days Free Trial</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div 
            className="group opacity-0 animate-fade-in"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            <div className="relative bg-gradient-to-br from-card to-terracotta/5 rounded-3xl p-8 border border-terracotta/20 shadow-xl hover:shadow-3xl hover:-translate-y-3 hover:border-terracotta/40 transition-all duration-500 h-full flex flex-col">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-terracotta to-terracotta/80 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-terracotta/40 group-hover:scale-110 transition-transform duration-300 mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary group-hover:text-terracotta transition-colors duration-300 mb-2">
                  Enterprise Plan
                </h3>
                <p className="text-muted-foreground text-sm">
                  For franchises, chains, or large teams hiring at scale
                </p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <span className="text-3xl font-bold text-primary">Custom</span>
                </div>
                <div className="text-sm text-muted-foreground">tailored to your needs</div>
              </div>

              {/* Features */}
              <div className="flex-1 space-y-4 mb-8">
                {[
                  "Unlimited AI interviews + job posts",
                  "24/7 phone support",
                  "Dedicated account manager",
                  "Custom branding + white-label",
                  "Integration with your ATS",
                  "Let our team set everything for you"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-terracotta/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-terracotta" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="space-y-3">
                <a 
                  href="https://calendly.com/serviceagent/25min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button 
                    variant="outline"
                    className="w-full border-terracotta/30 text-terracotta hover:bg-terracotta hover:text-white py-3 text-lg font-bold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Book a Demo
                    </div>
                  </Button>
                </a>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Custom pricing available</p>
                </div>
              </div>
            </div>
          </div>
        </div>{/* grid */}
      </div>{/* container */}
    </section>
  );
};

export default Services;
