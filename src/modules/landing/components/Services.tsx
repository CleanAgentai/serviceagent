import { useState } from "react";
import { CheckCircle, ArrowRight, DollarSign, Shield, Check, Zap, Clock, Users, TrendingUp, Star, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const Services = () => {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      title: "Launch",
      price: isYearly ? "$119" : "$149",
      originalPrice: isYearly ? "$149" : null,
      headline: "Save 15+ hours per hire",
      yearPrice: "$1,430",
      period: isYearly ? "/month (billed yearly)" : "/month",
      cost_per_day: isYearly ? "≈ $4/day" : "≈ $5/day",
      description: "Best for getting started",
      features: [
        "20 AI interviews/month",
        "Create unlimited job posts",
        "Ranked candidates (1-10)",
        "Qualified vs. unqualified scoring",
        "Candidate videos + transcripts",
        "Custom branding for candidates",
        "Email support",
        "Save 15+ hours/month on hiring"
      ],
      popular: true,
      key: "LAUNCH",
      cta: "Start for Free",
      ctaLink: "/signup"
    },
    {
      title: "Scale",
      price: isYearly ? "$479" : "$599",
      originalPrice: isYearly ? "$599" : null,
      headline: "Hire 5× faster",
      yearPrice: "$5,750",
      period: isYearly ? "/month (billed yearly)" : "/month",
      cost_per_day: isYearly ? "≈ $16/day" : "≈ $20/day",
      description: "For growing companies with higher volume",
      features: [
        "Everything included in Launch Plan, plus",
        "100 AI interviews/month",
        "ATS Integration",
        "Priority Phone Support",
        "Save 50+ hours/month on hiring"
      ],
      popular: false,
      key: "SCALE",
      cta: "Start for Free",
      ctaLink: "/signup"
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
        
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto max-w-4xl">
        {/* Launch Plan */}
          <div 
            className="group opacity-0 animate-fade-in max-md:mb-16"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <div className="relative bg-gradient-to-br from-teal/5 to-teal/10 rounded-3xl p-8 border-2 border-teal/30 shadow-3xl hover:shadow-[0_25px_80px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-4 hover:border-teal/80 transition-all duration-500 h-full flex flex-col">
              {/* Header */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal to-teal/80 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-teal/40 group-hover:scale-110 transition-transform duration-300 mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary group-hover:text-teal transition-colors duration-300 mb-2">{plans[0].title} Plan</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plans[0].description}
                </p>
                {plans[0].popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-teal to-teal/80 text-white px-6 py-2 rounded-full text-sm text-center font-bold shadow-xl shadow-teal/30 flex items-center gap-2 whitespace-nowrap">
                      <Star className="w-4 h-4 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

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
                        <>
                        <div className="text-sm text-muted-foreground">(billed monthly)</div>
                          <div className="text-sm text-muted-foreground mt-1">{plans[0].cost_per_day}</div>
                        </>
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
                {plans[0].features.map((feature, index) => (
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
                  <Button 
                    className="flex w-full bg-gradient-to-r from-teal to-teal/90 hover:from-teal/90 hover:to-teal text-white py-3 px-2 text-lg font-bold rounded-xl shadow-xl shadow-teal/40 hover:scale-105 active:scale-95 transition-all duration-300"
                    aria-label="Start free trial with Launch Plan - 20 AI interviews per month, 14 day free"
                    onClick={() => navigate(plans[0].ctaLink)}
                  >
                    <div className="flex items-center text-sm gap-2 px-2">
                      <Zap className="w-5 h-5" />
                      Start Free Trial
                    </div>
                  </Button>
                <div className="text-center space-y-2">
                  <p className="text-xs text-muted-foreground font-semibold hyphens-none break-words">No charges today. 
                    <br />Cancel anytime before trial ends.</p>
                </div>
              </div>
            </div>
          </div>
        
          {/* Scale Plan - Popular */}
          <div 
            className="group opacity-0 animate-fade-in max-md:mb-16"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <div className="relative bg-gradient-to-br from-card to-gold/5 rounded-3xl p-8 border-2 border-gold/40 transition-all shadow-xl hover:shadow-3xl hover:-translate-y-4 duration-300 h-full flex flex-col transform">
              {/* Header */}
              <div className="text-center pt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-gold/40 group-hover:scale-110 transition-transform duration-300 mb-6">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary group-hover:text-gold transition-colors duration-300 mb-2">{plans[1].title} Plan</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plans[1].description}
                </p>


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
                        <>
                        <div className="text-sm text-muted-foreground">(billed monthly)</div>
                          <div className="text-sm text-muted-foreground mt-1">{plans[1].cost_per_day}</div>
                        </>
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
                {plans[1].features.map((feature, index) => (
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
                  <Button 
                    className="flex w-full bg-gradient-to-r from-gold to-gold/90 hover:from-terracotta hover:to-terracotta/90 text-white py-3 px-2 text-lg font-bold rounded-xl shadow-xl shadow-gold/40 hover:shadow-terracotta/50 hover:scale-105 active:scale-95 transition-all duration-300"
                    aria-label="Start free trial with Scale Plan - 100 AI interviews per month, most popular choice"
                    onClick={() => navigate(plans[1].ctaLink)}
                  >
                    <div className="flex items-center text-sm gap-2 px-2">
                      <Sparkles className="w-5 h-5" />
                      Start Free Trial
                    </div>
                  </Button>
                <div className="text-center space-y-2">
                  <p className="text-xs text-muted-foreground font-semibold hyphens-none break-words">No charges today. <br />Cancel anytime before trial ends.</p>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className="max-w-xl mx-auto mt-4 md:mt-16">
            <div className="group opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              <div className="relative bg-gradient-to-br from-card to-terracotta/5 rounded-3xl p-8 border border-terracotta/20 shadow-xl hover:shadow-3xl hover:-translate-y-1 hover:border-terracotta/40 transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-primary text-center lg:text-left mb-1">Need your own pricing?</h3>
                    <p className="text-muted-foreground text-center lg:text-left">We can tailor a plan for your team and workflow.</p>
                  </div>
                  <a href="https://calendly.com/serviceagent/25min" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-terracotta/30 text-terracotta hover:bg-terracotta hover:text-white py-3 px-6 text-base font-bold rounded-xl">
                      Talk to us
                  </Button>
                </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Selection Note */}
          <div className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-sm text-slate-600 font-semibold">
              All plans include every feature during your 14-day trial. You can switch plans anytime.
            </p>
          </div>
      </div>{/* container */}
    </section>
  );
};

export default Services;
