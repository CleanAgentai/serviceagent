import React from 'react';
import { Link } from 'react-router-dom';
import { Video, CheckCircle, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import MobileNav from '../components/navigation/MobileNav';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Mobile Navigation */}
      <div className="block md:hidden">
        <MobileNav />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-xl font-semibold text-gray-900">ServiceAgent</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/signin" 
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Sign In
            </Link>
            <Link 
              to="/demo"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-20 md:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Pricing Tag */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-50 rounded-full">
              <span className="text-blue-600 font-medium text-sm md:text-base">
                Only $299/month After Trial
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-6 md:mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              <span className="block md:inline">24/7 AI Agents to</span>{' '}
              <span className="block md:inline">Run Your</span>{' '}
              <span className="block mt-2 md:mt-0 md:inline bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                Cleaning Business
              </span>{' '}
              <span className="block md:inline text-teal-500">Smarter</span>
            </h1>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4 md:px-0">
              Our AI handles hiring, marketing, sales, and operations—reducing costs by 90%
              and saving you 20+ hours per week.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center space-y-3 md:space-y-0 md:space-x-4 mb-8">
            <Link
              to="/demo"
              className="flex items-center justify-center px-5 py-2.5 md:px-6 md:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full text-base md:text-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Video className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Book a Demo Call
            </Link>
            <Link
              to="/signup"
              className="flex items-center justify-center px-5 py-2.5 md:px-6 md:py-4 bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-200 rounded-full text-base md:text-lg font-medium transition-colors duration-200"
            >
              Try Free for 7 Days
            </Link>
          </div>

          {/* Features */}
          <div className="flex flex-col items-center space-y-3 text-gray-600">
            <div className="flex items-center text-sm md:text-base">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center text-sm md:text-base">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0" />
              <span>7-day free trial</span>
            </div>
            <div className="flex items-center text-sm md:text-base">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Company */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/serviceagent-logo.svg" alt="ServiceAgent" className="w-6 h-6" />
                <span className="text-lg font-semibold text-gray-900">ServiceAgent</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                AI-powered solutions for modern service businesses.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link to="/features" className="text-sm text-gray-600 hover:text-gray-900">Features</Link></li>
                <li><Link to="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link></li>
                <li><Link to="/demo" className="text-sm text-gray-600 hover:text-gray-900">Book Demo</Link></li>
                <li><Link to="/signup" className="text-sm text-gray-600 hover:text-gray-900">Sign Up</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link></li>
                <li><Link to="/blog" className="text-sm text-gray-600 hover:text-gray-900">Blog</Link></li>
                <li><Link to="/careers" className="text-sm text-gray-600 hover:text-gray-900">Careers</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
                <li><Link to="/security" className="text-sm text-gray-600 hover:text-gray-900">Security</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-center text-gray-600">
              © {new Date().getFullYear()} ServiceAgent. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 