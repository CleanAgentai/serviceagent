import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import Timeline from "./components/Timeline";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Pricing from "./components/Pricing";
import { openCalendly } from "@/app/shared/utils/calendly";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";

// Stats
const stats = [
  {
    value: "92%",
    label: "Faster Time-to-Hire",
    description: "AI screens instantly—no more delays or bottlenecks.",
    icon: Icons.Clock,
  },
  {
    value: "85%",
    label: "Less Time Spent on Hiring",
    description: "Job posts, screening, and scheduling? Handled.",
    icon: Icons.Calendar,
  },
  {
    value: "5x",
    label: "Better Candidate Quality",
    description: "Only interview the top 5%—no more guessing.",
    icon: Icons.TrendingUp,
  },
  {
    value: "24/7",
    label: "Hiring Power",
    description: "Your AI recruiter works when you’re asleep.",
    icon: Icons.Zap,
  },
];

// Hero section features
const heroFeatures = [
  {
    icon: Icons.Megaphone,
    title: "Hands-Free Job Posting",
    description:
      "Instantly posts jobs to Indeed, Facebook, and LinkedIn with optimized descriptions for your specific roles. No setup, no hassle.",
  },
  {
    icon: Icons.Bot,
    title: "24/7 AI Screening",
    description:
      "Every applicant is interviewed on the spot by AI—via chat or video.",
  },
  {
    icon: Icons.ListChecks,
    title: "Instant Shortlists, No Admin",
    description:
      "Only talk to qualified candidates. The AI scores and ranks applicants automatically—zero time wasted on unqualified people.",
  },
];

// Main features
const mainFeatures = [
  {
    title: "Job Posts Done for You",
    description:
      "We write and publish your job listings to Indeed, Facebook, and LinkedIn—optimized to convert, no manual setup required.",
    icon: Icons.Users,
    gradient: "from-[#7DD8F0] to-[#1E529D]",
    features: [
      "Auto-written, role-specific job descriptions",
      "Multi-platform distribution",
      "Tuned for conversion from day one",
    ],
  },

  // from-[#7DD8F0] to-[#1E529D]
  // from-[#7DD8F0] to-[#5A4FCF]
  //from-[#A4DEF2] to-[#2E6FB8]
  {
    title: "24/7 Instant Interviews",
    description:
      "Every applicant gets auto-interviewed by AI—via chat or video. Scored instantly for reliability, experience, and fit.",
    icon: Icons.Target,
    gradient: "from-[#7DD8F0] to-[#1E529D]",
    features: [
      "AI interviews every candidate in real time",
      "Red flags auto-filtered",
      "Skill-based scoring & instant insights",
    ],
  },
  {
    title: "Top Candidates, Zero Admin",
    description:
      "You get a ranked shortlist of only the best. Offer letters, rejections, and onboarding? We handle it.",
    icon: Icons.Megaphone,
    gradient: "from-[#7DD8F0] to-[#1E529D]",
    features: [
      "Top 5% delivered directly",
      "Rejections and offers sent automatically",
      "Onboarding packets ready-to-go",
    ],
  },
];

const highlights = [
  "AI-Powered Hiring",
  "Built for Field Service Businesses",
  "No Setup Required",
  "Live in 24 Hours",
];

