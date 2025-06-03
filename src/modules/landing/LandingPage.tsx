import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import Timeline from "./components/Timeline";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Pricing from "./components/Pricing";
import { openCalendly } from "@/app/shared/utils/calendly";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Statistics from "./components/Statistics";
import Demo from "./components/Demo";
import Services from "./components/Services";
import CTA from "./components/CTA";

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
    description: "Your AI recruiter works when you're asleep.",
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

const LandingPage = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen">
      <Navigation isNavVisible={isNavVisible} />
      <Hero />
      <Features />
      <Statistics />
      <Demo />
      <Testimonials />
      <Services />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
