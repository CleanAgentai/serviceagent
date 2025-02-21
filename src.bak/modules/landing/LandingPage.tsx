import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import Timeline from '../components/Timeline';
import Testimonials from '../components/Testimonials';
import FAQComponent from '../components/FAQ';
import Footer from '../components/Footer';
import Pricing from '../components/Pricing';
import ComparisonTable from '../components/ComparisonTable';
import ReviewCarousel from '../components/ReviewCarousel';
import CleaningManagementSolution from '../components/CleaningManagementSolution';

// Stats
const stats = [
  {
    value: '95%',
    label: 'Faster Hiring',
    description: 'Reduce hiring time with AI',
    icon: Icons.Clock,
  },
  {
    value: '20h+',
    label: 'Weekly Time Saved',
    description: 'With automated scheduling',
    icon: Icons.Calendar,
  },
  {
    value: '40%',
    label: 'Higher Conversion',
    description: 'With AI-powered follow-ups',
    icon: Icons.TrendingUp,
  },
  {
    value: '30%',
    label: 'Better Retention',
    description: 'After implementing AI',
    icon: Icons.PiggyBank,
  },
];

// Hero section features
const heroFeatures = [
  {
    icon: Icons.Users,
    title: 'Instant Hiring',
    description: 'AI posts jobs, screens candidates, and hires top cleaners—fast'
  },
  {
    icon: Icons.Calendar,
    title: 'More Bookings, Less Chasing',
    description: 'AI follows up, books jobs, and fills your schedule 24/7'
  },
  {
    icon: Icons.ClipboardCheck,
    title: 'Zero Admin Work',
    description: 'AI handles scheduling, reminders, and client updates on autopilot'
  }
];

// Main features
const mainFeatures = [
  {
    title: 'AI-Powered Hiring',
    description: 'Automates job postings, interviews, and onboarding. Posts to multiple job boards, conducts AI video interviews, and handles paperwork.',
    icon: Icons.Users,
    gradient: 'from-blue-600 to-teal-500',
    features: [
      'Multi-platform job posting',
      'AI video interviews',
      'Automated background checks',
      'Digital onboarding'
    ]
  },
  {
    title: 'AI-Driven Sales',
    description: 'Captures, qualifies, and follows up with leads 24/7. Provides instant response, books appointments, and nurtures prospects to close.',
    icon: Icons.Target,
    gradient: 'from-blue-600 to-teal-500',
    features: [
      'Instant lead response',
      'Smart lead qualification',
      'Automated follow-ups',
      'Meeting scheduling'
    ]
  },
  {
    title: 'AI Marketing',
    description: 'Creates and manages multi-channel marketing campaigns. Generates content, optimizes ads, and tracks performance.',
    icon: Icons.Megaphone,
    gradient: 'from-blue-600 to-teal-500',
    features: [
      'Multi-channel campaigns',
      'AI content creation',
      'Automated scheduling',
      'Performance analytics'
    ]
  },
  {
    title: 'AI Operations',
    description: 'Manages scheduling, dispatch, and quality control. Optimizes routes, tracks performance, and ensures customer satisfaction.',
    icon: Icons.Calendar,
    gradient: 'from-blue-600 to-teal-500',
    features: [
      'Smart scheduling',
      'Route optimization',
      'Quality monitoring',
      'Customer feedback'
    ]
  }
];

const highlights = [
  'No credit card required',
  '7-day free trial',
  'Cancel anytime'
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white py-4 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xl font-bold tracking-wider">
                <span className="text-black">CLEAN</span>
                <span className="text-black">AGENT</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">
                How It Works
              </a>
              <a href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign in
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300"
              >
                Book a Demo
                <Icons.Video className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 transition-all duration-300"
              >
                Try Free
                <Icons.ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white pt-16">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] bg-gradient-to-b from-blue-50 via-teal-50/30 to-transparent rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] bg-gradient-to-t from-blue-50 via-teal-50/30 to-transparent rounded-full opacity-30 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Announcement Banner */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-teal-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-1 rounded-full">
                <Icons.Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Only $299/month After Trial
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-extrabold text-gray-900 mb-8">
              <span className="block font-bold mb-4">
                24/7 AI Agents to Run Your
              </span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent whitespace-nowrap">
                  Cleaning Business Smarter
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-8 max-w-2xl mx-auto text-xl text-gray-600">
              Our AI handles hiring, marketing, sales, and operations—reducing costs by 90% and saving you 20+ hours per week. Communicate with AI agents just like texting an employee.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book a Demo Call
                <Icons.Video className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition-all duration-300"
              >
                Try Free for 7 Days
                <Icons.ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Trial Features */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-center text-gray-500">
                  <Icons.Check className="h-4 w-4 text-blue-600 mr-2" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Feature Cards */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {heroFeatures.map((feature) => (
                <div 
                  key={feature.title}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-6">
                    <div className="mb-4 bg-gradient-to-r from-blue-600/10 to-teal-500/10 p-3 rounded-lg w-14 h-14 mx-auto flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.value} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4 bg-gradient-to-r from-blue-600/10 to-teal-500/10 p-3 rounded-lg w-14 h-14 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="relative py-28 overflow-hidden bg-gray-50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-teal-100/50 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Complete{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  AI-Powered Solution
                </span>
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Our AI agents handle every aspect of your cleaning business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {mainFeatures.map((feature) => (
              <div 
                key={feature.title} 
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative p-8">
                  <div className="flex items-center gap-6 mb-6">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} p-3`}>
                      <feature.icon className="h-full w-full text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mt-2">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {feature.features.map((item) => (
                      <div key={item} className="flex items-center">
                        <Icons.Check className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-gray-600">{item}</span>
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

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Pricing Section */}
      <Pricing />

      {/* FAQ Section */}
      <FAQComponent />

      {/* Add the CleaningManagementSolution section */}
      <CleaningManagementSolution />
      
      {/* Add the ReviewCarousel section */}
      <ReviewCarousel />

      {/* Final CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to transform your cleaning business with AI?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of cleaning companies saving 20+ hours per week with CleanAgent.
            Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Try Free for 7 Days
              <Icons.ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition-all duration-300"
            >
              Book a Demo Call
              <Icons.Video className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/80">
            Only $299/month after trial • Cancel anytime
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}