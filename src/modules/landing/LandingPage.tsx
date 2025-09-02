import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import FAQ from "./components/FAQ";
import { openCalendly } from "@/app/shared/utils/calendly";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Demo from "./components/Demo";
import Services from "./components/Services";
import CTA from "./components/CTA";
import IndustryExpertise from "./components/IndustryExpertise";
import Testimonials from "./components/Testimonials";


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
      <HowItWorks />
      <Features />
      <IndustryExpertise />
      <Demo />
      <Services />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
