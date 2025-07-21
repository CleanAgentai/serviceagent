import { useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Services = () => {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      title: "Launch",
      price: isYearly ? "$119" : "$149",
      originalPrice: isYearly ? "$149" : null,
      period: isYearly ? "/month (billed yearly)" : "/month",
      description: "For small businesses getting started",
      features: [
        "Up to 20 AI interviews/month",
        "Up to 4 job posts/week",
        "Interview transcripts & reporting",
        "AI candidate ranking system",
        "Email support"
      ],
      popular: false,
      cta: "Start Free Trial",
      ctaLink: "/signup"
    },
    {
      title: "Scale",
      price: isYearly ? "$479" : "$599",
      originalPrice: isYearly ? "$599" : null,
      period: isYearly ? "/month (billed yearly)" : "/month",
      description: "For growing companies with higher volume hiring",
      features: [
        "Up to 100 AI interviews/month",
        "Up to 20 job posts/week",
        "Custom branding on candidate interface",
        "10+ language support for interviews",
        "Analytics dashboard",
        "Priority support"
      ],
      popular: true,
      cta: "Start Free Trial",
      ctaLink: "/signup"
    },
    {
      title: "Enterprise",
      price: "Custom",
      originalPrice: null,
      period: "",
      description: "Tailored solutions for large organizations",
      features: [
        "Unlimited AI interviews & job posts",
        "Dedicated account manager",
        "White-glove onboarding",
        "White-label solution",
        "Custom integrations",
        "24/7 phone support"
      ],
      popular: false,
      cta: "Contact Sales",
      ctaLink: "https://calendly.com/serviceagent/30min"
    }
  ];

  return (
    <section id="pricing" className="relative py-24 bg-gradient-to-br from-[#0B1C2D]/3 via-white to-[#A1E3FF]/8 overflow-hidden">
      {/* ...background elements... */}
      <div className="absolute inset-0">
        {/* ...existing code... */}
      </div>
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple Pricing, Powerful Results</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Flexible plans for any size business. Start with a 7-day free trial of any plan – no upfront commitment.</p>
        </div>
        <div className="flex justify-center mb-16">
          <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-[#0E7CFF]/20">
            <button onClick={() => setIsYearly(false)} className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${!isYearly ? 'bg-[#0E7CFF] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Monthly</button>
            <button onClick={() => setIsYearly(true)} className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${isYearly ? 'bg-[#0E7CFF] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Yearly (Save 20%)</button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${plan.popular ? 'bg-gradient-to-br from-[#A1E3FF]/10 to-white ring-2 ring-[#0E7CFF]/30' : 'bg-white/80 backdrop-blur-sm'} flex flex-col h-full`}>
              <CardContent className="p-8 flex flex-col flex-grow">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-2 px-6 rounded-full font-semibold text-sm">Most Popular</div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{plan.title}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-extrabold text-slate-900">{plan.price}</span>
                    {plan.price !== "Custom" && (<span className="text-lg text-slate-600 ml-1">{plan.period}</span>)}
                  </div>
                  <p className="text-slate-600 leading-relaxed">{plan.description}</p>
                </div>
                <ul className="mb-8 space-y-4 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-slate-600"><CheckCircle className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5" /><span>{feature}</span></li>
                  ))}
                </ul>
                <div className="mt-auto">
                  {plan.cta === "Start Free Trial" ? (
                  <Link to={plan.ctaLink} className="w-full block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full">{plan.cta}</Button>
                  </Link>
                ) : (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full" onClick={() => window.open(plan.ctaLink, '_blank')}>{plan.cta}</Button>
                )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Free Trial Reassurance */}
        <div className="text-center mt-12 max-w-3xl mx-auto">
          <p className="text-sm text-slate-500">
            All plans include full access to features during the free trial. No credit card is charged until the trial ends.<br />
            Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services; 