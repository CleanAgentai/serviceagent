import React from 'react';
import { ArrowLeft, CheckCircle2, Clock, Coffee, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuickStartGuide() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Navigation */}
        <Link
          to="/dashboard/help"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Help Center
        </Link>

        {/* Article Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Quick Start Guide
          </h1>
          <div className="flex items-center text-gray-600 mb-6">
            <Clock className="h-5 w-5 mr-2" />
            <span>5 min read</span>
          </div>
          <p className="text-lg text-gray-600">
            Get up and running with CleanAgent.AI in minutes. This guide will walk you through the essential steps to start automating your cleaning business.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          {/* Step 1: Account Setup */}
          <section>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">1. Account Setup</h2>
            </div>
            <div className="pl-11">
              <p className="text-gray-600 mb-4">
                Start by setting up your CleanAgent.AI account with these simple steps:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Complete your business profile with company details
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Add team members and set their roles
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Configure your notification preferences
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Step 2: AI Configuration */}
          <section>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                <Zap className="h-5 w-5 text-teal-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">2. AI Configuration</h2>
            </div>
            <div className="pl-11">
              <p className="text-gray-600 mb-4">
                Set up your AI agents to automate key business processes:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Configure the AI Hiring Assistant with your job requirements
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Set up the AI Sales Agent with your pricing and services
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Customize the AI Marketing tools for your target audience
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Step 3: First Tasks */}
          <section>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Coffee className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">3. Your First Tasks</h2>
            </div>
            <div className="pl-11">
              <p className="text-gray-600 mb-4">
                Start using CleanAgent.AI with these initial tasks:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Post your first job listing using the AI Hiring Assistant
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Set up automated responses for customer inquiries
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Create your first marketing campaign
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Next Steps */}
          <section className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h2>
            <p className="text-gray-600 mb-4">
              Now that you've completed the basic setup, explore these resources to make the most of CleanAgent.AI:
            </p>
            <div className="space-y-3">
              <Link
                to="/help/articles/setup"
                className="block text-blue-600 hover:text-blue-700"
              >
                → Detailed Setup Guide
              </Link>
              <Link
                to="/help/articles/dashboard"
                className="block text-blue-600 hover:text-blue-700"
              >
                → Dashboard Overview
              </Link>
              <Link
                to="/help/articles/hiring"
                className="block text-blue-600 hover:text-blue-700"
              >
                → AI Hiring Guide
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 