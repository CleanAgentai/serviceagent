import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, DollarSign, Zap, Sparkles, Check } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Instant Hiring',
    description: 'AI posts jobs, screens candidates, and hires top cleaners—fast'
  },
  {
    icon: DollarSign,
    title: 'More Bookings, Less Chasing',
    description: 'AI follows up, books jobs, and fills your schedule 24/7'
  },
  {
    icon: Zap,
    title: 'Zero Admin Work',
    description: 'AI handles scheduling, reminders, and client updates on autopilot'
  }
];

export default function Hero() {
  return (
    <section id="hero" className="relative py-32 overflow-hidden bg-white scroll-mt-16">
      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-extrabold text-gray-900 mb-8 animate-fade-in">
        <span className="block font-bold mb-4">
          Automate Your Cleaning Business
        </span>
        <span className="relative">
          <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            & Scale Faster
          </span>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-blue-600/20 to-teal-500/20 rounded-full blur-sm" />
        </span>
      </h1>
      
      {/* Subheading */}
      <p className="mt-8 max-w-2xl mx-auto text-xl text-gray-600 animate-fade-in-up delay-200">
        AI-powered hiring, sales, and operations—so you can cut costs, book more jobs, and save 20+ hours a week.
      </p>
    </section>
  );
} 