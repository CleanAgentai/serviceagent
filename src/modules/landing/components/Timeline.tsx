import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Posts Jobs for You",
    subtitle: "Job Listings Go Live Automatically",
    description:
      "The Hiring Agent instantly posts your open role to major platforms like Indeed, Facebook, and LinkedIn—with optimized descriptions for your industry and location.",
    features: [
      "Multi-platform distribution",
      "Industry-specific job templates",
      "SEO-optimized listings",
    ],
  },
  {
    title: "Screens Every Applicant 24/7",
    subtitle: "Candidates Are Screened Instantly",
    description:
      "Applicants are interviewed via AI chat or video in real time. Their answers are scored, red flags are detected, and top candidates are ranked for you.",

    features: [
      "Chat + video interviewing",
      "AI-powered scoring and filtering",
      "Availability and experience checks",
    ],
  },
  {
    title: "You Hire from a Curated Shortlist",
    subtitle: " You Hire the Top 5% — Fast",
    description:
      "You receive a ranked shortlist with automated offer letters, onboarding documents, and rejection emails already sent out to the rest.",
    features: [
      "Ranked candidate shortlist",
      "Offer/rejection email automation",
      "Digital onboarding workflow",
    ],
  },
];

export default function Timeline() {
  return (
    <section
      id="hiring-agent-how-it-works"
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How the ServiceAgent Hiring Agent{" "}
            <span className="bg-gradient-to-r from-[#3DA6C7] to-[#1E529D] bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Three simple steps to automate hiring for your field service
            business — no recruiters, no spreadsheets, no headaches.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#7DD8F0] to-[#1E529D]" />

              <div className="p-8 sm:p-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-gradient-to-r from-[#7DD8F0] to-[#1E529D] rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-lg font-medium text-[#66C2E9] mb-4">
                      {step.subtitle}
                    </p>
                    <p className="text-gray-600 mb-6">{step.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {step.features.map((feature) => (
                        <div key={feature} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#5BAFD1] to-[#1E529D] mr-2" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div id="hiring-agent-cta-button" className="text-center mt-16">
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#3DA6C7] to-[#1E529D] hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Try for Free – 7 Days
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            {/* Only $299/month after trial • Cancel anytime */}
          </p>
        </div>
      </div>
    </section>
  );
}
