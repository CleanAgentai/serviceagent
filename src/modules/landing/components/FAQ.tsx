import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "How does the Hiring Agent screen candidates?",
    answer: (
      <>
        <br />
        <p className="mb-4">
          Our AI conducts real-time chat and video interviews, scoring
          applicants based on skills, availability, experience, and reliability.
          You only see the top-ranked candidates.
        </p>
      </>
    ),
  },
  {
    question: "Can I customize the interview questions?",
    answer: (
      <>
        <br />
        <p className="mb-4">
          Yes. You can use our proven, high-converting templates or write your
          own interview questions based on the role you’re hiring for.
        </p>
      </>
    ),
  },
  {
    question: "Where does the Hiring Agent post my job?",
    answer: (
      <>
        <br />
        <p className="mb-4">
          The AI automatically posts your listing on platforms like Indeed,
          Facebook Jobs, and LinkedIn, with optimized descriptions tailored to
          your industry.
        </p>
      </>
    ),
  },
  {
    question: "Do I need to integrate anything with my current system?",
    answer: (
      <>
        <br />
        <p className="mb-4">
          Nope. ServiceAgent works out of the box with no setup required. You’ll
          get candidate shortlists and hiring actions directly in your
          dashboard.
        </p>
      </>
    ),
  },
  {
    question: "What support is included?",
    answer: (
      <>
        <br />
        <p className="mb-4">
          Our team is here to help you get live fast. We offer onboarding, live
          chat, and 1-on-1 support to make sure your hiring process is seamless.
        </p>
      </>
    ),
  },
  {
    question: "Is candidate and business data secure?",
    answer: (
      <>
        <br />
        <p className="mb-4">
          Absolutely. ServiceAgent uses industry-standard encryption and data
          privacy practices to protect both your data and your applicants’.
        </p>
      </>
    ),
  },
];

export default function FAQComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gray-50" id="hiring-agent-faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#3DA6C7] to-[#1E529D] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about the AI Hiring Agent from
            ServiceAgent
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
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <Link
            id="faq-support-button"
            to="/support"
            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
