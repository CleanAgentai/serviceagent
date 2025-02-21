import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What happens after the 7-day free trial?",
    answer: (
      <>
        <p className="mb-4">
          You will be automatically billed $299/month unless you cancel before the trial ends. The subscription includes:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>All AI agents (Hiring, Sales, Marketing, Operations)</li>
          <li>Unlimited users and locations</li>
          <li>24/7 support and updates</li>
          <li>No long-term contracts - cancel anytime</li>
        </ul>
      </>
    ),
  },
  {
    question: "How does CleanAgent help my cleaning business grow?",
    answer: (
      <>
        <p className="mb-4">
          CleanAgent's AI automates your entire business operations:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Save Time:</strong> Reduce admin work by 20+ hours per week</li>
          <li><strong>Cut Costs:</strong> Lower operational expenses by up to 90%</li>
          <li><strong>Grow Faster:</strong> Convert 40% more leads with 24/7 follow-up</li>
          <li><strong>Scale Easily:</strong> Hire and onboard staff 95% faster</li>
        </ul>
        <p>
          This automation lets you focus on growth while AI handles day-to-day operations.
        </p>
      </>
    ),
  },
  {
    question: "How easy is it to get started?",
    answer: (
      <>
        <p className="mb-4">
          CleanAgent is designed to be plug-and-play:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Sign up for your free trial (takes 2 minutes)</li>
          <li>Connect your business tools (we guide you through it)</li>
          <li>Start using AI agents immediately</li>
        </ol>
        <p className="mt-4">
          Our onboarding team helps you every step of the way. Most businesses are fully set up within 30 minutes.
        </p>
      </>
    ),
  },
  {
    question: "What results can I expect in the first month?",
    answer: (
      <>
        <p className="mb-4">
          Based on our customer data, you can expect:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>20+ hours saved in administrative work</li>
          <li>40% increase in lead conversion rates</li>
          <li>95% faster hiring process</li>
          <li>30% improvement in customer satisfaction</li>
          <li>$2,000+ reduction in monthly operational costs</li>
        </ul>
      </>
    ),
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: (
      <>
        <p className="mb-4">
          Yes, CleanAgent is a month-to-month service with no long-term commitments:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Cancel instantly through your dashboard</li>
          <li>No cancellation fees or penalties</li>
          <li>Keep using the service until the end of your billing period</li>
          <li>Export your data anytime</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you offer training and support?",
    answer: (
      <>
        <p className="mb-4">
          Yes, we provide comprehensive support to ensure your success:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Free onboarding assistance</li>
          <li>24/7 live chat support</li>
          <li>Video tutorials and documentation</li>
          <li>Weekly live training sessions</li>
          <li>Dedicated customer success manager</li>
        </ul>
      </>
    ),
  }
];

export default function FAQComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gray-50" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about CleanAgent and our AI-powered automation
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
} 