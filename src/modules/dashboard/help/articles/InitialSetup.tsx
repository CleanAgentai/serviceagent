import React from 'react';
import { ArrowLeft, Clock, Settings, Shield, Building2, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InitialSetup() {
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
            Initial Setup Guide
          </h1>
          <div className="flex items-center text-gray-600 mb-6">
            <Clock className="h-5 w-5 mr-2" />
            <span>10 min read</span>
          </div>
          <p className="text-lg text-gray-600">
            A comprehensive guide to configuring your CleanAgent.AI account for optimal performance. Learn how to set up your business profile, security settings, and notification preferences.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-12">
          {/* Business Profile */}
          <section>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Business Profile Setup</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• Business name and legal structure</li>
                  <li>• Service area and coverage</li>
                  <li>• Business hours and availability</li>
                  <li>• Contact information and support channels</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Service Configuration</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• Define cleaning service types</li>
                  <li>• Set pricing structures</li>
                  <li>• Configure booking preferences</li>
                  <li>• Add service descriptions and requirements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Security Settings */}
          <section>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Security Configuration</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• Enable two-factor authentication</li>
                  <li>• Set up password requirements</li>
                  <li>• Configure session management</li>
                  <li>• Review security logs</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Data Protection</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• Data backup preferences</li>
                  <li>• Privacy settings configuration</li>
                  <li>• Third-party access management</li>
                  <li>• Compliance settings</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Additional Resources */}
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Resources</h2>
            <p className="text-gray-600 mb-4">
              Explore these resources to further optimize your CleanAgent.AI setup:
            </p>
            <div className="space-y-3">
              <Link
                to="/help/articles/quickstart"
                className="block text-blue-600 hover:text-blue-700"
              >
                → Quick Start Guide
              </Link>
              <Link
                to="/help/articles/dashboard"
                className="block text-blue-600 hover:text-blue-700"
              >
                → Dashboard Overview
              </Link>
              <Link
                to="/help/articles/best-practices"
                className="block text-blue-600 hover:text-blue-700"
              >
                → Setup Best Practices
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 