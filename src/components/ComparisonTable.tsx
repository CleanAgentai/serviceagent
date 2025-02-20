import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Calendar,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Video
} from 'lucide-react';

interface ComparisonFeature {
  title: string;
  withCleanAgent: {
    text: string;
    metric?: string;
    icon: React.ElementType;
  };
  withoutCleanAgent: string;
}

const features: ComparisonFeature[] = [
  {
    title: 'Hiring Process',
    withCleanAgent: {
      text: 'AI-powered automated hiring',
      metric: '95% faster',
      icon: Clock
    },
    withoutCleanAgent: 'Manual hiring process, weeks of interviews'
  },
  {
    title: 'Lead Generation',
    withCleanAgent: {
      text: '24/7 automated lead capture & follow-up',
      metric: '40% more leads',
      icon: TrendingUp
    },
    withoutCleanAgent: 'Manual follow-ups, missed opportunities'
  },
  {
    title: 'Team Management',
    withCleanAgent: {
      text: 'AI scheduling & performance tracking',
      metric: '85% less time',
      icon: Users
    },
    withoutCleanAgent: 'Manual scheduling, limited oversight'
  },
  {
    title: 'Revenue Growth',
    withCleanAgent: {
      text: 'Optimized pricing & booking',
      metric: '32% increase',
      icon: DollarSign
    },
    withoutCleanAgent: 'Static pricing, inconsistent bookings'
  },
  {
    title: 'Customer Satisfaction',
    withCleanAgent: {
      text: 'Proactive service monitoring',
      metric: '4.9/5 rating',
      icon: Star
    },
    withoutCleanAgent: 'Reactive issue handling'
  },
  {
    title: 'Scheduling',
    withCleanAgent: {
      text: 'Smart automated scheduling',
      metric: '100% optimized',
      icon: Calendar
    },
    withoutCleanAgent: 'Manual calendar management'
  }
];

export default function ComparisonTable() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('comparison-table');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              CleanAgent
            </span>{' '}
            Difference
          </h2>
          <p className="text-xl text-gray-600">
            See how CleanAgent transforms your cleaning business operations
          </p>
        </div>

        {/* Comparison Table */}
        <div 
          id="comparison-table"
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12"
        >
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 md:p-8">
              <h3 className="text-xl font-bold text-blue-600">With CleanAgent</h3>
              <p className="text-gray-600">AI-powered automation</p>
            </div>
            <div className="bg-gray-50 p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-600">Without CleanAgent</h3>
              <p className="text-gray-500">Traditional operations</p>
            </div>
          </div>

          {/* Table Content */}
          <div className="divide-y divide-gray-100">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`grid grid-cols-1 md:grid-cols-2 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                }`}
              >
                {/* With CleanAgent */}
                <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <feature.withCleanAgent.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        <p className="font-medium text-gray-900">
                          {feature.withCleanAgent.text}
                        </p>
                      </div>
                      {feature.withCleanAgent.metric && (
                        <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 ${
                          isVisible ? 'animate-fade-in-up' : 'opacity-0'
                        }`}>
                          {feature.withCleanAgent.metric}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Without CleanAgent */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-gray-500">{feature.withoutCleanAgent}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto justify-center"
          >
            Book a Demo Call
            <Video className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            Try Free for 7 Days
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
} 