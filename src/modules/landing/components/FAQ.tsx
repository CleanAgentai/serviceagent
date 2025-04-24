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
          Our AI conducts real-time chat and video interviews, scoring each
          applicant on skills, experience, reliability, and communication. You
          only see the top-ranked, qualified candidates.
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
          Yes. You can use our proven templates or submit your own. We’ll tailor
          the interview to match your role and company.
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
          We publish across major platforms like Indeed, Facebook, and
          LinkedIn—optimized for your role, location, and industry.
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
          No integrations needed. You’ll get a simple link and dashboard to view
          and manage top candidates.
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
          We offer full setup in under 20 minutes, and email support is always
          available. You’ll also receive ongoing performance tips to improve
          hiring outcomes.
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
          Yes. All data is encrypted and stored securely using enterprise-grade
          security standards. We’re committed to protecting your business and
          applicant information.
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
            ServiceAgent.
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
        {/* <div className="text-center mt-16">
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
        </div> */}
      </div>
    </section>
  );
}
