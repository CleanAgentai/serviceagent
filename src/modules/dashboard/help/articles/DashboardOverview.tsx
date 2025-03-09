import React from 'react';
import { ArrowLeft, Clock, LayoutDashboard, BarChart, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardOverview() {
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
            Dashboard Overview
          </h1>
          <div className="flex items-center text-gray-600 mb-6">
            <Clock className="h-5 w-5 mr-2" />
            <span>8 min read</span>
          </div>
          <p className="text-lg text-gray-600">
            Learn how to navigate and make the most of your CleanAgent.AI dashboard. Discover key features, analytics, and tools that will help you manage your cleaning business efficiently.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-12">
          {/* Dashboard Layout */}
          <section>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <LayoutDashboard className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Dashboard Layout</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Navigation</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• Main navigation menu overview</li>
                  <li>• Quick access toolbar</li>
                  <li>• Sidebar customization</li>
                  <li>• Search and filter functions</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Key Sections</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• Overview and summary cards</li>
                  <li>• Activity feed and notifications</li>
                  <li>• Quick actions menu</li>
                  <li>• Recent items and favorites</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Analytics & Reports */}
          <section>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <BarChart className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Analytics & Reports</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• Revenue and growth tracking</li>
                  <li>• Customer satisfaction scores</li>
                  <li>• Team performance metrics</li>
                  <li>• AI automation statistics</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Reports</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• Report generation tools</li>
                  <li>• Data visualization options</li>
                  <li>• Export and sharing features</li>
                  <li>• Scheduled reports setup</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Team Management */}
          <section>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Team Management</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Team Overview</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• Team member directory</li>
                  <li>• Role assignments</li>
                  <li>• Performance tracking</li>
                  <li>• Schedule management</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Task Management</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• Task assignment tools</li>
                  <li>• Progress tracking</li>
                  <li>• Team communication</li>
                  <li>• Workload management</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Calendar & Scheduling */}
          <section>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Calendar & Scheduling</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Calendar Features</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• Calendar views and navigation</li>
                  <li>• Appointment scheduling</li>
                  <li>• Team availability</li>
                  <li>• Recurring appointments</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Scheduling Tools</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• Automated scheduling</li>
                  <li>• Resource allocation</li>
                  <li>• Conflict resolution</li>
                  <li>• Calendar integrations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Additional Resources */}
          <section className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Resources</h2>
            <p className="text-gray-600 mb-4">
              Explore these resources to master your CleanAgent.AI dashboard:
            </p>
            <div className="space-y-3">
              <Link
                to="/help/articles/quickstart"
                className="block text-blue-600 hover:text-blue-700"
              >
                → Quick Start Guide
              </Link>
              <Link
                to="/help/articles/setup"
                className="block text-blue-600 hover:text-blue-700"
              >
                → Initial Setup Guide
              </Link>
              <Link
                to="/help/articles/advanced-features"
                className="block text-blue-600 hover:text-blue-700"
              >
                → Advanced Dashboard Features
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 