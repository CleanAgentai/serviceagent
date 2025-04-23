import React from "react";
import { Star, Quote } from "lucide-react";

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
    quote:
      "Before ServiceAgent, we were spending 10+ hours a week trying to hire. Now, the AI handles the whole process—we just review the top candidates and hire. Total game changer.",
    author: "Jason McBride",
    role: "Owner",
    company: "ProClean Solutions",
    metrics: [
      { label: "Qualified Candidates", value: "4x more per week" },
      { label: "Time Spent Hiring", value: "↓ 90%" },
      { label: "Avg Time to Hire", value: "Under 2 days" },
    ],
  },
  {
    quote:
      "I used to go through 50+ applications just to find one solid tech. The Hiring Agent filters out all the noise and delivers exactly who I want to talk to.",
    author: "Tina Alvarez",
    role: "Office Manager",
    company: "Reliable HVAC",
    metrics: [
      { label: "Qualified Techs Found", value: "10x faster" },
      { label: "Applicant Volume", value: "+50% increase" },
      { label: "Manual Reviews", value: "↓ Eliminated" },
    ],
  },
  {
    quote:
      "We’ve hired 3 amazing team members in the last month without lifting a finger. No more manual job posts or ghosting candidates. This is how hiring should work.",
    author: "Eric Wallace",
    role: "Operations Lead",
    company: "Apex Plumbing Pros",
    metrics: [
      { label: "Hires per Month", value: "3 New Techs" },
      { label: "Job Post to Hire", value: "1.5 Days Avg" },
      { label: "No-shows & Ghosting", value: "↓ 100%" },
    ],
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Growing{" "}
            <span className="bg-gradient-to-r from-[#4FC3DC] to-[#1E529D] bg-clip-text text-transparent">
              Field Service Businesses
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            See how field service companies are scaling faster with
            ServiceAgent's AI
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="h-full flex flex-col justify-between bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Quote Section */}
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-[#3DA6C7]/20" />
                </div>
                <p className="text-gray-600 mb-4 ">"{testimonial.quote}"</p>
                <div className="mt-auto flex items-center pt-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#7DD8F0] to-[#1E529D] flex items-center justify-center text-white font-bold text-lg mr-4">
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
              <div className="bg-gradient-to-r from-blue-50 to-teal-50/30 px-8 py-6 min-h-[120px] flex items-center">
                <div className="grid grid-cols-3 gap-4 w-full">
                  {testimonial.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="font-bold text-[#2F6DA8]">
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
            Trusted by 500+ field service businesses across North America
          </p>
        </div>
      </div>
    </section>
  );
}
