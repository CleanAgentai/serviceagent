import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

const testimonials: Testimonial[] = [
  {
    quote: "CleanAgent's AI completely transformed our hiring process. What used to take weeks now happens in hours. The AI conducts video interviews 24/7 and only sends us the best candidates. We've grown from 10 to 50 cleaners in just 3 months.",
    author: "Sarah Martinez",
    role: "Founder & CEO",
    company: "Pristine Cleaning Services",
    metrics: [
      { label: "Time to Hire", value: "95% Faster" },
      { label: "Team Growth", value: "5x in 3 months" },
      { label: "Cost Savings", value: "$15k/month" }
    ]
  },
  {
    quote: "The AI sales agent is incredible. It responds to leads instantly, day or night, and books appointments automatically. Our conversion rate has doubled, and we're saving 25 hours a week on follow-ups. It's like having a full-time sales team for a fraction of the cost.",
    author: "Michael Chen",
    role: "Operations Director",
    company: "Elite Clean Co",
    metrics: [
      { label: "Lead Response", value: "100% 24/7" },
      { label: "Conversion Rate", value: "+110% increase" },
      { label: "Time Saved", value: "25h/week" }
    ]
  },
  {
    quote: "The marketing AI has revolutionized our online presence. It creates and manages campaigns across all channels, optimizes our ad spend, and generates engaging content. Our customer acquisition cost has dropped by 65% while lead volume tripled.",
    author: "Emily Thompson",
    role: "Marketing Manager",
    company: "Sparkle Cleaning",
    metrics: [
      { label: "Lead Volume", value: "3x increase" },
      { label: "Cost per Lead", value: "65% lower" },
      { label: "ROI", value: "285% higher" }
    ]
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Growing{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Cleaning Businesses
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            See how cleaning companies are scaling faster with CleanAgent's AI
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              {/* Quote Section */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-blue-600/20" />
                </div>
                <p className="text-gray-600 mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metrics Section */}
              <div className="bg-gradient-to-r from-blue-50 to-teal-50/30 px-8 py-6">
                <div className="grid grid-cols-3 gap-4">
                  {testimonial.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="font-bold text-blue-600">
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Trusted by 500+ cleaning businesses across North America
          </p>
        </div>
      </div>
    </section>
  );
} 