import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    title: 'AI Hires for You',
    subtitle: 'Post jobs. Screen candidates. Hire instantly.',
    description: 'AI posts your job everywhere, interviews applicants in real time, and hires the best candidates in minutes—not weeks.',
    features: [
      'Multi-platform job posting',
      'AI video interviews',
      'Real-time screening',
      'Automated onboarding'
    ]
  },
  {
    title: 'AI Books More Jobs',
    subtitle: 'Stop losing leads to slow follow-ups.',
    description: 'AI texts, emails, and follows up automatically—turning leads into paying customers 24/7.',
    features: [
      'Instant lead response',
      'Smart qualification',
      'Automated follow-ups',
      'Meeting scheduling'
    ]
  },
  {
    title: 'AI Runs Your Business',
    subtitle: 'No more chasing schedules or dealing with last-minute cancellations.',
    description: "AI handles bookings, reminders, and client updates so you don't have to.",
    features: [
      'Smart scheduling',
      'Client communication',
      'Quality monitoring',
      'Performance tracking'
    ]
  }
];

export default function Timeline() {
  return (
    <section id="how-it-works" className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How CleanAgent{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Three simple steps to automate your cleaning business with AI
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 to-teal-500" />
              
              <div className="p-8 sm:p-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-lg font-medium text-blue-600 mb-4">
                      {step.subtitle}
                    </p>
                    <p className="text-gray-600 mb-6">
                      {step.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {step.features.map((feature) => (
                        <div key={feature} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 mr-2" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Try for Free – 7 Days
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Only $299/month after trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
} 