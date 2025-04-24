import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    title: "AI Posts Your Job Automatically",
    subtitle: "Hands-Free Distribution to Top Platforms",
    description:
      "Your AI Hiring Agent writes and publishes optimized job listings for your industry—across Indeed, Facebook, and LinkedIn.",
    features: [
      "Industry-specific job templates",
      "Optimized for high visibility",
      "Auto-published across job boards",
    ],
  },
  {
    title: "Screens Every Applicant, 24/7",
    subtitle: "Instant AI Interviews. No Manual Screening.",
    description:
      "Every applicant is interviewed instantly by AI—via chat or video. Responses are scored in real time for communication, experience, and red flags. Only the top candidates make it to you.",

    features: [
      "Chat & video interviews",
      "Real-time scoring + filtering",
      "Red flag detection",
    ],
  },
  {
    title: "You Hire from a Curated Shortlist",
    subtitle: "Top 5% of Candidates. Ready to Onboard.",
    description:
      "You get a ranked shortlist of qualified applicants. The AI also auto-sends rejections, offer letters, and onboarding docs—so you hire faster, with zero admin.",
    features: [
      "Ranked shortlist of top performers",
      "Offer + rejection email automation",
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
            <span className="font-semibold">
              3 Simple Steps to Automate Hiring for Service Teams
            </span>
            <br />
            No recruiters. No spreadsheets. No wasted interviews.
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
