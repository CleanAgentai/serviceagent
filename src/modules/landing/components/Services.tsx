import { useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
      cta: "Start Free Trial",
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
      cta: "Start Free Trial",
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

    <section id="pricing" className="relative py-24 bg-gradient-to-br from-[#0B1C2D]/3 via-white to-[#A1E3FF]/8 overflow-hidden">
      {/* ...background elements... */}
      <div className="absolute inset-0">
        {/* ...existing code... */}
      </div>
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple Pricing That Pays for Itself</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Start with a 7-day free trial. No setup fees. Cancel anytime.</p>
        </div>
        <div className="flex justify-center mb-16">
          <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200">
            <button onClick={() => setIsYearly(false)} className={`px-3 sm:px-6 py-4 max-sm:py-2 rounded-full font-medium transition-all duration-300 ${!isYearly ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Monthly</button>
            <button onClick={() => setIsYearly(true)} className={`px-3 sm:px-6 py-4 max-sm:py-2 rounded-full font-medium transition-all duration-300 ${isYearly ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Yearly (Save 20%)</button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-xs:gap-20 max-w-7xl mx-auto items-stretch">
          {plans.map((plan, index) => {
             const prevIsPopular = index > 0 && plans[index - 1].popular;
             return (
            <div key={index} className={`relative h-full group ${plan.popular ? 'mt-12 md:mt-0' : prevIsPopular ? 'mt-14 md:mt-0': 'mt-4 md:mt-0'} sm:hover:-translate-y-2 transition-all duration-300`}>
            {plan.popular && (
              <div className="absolute -top-2 md:-top-8 lg:-top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-2.5 px-6 rounded-full font-semibold text-sm text-center shadow-lg z-10">
                Most Popular
              </div>
            )}
            <Card
              className={`border-0 shadow-lg sm:hover:shadow-xl transition-all duration-300 sm:hover:-translate-y-2 ${
                plan.popular
                ? 'bg-gradient-to-br from-[#A1E3FF]/10 to-white ring-2 ring-[#0E7CFF]/30 mb-8 pt-12 md:pt-4 lg:pt-0'
                : 'bg-white/80 backdrop-blur-sm'
            } flex flex-col h-full`}>
              <CardContent className="p-8 flex flex-col flex-grow sm:gap-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{plan.title}</h3>
                  <div className="mb-4">
                        {plan.price === "Custom Pricing" ? (
                          <span className="text-4xl font-extrabold text-slate-900">
                            {plan.price}
                          </span>
                        ) : (
                          <>
                            <span className="text-5xl font-extrabold text-slate-900">
                              {plan.price}
                            </span>
                            <span className="sm:hidden md:block lg:hidden"><br /></span>
                            <span className="text-lg text-slate-600 ml-1">
                              /month
                            </span>
                            {isYearly && (
                              <>
                                <br />
                                <span className="text-sm text-slate-500">
                                  (billed yearly)
                                </span>
                              </>
                            )}
                          </>
                        )}
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
            </div>
          )})}
        </div>
        
        {/* Free Trial Reassurance */}
        <div className="text-center mt-28 md:mt-16 max-w-4xl mx-auto">
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