export function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}

      <div className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] bg-gradient-to-b from-blue-50 via-teal-50/30 to-transparent rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] bg-gradient-to-t from-blue-50 via-teal-50/30 to-transparent rounded-full opacity-30 blur-3xl" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
          <div className="text-center">
            {/* Announcement Banner */}
            {/* <div className="inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-600/10 to-teal-500/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8 text-sm sm:text-base">
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-1 rounded-full">
                <Icons.Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="font-medium bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Only $299/month After Trial
              </span>
            </div> */}

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-gray-900 mb-6 sm:mb-8">
              {/* <span className="block font-bold mb-2 sm:mb-4">
                Your AI Recruiter
              </span> */}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#4FC3DC] to-[#1E529D] bg-clip-text text-transparent  block sm:inline">
                  Your AI Recruiter
                </span>
                <br />
                <span className="relative z-10 bg-gradient-to-r from-[#4FC3DC] to-[#1E529D] bg-clip-text text-transparent sm:inline">
                  —Built for Service Companies
                </span>
              </span>
            </h1>

            {/* [#3DA6C7]  [#1E529D]*/}

            {/* Subheading */}
            <p className="mt-4 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-gray-600">
              Stop wasting time interviewing the wrong people. ServiceAgent
              screens every applicant with AI, scores them on reliability and
              experience, and sends you only the best—so you can hire faster and
              get back to running your business.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={openCalendly}
                className="inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 border border-transparent text-base sm:text-lg font-medium rounded-lg text-white bg-gradient-to-r from-[#3DA6C7] to-[#1E529D] hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book a Demo Call
                <Icons.Video className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 border-2 border-[#2F6DA8] text-base sm:text-lg font-medium rounded-lg text-[#2F6DA8] bg-white hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition-all duration-300"
              >
                Start Free for 7 Days
                <Icons.ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>

            {/* Trial Features */}
            <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-1 sm:gap-y-2 text-sm sm:text-base">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center text-gray-500"
                >
                  <Icons.Check className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 mr-1 sm:mr-2" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
            {/* Feature Cards 섹션 시작 */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
              <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  What the{" "}
                  <span className="bg-gradient-to-r from-[#4FC3DC] to-[#1E529D] bg-clip-text text-transparent">
                    AI Hiring Agent
                  </span>{" "}
                  Does
                </h2>
              </div>

              {/* Feature Cards */}
              <div className="mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto">
                {heroFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1E529D]/5 to-[#1E1E1E]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-4 sm:p-6">
                      <div className="mb-3 sm:mb-4 bg-gradient-to-r from-[#1E529D]/10 to-[#1E1E1E]/10 p-2 sm:p-3 rounded-lg w-12 h-12 sm:w-14 sm:h-14 mx-auto flex items-center justify-center">
                        <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          Why{" "}
          <span className="bg-gradient-to-r from-[#4FC3DC] to-[#1E529D] bg-clip-text text-transparent">
            Service Teams Use It
          </span>
        </h2>
      </div>
      {/* Stats Section */}
      <div id="hiring-agent-metrics" className="bg-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 bg-gradient-to-r from-[#1E529D]/10 to-[#1E1E1E]/10 p-3 rounded-lg w-14 h-14 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Features Section */}
      <div
        id="hiring-agent-features-grid"
        className="relative py-16 sm:py-28 overflow-hidden bg-white"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-teal-100/50 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Meet Your{" "}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-[#4FC3DC] to-[#1E529D] bg-clip-text text-transparent">
                  In-House AI Hiring Agent
                </span>
              </span>
            </h2>
            <p className="text-base sm:text-xl text-gray-600">
              Our AI agents handle every aspect of your field service business
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8 lg:gap-12">
            {mainFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E529D]/5 to-[#1E1E1E]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-5 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4 sm:mb-6">
                    <div
                      className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${feature.gradient} p-2 sm:p-3`}
                    >
                      <feature.icon className="h-full w-full text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6">
                    {feature.features.map((item) => (
                      <div key={item} className="flex items-center">
                        <Icons.Check className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-1.5 sm:mr-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm sm:text-base">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <Timeline />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Section */}
      {/* <Pricing /> */}

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA Section */}
      <div
        id="hiring-agent-final-cta"
        className="bg-gradient-to-r from-[#4FC3DC] to-[#1E529D] py-20"
      >
        {/* from-[#3DA6C7] to-[#1E529D] */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to stop wasting time on hiring?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of service businesses using ServiceAgent to hire top
            talent on autopilot. Try it free—no commitments, no setup required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              id="final-cta-free-trial"
              to="/signup"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-[#2F6DA8] bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Try Free for 7 Days
              <Icons.ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button
              id="final-cta-book-demo"
              onClick={openCalendly}
              className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition-all duration-300"
            >
              Book a Demo Call
              <Icons.Video className="ml-2 h-5 w-5" />
            </button>
          </div>
          <p className="mt-4 text-sm text-white/80">
            {/* Only $299/month after trial • Cancel anytime */}
          </p>
        </div>
      </div>
      {/* Timeline Section */}
    </div>
  );
}
