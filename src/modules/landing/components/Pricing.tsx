import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Video, X } from 'lucide-react';
import { openCalendly } from '@/app/shared/utils/calendly';

const features = [
  {
    category: "AI Hiring Agent",
    items: [
      "Multi-platform job posting",
      "AI video interviews",
      "Automated background checks",
      "Digital onboarding",
      "Performance tracking"
    ]
  },
  {
    category: "AI Sales Agent",
    items: [
      "24/7 lead response",
      "Smart lead qualification",
      "Automated follow-ups",
      "Appointment scheduling",
      "Sales pipeline automation"
    ]
  },
  {
    category: "AI Marketing Agent",
    items: [
      "Multi-channel campaigns",
      "AI content creation",
      "Social media management",
      "Performance analytics",
      "Automated optimization"
    ]
  },
  {
    category: "AI Operations Agent",
    items: [
      "Smart scheduling",
      "Route optimization",
      "Quality monitoring",
      "Customer feedback",
      "Team management"
    ]
  }
];

const highlights = [
  "No credit card required",
  "7-day free trial",
  "Cancel anytime",
  "All features included",
  "Unlimited users"
];

export default function Pricing() {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 && // User's mouse is at the top of the viewport
        !hasShownPopup && // Popup hasn't been shown yet
        !sessionStorage.getItem('exitPopupShown') // Not shown in this session
      ) {
        setShowExitPopup(true);
        setHasShownPopup(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShownPopup]);

  return (
    <>
      <section id="pricing" className="py-24 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-teal-100/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent{' '}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Everything you need to automate your cleaning business with AI
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Try for Free – 7 Days
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Pricing Card */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Card Header */}
              <div className="px-6 py-12 bg-gradient-to-r from-blue-600 to-teal-500 text-center">
                <h3 className="text-3xl font-bold text-white mb-4">
                  All-In-One AI Solution
                </h3>
                <div className="flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">$299</span>
                  <span className="text-xl text-white/90 ml-2">/month</span>
                </div>
                <p className="text-white/90 mt-2">
                  after 7-day free trial
                </p>
              </div>

              {/* Trial Highlights */}
              <div className="px-6 py-8 bg-gradient-to-r from-blue-50 to-teal-50/30">
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                  {highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Grid */}
              <div className="px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {features.map((category) => (
                    <div key={category.category}>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        {category.category}
                      </h4>
                      <ul className="space-y-3">
                        {category.items.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 py-8 bg-gray-50 text-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Try for Free – 7 Days
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <p className="mt-4 text-sm text-gray-500">
                  No credit card required • Cancel anytime
                </p>
              </div>
            </div>

            {/* Enterprise Section */}
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Need a custom solution?
              </h3>
              <p className="text-gray-600 mb-6">
                Contact us for enterprise pricing and custom features
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Demo Section */}
          <div className="max-w-3xl mx-auto mt-24 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 sm:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Not sure if this is right for you?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Schedule a personalized demo with our team to see how CleanAgent.AI can help your business grow.
              </p>
              <button
                onClick={openCalendly}
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book a Demo
                <Video className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Exit Intent Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative bg-white rounded-2xl p-8 max-w-lg mx-4 animate-fade-in-up">
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to transform your cleaning business with AI?
              </h3>
              <p className="text-gray-600">
                Join hundreds of cleaning companies saving 20+ hours per week with CleanAgent. Start your free trial today or book a demo to learn more.
              </p>
            </div>

            <div className="space-y-4">
              <Link
                to="/signup"
                className="flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 transition-all duration-300"
                onClick={() => setShowExitPopup(false)}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <button
                onClick={(e) => {
                  setShowExitPopup(false);
                  openCalendly(e);
                }}
                className="flex items-center justify-center w-full px-6 py-3 border-2 border-blue-600 text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition-all duration-300"
              >
                Book a Demo
                <Video className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 