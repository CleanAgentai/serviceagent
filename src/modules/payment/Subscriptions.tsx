import { StripeCheckoutBox } from "@/components/stripe/StripeCheckoutBox";
import React, { useState, useMemo, useEffect } from "react";
import { CheckCircle, ArrowRight, Zap, TrendingUp, Users, Star, Sparkles, Check, ChevronDown, ArrowLeft, Leaf, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { FormControlLabel } from "@mui/material";
import { Switch } from "@mui/material";
import { getPlans, planPerks, planThemes } from './planConfig.tsx';


export const Subscriptions: React.FC = () => {
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedYearly, setSelectedYearly] = useState<boolean | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const plans = getPlans(isYearly);
  
  const currency = "$";

  useEffect(() => {
    const inboundPlan = (location.state as any)?.plan || localStorage.getItem('selectedPlan');
    if (inboundPlan) {
      const planMap: Record<string, string> = {
        'STARTER': 'Starter',
        'LAUNCH': 'Launch', 
        'SCALE': 'Scale'
      };
      const planTitle = planMap[inboundPlan.toUpperCase()];
      if (planTitle) {
        setSelectedPlan(planTitle);
        setSelectedYearly(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [location.state]);

  
  // Potentially pull from backend
  // Compute 14-day trial end date for display
  const trialEndDisplay = (() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  })();

  console.log("Subscriptions");

  function wrapper(plan, yearly) {
    setSelectedPlan(plan);
    setSelectedYearly(yearly);
    
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const planByKey = useMemo(() => {
    const map = new Map(plans.map((p) => [p.key, p] as const));
    return (key: string) => map.get(key) || null;
  }, [plans]);
  
  const starterPlan = useMemo(() => planByKey('STARTER'), [plans, isYearly]);
  const launchPlan = useMemo(() => planByKey('LAUNCH'), [plans, isYearly]);
  const scalePlan = useMemo(() => planByKey('SCALE'), [plans, isYearly]);


  const perks = planPerks({
    STARTER: starterPlan?.cost_per_candidate,
    LAUNCH: launchPlan?.cost_per_candidate,
    SCALE: scalePlan?.cost_per_candidate,
  });

  // planThemes imported from shared config

  /* Memoized handle for selected plan for payment page construction */
  const selected = useMemo(() => {
    const found = plans.find(p => p.title === selectedPlan);
    return found;
  }, [plans, selectedPlan]);

  const faqs = [
    {
      id: "1", 
      question: "Do I need a credit card?",
      answer: "Yes, we require a card to activate your free trial. You won’t be charged unless you continue after 14 days."
    },
    {
      id: "2",
      question: "Can I cancel anytime?",
      answer: "Yes. Cancel within your trial and you’ll never be billed."
    },
    {
      id: "3",
      question: "What happens after the trial?",
      answer: "You’ll automatically move into your selected plan. You can upgrade, downgrade, or cancel at any time."
    }
  ];

  return (
    <div className="max-w-screen-xl mt-4 mx-auto px-3 sm:px-4 lg:px-6 py-0 md:py-2 flex flex-col">
      {!selectedPlan && <div className="flex justify-center mb-4">
        <img src="/logos/Brandmark.svg" alt="ServiceAgent Icon" className="h-20 w-20 max-w-none object-contain" />
      </div>}
      {!selectedPlan && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Start Free, No Risk</h2>
          <div className="flex flex-col [min-height:0!important] items-center max-sm:justify-center text-muted-foreground">
            <p className="text-gray-600 hyphens-none min-h-0">Join 150+ service businesses already using ServiceAgent.<br />
            <span className="text-xs sm:text-sm text-gray-500">All plans start with a 14-day free trial. Cancel anytime before your trial ends.</span>
          </p>
          </div>
        </div>
      )}
      {!selectedPlan && (
        <>
          <div className="flex justify-center items-center mb-12 lg:mb-20">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 max-w-screen-xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Starter Plan */}
          <div 
            className="group opacity-0 animate-fade-in max-md:mb-16"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <div className="relative bg-gradient-to-br from-teal/5 to-teal/10 rounded-3xl p-8 border-2 border-teal/30 shadow-3xl hover:shadow-[0_25px_80px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-4 hover:border-teal/80 transition-all duration-500 h-full flex flex-col">
              {/* Header */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal to-teal/80 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-teal/40 group-hover:scale-110 transition-transform duration-300 mb-4">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary group-hover:text-teal transition-colors duration-300 mb-2">{starterPlan?.title} Plan</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {starterPlan?.description}
                </p>
                <div className="text-center mb-8">
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold text-primary">
                        {starterPlan?.price}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    {!isYearly && (
                      <>
                        <div className="text-sm text-muted-foreground">(billed monthly) <span className="font-bold">≈ {starterPlan?.cost_per_candidate}</span></div>
                      </>
                    )}
                    {isYearly && (
                      <div className="text-sm text-muted-foreground">(billed yearly) <span className="font-bold">≈ {starterPlan?.cost_per_candidate}</span></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="flex-1 space-y-4 mb-8">
                {starterPlan?.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
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
                    aria-label="Start free trial with Starter Plan - 10 AI interviews per month, 14 days free"
                    onClick={() => wrapper(starterPlan?.title, isYearly)}
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

          {/* Launch Plan */}
          <div 
            className="group opacity-0 animate-fade-in max-md:mb-16"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <div className="relative bg-gradient-to-br from-card to-gold/5 rounded-3xl p-8 border-2 border-gold/40 transition-all shadow-xl hover:shadow-3xl hover:-translate-y-4 duration-300 h-full flex flex-col transform lg:scale-105">
              {/* Header */}
              <div className="text-center pt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-gold/40 group-hover:scale-110 transition-transform duration-300 mb-6">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary group-hover:text-gold transition-colors duration-300 mb-2">{launchPlan?.title} Plan</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {launchPlan?.description}
                </p>
                {launchPlan?.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-gold to-gold/80 text-white px-6 py-3 rounded-full text-sm text-center font-bold shadow-xl shadow-gold/30 flex items-center gap-2 whitespace-nowrap">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

                <div className="text-center mb-8">
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold text-primary">
                        {launchPlan?.price}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    {!isYearly && (
                      <>
                        <div className="text-sm text-muted-foreground">(billed monthly) <span className="font-bold">≈ {launchPlan?.cost_per_candidate}</span></div>
                      </>
                    )}
                    {isYearly && (
                      <div className="text-sm text-muted-foreground">(billed yearly) <span className="font-bold">≈ {launchPlan?.cost_per_candidate}</span></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="flex-1 space-y-4 mb-8">
                {launchPlan?.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
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
                    className="flex w-full bg-gradient-to-r from-gold to-gold/90 text-white py-3 px-2 text-lg font-bold rounded-xl shadow-xl shadow-gold/40 hover:shadow-gold/50 hover:scale-105 active:scale-95 transition-all duration-300"
                    aria-label="Start free trial with Launch Plan - 20 AI interviews per month, 14 days free"
                    onClick={() => wrapper(launchPlan?.title, isYearly)}
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
        
          {/* Scale Plan - Popular */}
          <div 
            className="group opacity-0 animate-fade-in max-md:mb-16"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <div className="relative bg-gradient-to-br from-card to-terracotta/5 rounded-3xl p-8 border-2 border-terracotta/40 transition-all shadow-xl hover:shadow-3xl hover:-translate-y-4 duration-300 h-full flex flex-col transform">
              {/* Header */}
              <div className="text-center pt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-terracotta to-terracotta/80 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-terracotta/40 group-hover:scale-110 transition-transform duration-300 mb-6">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary group-hover:text-terracotta transition-colors duration-300 mb-2">{scalePlan?.title} Plan</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {scalePlan?.description}
                </p>
                <div className="text-center mb-8">
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold text-primary">
                        {scalePlan?.price}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    {!isYearly && (
                      <>
                        <div className="text-sm text-muted-foreground">(billed monthly) <span className="font-bold">≈ {scalePlan?.cost_per_candidate}</span></div>
                      </>
                    )}
                    {isYearly && (
                      <div className="text-sm text-muted-foreground">(billed yearly) <span className="font-bold">≈ {scalePlan?.cost_per_candidate}</span></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="flex-1 space-y-4 mb-8">
                {scalePlan?.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-terracotta/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-terracotta" />
                    </div>
                    <span className="text-left text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="space-y-3">
                  <Button 
                    className="flex w-full bg-gradient-to-r from-terracotta to-terracotta/90 hover:from-terracotta/90 hover:to-terracotta text-white py-3 px-2 text-lg font-bold rounded-xl shadow-xl shadow-terracotta/50 hover:scale-105 active:scale-95 transition-all duration-300"
                    aria-label="Start free trial with Scale Plan - 100 AI interviews per month, most popular choice"
                    onClick={() => wrapper(scalePlan?.title, isYearly)}
                  >
                    <div className="flex items-center text-sm gap-2 px-2">
                      <Sparkles className="w-5 h-5" />
                      Start Free Trial
                    </div>
                  </Button>
                <div className="text-center space-y-2">
                  <p className="text-xs text-muted-foreground font-semibold hyphens-none break-words">
                    No charges today. <br /> Cancel anytime before trial ends.
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
        
        {/* Contact Sales */}
        <div className="max-w-6xl mx-auto mt-16 lg:mt-20">
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
        </>
      )}
  
      {/* CHECKOUT */}
      {selectedPlan && (
      <section className="relative mx-auto max-w-screen-2xl py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] items-stretch gap-y-12 lg:gap-0">
      
      {/* LEFT: Payment (Stripe) */}
       <div className="px-3 sm:px-4 lg:px-10 self-stretch">
        <div className="flex justify-center lg:justify-start mb-4">
          <img
            src="/logos/Brandmark.svg"
            alt="ServiceAgent Icon"
            className="h-20 w-20 max-w-none object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-center lg:text-left">Get started for absolutely free</h2>
        <div className="mt-2 text-center lg:text-left">
            <button
              onClick={() => wrapper(null, null)}
            className="group inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Change plan
            </button>
          </div>

        {/* Stripe container */}
        <div className="mt-4">
          <StripeCheckoutBox planName={selectedPlan} yearly={!!selectedYearly} />
        </div>

        {/* Notes */}
        <div className="mt-4 space-y-3 text-xs text-muted-foreground text-center lg:text-left">
          <p>
            By providing your card information, you allow ServiceAgent to charge your card for
            future payments in accordance with their terms.
          </p>
          <p className="leading-relaxed">
            You won’t be billed unless you keep using the service after 14 days or usage exceeds
            your included limits.
          </p>
          </div>
          
        <div className="mt-4 text-center">
          <p className="text-[11px] font-semibold text-muted-foreground">
            No charges today. Cancel anytime before your trial ends.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex justify-center items-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-slate-600">
              <img src="/Powered by Stripe - blurple.svg" alt="Stripe" className="w-full max-sm:w-[30vw] h-4 md:h-10" />
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium">SSL Encrypted</span>
            </div>
          </div>
      </div>

      {/* RIGHT: Summary / Perks */}
        <div
          className={`${planThemes[selected.key].bannerGradient} ${planThemes[selected.key].borderClass} rounded-2xl px-3 sm:px-4 lg:px-10 py-8 h-full self-stretch`}
        >
        <aside className="p-0">
          <h3 className="text-3xl sm:text-4xl font-bold leading-relaxed text-center sm:text-left">
            {selected.headline}
            <br />
            <span className={`${planThemes[selected.key].highlightText}`}>
              with AI interviewing
            </span>
          </h3>

          {/* Current plan summary */}
          {(() => {
            const theme = planThemes[selected.key];
            return (
              <div className={`mt-6 border-2 rounded-2xl p-6 bg-card ${theme.borderClass}`}>
                <div className="flex items-center justify-between">
                <p className="text-md text-muted-foreground mb-1">Current Plan</p>
                <div className="text-xs line-through text-slate-400">
                  {selectedYearly ? selected.yearPrice : selected.price}
                </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xl">{selectedPlan} Plan {selectedYearly ? "(Yearly)" : "(Monthly)"}</div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${theme.highlightText}`}>$0 due today</div>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {selectedYearly ? (
                    <>
                      Then <span className="font-semibold">{selected.yearPrice}</span> per year
                      starting after your trial ends on <span className="font-semibold">{trialEndDisplay}</span>.
                    </>
                  ) : (
                    <>
                      Then <span className="font-semibold">{planByKey(selected.key)?.price}</span> per month
                      after your trial ends on <span className="font-semibold">{trialEndDisplay}</span>.
                    </>
                  )}
                </p>
              </div>
            );
          })()}

          {/* Perks */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Your plan comes with</h4>
            {(() => {
              const theme = planThemes[selected.key];
              const planPerksList = perks[selected.key];
              return (
                <ul className="space-y-3">
                  {planPerksList.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full shadow ${theme.checkGradient}`}
                      >
                        <Check className="h-3 w-3 text-white" />
                      </span>
                      <span className="text-sm text-slate-700">{f}</span>
                    </li>
                  ))}
                </ul>
              );
            })()}
          </div>

          {/* FAQ */}
          <div className="mt-10 mx-auto">
            <h4 className="text-xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h4>
            <p className="text-slate-600 mb-4">Everything you need to know about your free trial</p>
            <div className="rounded-2xl border border-border/50 overflow-hidden">
              <div className="divide-y divide-border/30">
                {faqs.map((item, index) => (
                  <div
                    key={item.id}
                    className={`group p-6 hover:bg-gradient-to-r hover:from-teal/5 hover:to-gold/5 transition-all duration-300`}
                    style={{ animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: "forwards" }}
                  >
                    <details className="group/details open:block">
                      <summary className="flex items-center justify-between cursor-pointer list-none group-hover:text-primary transition-colors duration-200 w-full">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-teal/20 to-gold/20 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-xs font-bold text-teal">{index + 1}</span>
                          </div>
                          <h3 className="text-base md:text-lg font-semibold text-foreground leading-tight pr-2 hyphens-none break-words min-w-0 flex-1">
                            {item.question}
                          </h3>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-terracotta/20 flex items-center justify-center group-hover:from-gold/30 group-hover:to-terracotta/30 transition-all duration-300 group-open/details:rotate-45">
                        <ChevronDown className="w-5 h-5 text-gold transition-transform duration-300 group-open/details:rotate-180" />
                      </div>
                        </div>
                      </summary>
                      <div className="mt-6 ml-12 pr-4">
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal/30 via-gold/30 to-terracotta/30 rounded-full"></div>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed pl-6 py-2 hyphens-none break-words">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-12">
            <div className="rounded-2xl border border-border/50 p-8 text-center">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
                    <span className="text-3xl text-gold">"</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-terracotta/20 shadow-lg">
                    <img
                      src="/workers/Porter_Testimonial.png"
                      alt=""
                      className="w-full h-full rounded-full object-cover object-center scale-125 border-4 border-terracotta/20 shadow-lg overflow-hidden"
                    />
                  </div>
                </div>
                <blockquote className="text-xl md:text-2xl font-medium text-primary leading-relaxed max-w-3xl mx-auto">
                  To hire 1 cleaner, I had to spend 18+ hours interviewing 35 candidates. I started using ServiceAgent to interview cleaners and now I spend 2 hours/month reviewing the top candidates who I actually want to hire.
                </blockquote>
                <div className="space-y-1">
                  <p className="text-base font-bold text-primary">Porter S.</p>
                  <p className="text-muted-foreground font-medium">Owner at Clementine's Cleaning</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
)}


      {/* FAQ Section - show on pricing page only (not during checkout) */}
      {!selectedPlan && (
      <div className="container mx-auto px-6 relative">

      <div className="absolute top-1/4 left-0 w-72 h-72 bg-terracotta/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
      <div className="mt-16 container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h3>
          <p className="text-slate-600">Everything you need to know about your free trial</p>
        </div>
        
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 shadow-xl overflow-hidden">
          <div className="divide-y divide-border/30">
            {faqs.map((item, index) => (
              <div
                key={item.id}
                className={`group p-8 hover:bg-gradient-to-r hover:from-teal/5 hover:to-gold/5 transition-all duration-300 motion-safe:animate-fade-in ${
                  index === 0 ? 'rounded-t-3xl' : ''
                } ${index === faqs.length - 1 ? 'rounded-b-3xl' : ''}`}
                style={{ 
                  animationDelay: `${0.2 + index * 0.1}s`, 
                  animationFillMode: 'forwards' 
                }}
              >
                <details className="group/details open:block">
                  <summary className="flex items-center justify-between cursor-pointer list-none group-hover:text-primary transition-colors duration-200 w-full">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-teal/20 to-gold/20 rounded-full flex items-center justify-center mt-1 group-hover:from-teal/30 group-hover:to-gold/30 transition-all duration-300">
                        <span className="text-sm font-bold text-teal">{index + 1}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight pr-4 hyphens-none break-words min-w-0 flex-1">
                        {item.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-terracotta/20 flex items-center justify-center group-hover:from-gold/30 group-hover:to-terracotta/30 transition-all duration-300 group-open/details:rotate-45">
                        <ChevronDown className="w-5 h-5 text-gold transition-transform duration-300 group-open/details:rotate-180" />
                      </div>
                    </div>
                  </summary>
                  
                  <div className="mt-6 ml-12 pr-4">
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal/30 via-gold/30 to-terracotta/30 rounded-full"></div>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed pl-6 py-2 hyphens-none break-words">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </details>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
      )}

      {/* Testimonial Section - show on pricing page only (not during checkout) */}
      {!selectedPlan && (
      <div className="container mx-auto px-6 relative">
      <div className="my-16 max-w-4xl mx-auto">

      <div className="absolute top-1/4 left-0 w-72 h-72 bg-terracotta/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
        <div className="bg-gradient-to-br from-card to-background/50 border border-border/50 rounded-3xl shadow-xl p-12 text-center">
          <div className="space-y-8">
            {/* Quote Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
                <span className="text-3xl text-gold">"</span>
              </div>
            </div>
            <div className="flex justify-center hover:scale-110 transition-all duration-300">
                 <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-terracotta/20 shadow-lg">
                    <img
                      src="/workers/Porter_Testimonial.png"
                      alt=""
                      className="w-full h-full rounded-full object-cover object-center scale-125 border-4 border-terracotta/20 shadow-lg overflow-hidden"
                    />
                   {/* <div className="z-10 absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-terracotta to-terracotta/80 rounded-full flex items-center justify-center">
                     <Check className="w-4 h-4 text-white" />
                   </div> */}
                 </div>
               </div>
            
            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl font-medium text-primary leading-relaxed max-w-3xl mx-auto">
              To hire 1 cleaner, I had to spend 18+ hours interviewing 35 candidates. I started using ServiceAgent to interview cleaners and now I spend 2 hours/month reviewing the top candidates who I actually want to hire.
            </blockquote>
            
            {/* Attribution */}
            <div className="space-y-2">
              <p className="text-lg font-bold text-primary">Porter S.</p>
              <p className="text-muted-foreground font-medium">Owner at Clementine's Cleaning</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      )}
    </div>
  );
};
