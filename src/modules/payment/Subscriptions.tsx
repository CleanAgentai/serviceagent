import { StripeCheckoutBox } from "@/components/stripe/StripeCheckoutBox";
import React, { useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Subscriptions: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedYearly, setSelectedYearly] = useState<boolean | null>(null);
  const [isYearly, setIsYearly] = useState(true);
  const currency = "$";

  function wrapper(plan, yearly) {
    setSelectedPlan(plan);
    setSelectedYearly(yearly);
  }

  // Launch and Scale plans for new design
  const newPlans = [
    {
      title: "Launch",
      price: isYearly ? "$119" : "$149",
      originalPrice: isYearly ? "$149" : null,
      period: isYearly ? "/month (billed yearly)" : "/month",
      description: "Perfect for small businesses getting started",
      features: [
        "20 AI interviews/month",
        "4 job posts/week",
        "Interview transcripts",
        "Ranking system (trained on 1M+ hires)",
        "Email support"
      ],
      popular: false,
      key: "LAUNCH"
    },
    {
      title: "Scale",
      price: isYearly ? "$479" : "$599",
      originalPrice: isYearly ? "$599" : null,
      period: isYearly ? "/month (billed yearly)" : "/month",
      description: "For growing companies with higher volume",
      features: [
        "100 interviews/month",
        "20 job posts/week",
        "Custom branding",
        "10+ languages supported",
        "Priority support",
        "Analytics dashboard"
      ],
      popular: true,
      key: "SCALE"
    }
  ];

  // Custom plan (keep as is)
  const customPlan = {
    name: "Custom",
    description: (
      <>
        <p>Custom Enterprise-level features and support.</p>
        <br />
        <p>Fully customizable plan. <a href="https://calendly.com/serviceagent/30min"><span className="text-blue-500">Contact us </span></a> directly for questions.</p>
      </>
    ),
    price: { monthly: "Custom", yearly: "Custom" },
    key: "CUSTOM"
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-0 md:py-2 flex flex-col">
      <div className="flex justify-center mb-4">
        <img src="/singularlogo.png" alt="ServiceAgent Icon" className="h-16 w-16 max-w-none object-contain md:h-16 md:w-auto md:max-w-none" />
      </div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
        <p className="text-gray-600">
          Select a plan to start your free 7-day trial. You won't be charged until the trial ends.
        </p>
      </div>
      {!selectedPlan && (
        <>
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-[#0E7CFF]/20">
              <button onClick={() => setIsYearly(false)} className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${!isYearly ? 'bg-[#0E7CFF] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Monthly</button>
              <button onClick={() => setIsYearly(true)} className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${isYearly ? 'bg-[#0E7CFF] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Yearly (Save 20%)</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {newPlans.map((plan) => (
              <Card key={plan.key} className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${plan.popular ? 'bg-gradient-to-br from-[#A1E3FF]/10 to-white ring-2 ring-[#0E7CFF]/30' : 'bg-white/80 backdrop-blur-sm'}`}>
                <CardContent className="p-8 flex flex-col h-full">
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-2 px-6 rounded-full font-semibold text-sm">Most Popular</div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{plan.title}</h3>
                    <div className="mb-4">
                      <span className="text-5xl font-extrabold text-slate-900">{plan.price}</span>
                      <span className="text-lg text-slate-600 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{plan.description}</p>
                  </div>
                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-slate-600"><CheckCircle className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5" /><span>{feature}</span></li>
                    ))}
                  </ul>
                  <div className="flex-1 flex flex-col justify-end">
                    {isYearly ? (
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3" onClick={() => wrapper(plan.title, true)}>
                        Choose Plan
                      </Button>
                    ) : (
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3" onClick={() => wrapper(plan.title, false)}>
                        Choose Plan
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            {/* Custom Plan Card (Enterprise style) */}
            <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Enterprise</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-extrabold text-slate-900">Custom</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">Tailored solutions for large organizations</p>
                </div>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-start text-slate-600"><CheckCircle className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5" /><span>Unlimited interviews</span></li>
                  <li className="flex items-start text-slate-600"><CheckCircle className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5" /><span>Unlimited job posts</span></li>
                  <li className="flex items-start text-slate-600"><CheckCircle className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5" /><span>Dedicated account manager</span></li>
                  <li className="flex items-start text-slate-600"><CheckCircle className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5" /><span>White-label solution</span></li>
                  <li className="flex items-start text-slate-600"><CheckCircle className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5" /><span>Custom integrations</span></li>
                  <li className="flex items-start text-slate-600"><CheckCircle className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5" /><span>24/7 phone support</span></li>
                </ul>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  onClick={() => window.open('https://calendly.com/serviceagent/30min', '_blank')}
                >
                  Book a Call
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Selection Note */}
          <div className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-sm text-slate-600">
              All plans include all features during your trial. You can change your plan at any time.
            </p>
          </div>
        </>
      )}
      {selectedPlan && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow mt-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">
              Enter Payment Details
            </h2>
            <p className="text-gray-600 text-sm">
              Your 7-day free trial begins now. You can cancel anytime before {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} to avoid charges. We'll remind you via email before your trial ends.
            </p>
          </div>
          <div className="text-center mb-4">
            <p className="text-sm text-gray-700 mb-2">
              Selected Plan: <span className="font-semibold">{selectedPlan}</span>
            </p>
            <button
              onClick={() => wrapper(null, null)}
              className="text-sm text-blue-600 underline hover:text-blue-800"
            >
              ← Change plan
            </button>
          </div>
          <div id="checkout">
            <StripeCheckoutBox planName={selectedPlan} yearly={selectedYearly} />
          </div>
          
          {/* Security Note */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Payments are processed securely via Stripe. Your data is encrypted and protected.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
