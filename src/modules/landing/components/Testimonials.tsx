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
      "Before ServiceAgent, we spent 15+ hours/week just trying to hire. Now the AI handles everything—we just review and hire. Total game changer.",
    author: "Jason McBride",
    role: "Owner",
    company: "ProClean Solutions",
    metrics: [
      { label: "more qualified candidates/week", value: "4x" },
      { label: "time Spent Hiring", value: "↓ 90%" },
      { label: "average tiem-to-hire", value: "< 2 days" },
    ],
  },
  {
    quote:
      "I used to dig through 50+ applications to find one tech. Now, the AI filters the noise and delivers exactly who I want to talk to.",
    author: "Tina Alvarez",
    role: "Office Manager",
    company: "Reliable HVAC",
    metrics: [
      { label: "faster at finding qualified techs", value: "10x" },
      { label: "increase in applicant volume", value: "+50%" },
      { label: "manual reviews needed", value: "0" },
    ],
  },
  {
    quote:
      "We’ve hired 3 amazing team members this month—no job posting, no ghosting. Just results. This is how hiring should work.",
    author: "Eric Wallace",
    role: "Operations Lead",
    company: "Apex Plumbing Pros",
    metrics: [
      { label: "per month", value: "3 hires" },
      { label: "avg. post-to-hire", value: "1.5 days" },
      { label: "no-shows & ghosting", value: "↓ 100%" },
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
              Service Teams Nationwide
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            See how companies are hiring faster, smarter, and without the
            hassle—powered by ServiceAgent.
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
            Trusted by service businesses across North America
          </p>
        </div>
      </div>
    </section>
  );
}
