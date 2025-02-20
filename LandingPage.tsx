import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Building2, Calendar, ClipboardCheck, Users, MessageSquare, Settings, Briefcase } from 'lucide-react';
import Timeline from '../components/Timeline';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

const highlights = ['No credit card required', '7-day free trial', 'Cancel anytime'];

const heroFeatures = [
  {
    title: 'Instant Hiring',
    description: 'AI screens and matches candidates 24/7',
    icon: Users,
  },
  {
    title: 'More Bookings, Less Chasing',
    description: 'Automated follow-ups and scheduling',
    icon: Calendar,
  },
  {
    title: 'Zero Admin Work',
    description: 'AI handles operations and customer service',
    icon: ClipboardCheck,
  },
];

const mainFeatures = [
  {
    title: 'Hiring Agent',
    description: 'Post jobs, screen resumes, and schedule interviews automatically',
    icon: Briefcase,
    gradient: 'from-blue-500 to-teal-500',
  },
  {
    title: 'Sales Agent',
    description: 'Convert leads and schedule appointments 24/7',
    icon: Building2,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Operations Agent',
    description: 'Manage scheduling, dispatching, and quality control',
    icon: Settings,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Support Agent',
    description: 'Handle customer inquiries and feedback instantly',
    icon: MessageSquare,
    gradient: 'from-green-500 to-emerald-500',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                CleanAgent AI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-md hover:shadow-lg transition-all duration-200"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-blue-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-teal-100/30 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8">
              Your AI-Powered
              <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Cleaning Business Assistant
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Automate hiring, sales, and operations. Save 20+ hours per week and reduce costs by 90% with AI that works 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-lg font-medium rounded-lg text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                View Pricing
              </a>
            </div>

            {/* Trial Features */}
            <div className="flex flex-wrap justify-center gap-4">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm"
                >
                  <Check className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-600">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Features */}
          <div className="mt-24 grid gap-8 md:grid-cols-3">
            {heroFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="bg-gradient-to-r from-blue-600/10 to-teal-500/10 rounded-lg p-3 inline-block mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Scale Your Cleaning Business
            </h2>
            <p className="text-xl text-gray-600">
              Our AI agents handle the heavy lifting so you can focus on growth
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-r ${feature.gradient} rounded-lg p-3 inline-block mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <Timeline />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-teal-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Cleaning Business?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join hundreds of cleaning businesses already using CleanAgent AI to scale their operations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 bg-white text-lg font-medium rounded-lg text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white/10 transition-all duration-200"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 