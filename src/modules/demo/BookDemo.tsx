import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Users, MessageSquare, CheckCircle2 } from 'lucide-react';

const demoFAQs = [
  {
    question: "What will I learn in the demo?",
    answer: "We'll show you how CleanAgent.AI automates your hiring, sales, and operations. You'll see real examples of AI handling tasks like candidate screening, lead follow-up, and scheduling optimization."
  },
  {
    question: "How long is the demo?",
    answer: "The demo typically takes 30 minutes, with additional time for Q&A. We'll customize the presentation to focus on the features most relevant to your business."
  },
  {
    question: "Who should attend the demo?",
    answer: "The demo is perfect for cleaning business owners, operations managers, or anyone involved in hiring and growth decisions. Feel free to invite team members who would benefit."
  },
  {
    question: "What do I need to prepare?",
    answer: "Just come with your questions! We recommend having a basic understanding of your current processes for hiring, sales, and operations to make the most of the session."
  }
];

const benefits = [
  {
    icon: Clock,
    title: "See AI in Action",
    description: "Watch how our AI handles hiring, sales, and operations in real-time"
  },
  {
    icon: Users,
    title: "Personalized Walkthrough",
    description: "Get answers specific to your business needs and challenges"
  },
  {
    icon: MessageSquare,
    title: "Expert Guidance",
    description: "Chat with our team about implementation and best practices"
  }
];

const testimonials = [
  {
    quote: "The demo showed me exactly how much time I could save. I signed up right after.",
    author: "Sarah Martinez",
    role: "CEO, Pristine Cleaning"
  },
  {
    quote: "Seeing the AI in action was eye-opening. It's exactly what my business needed.",
    author: "Michael Chen",
    role: "Owner, Elite Clean Co"
  }
];

export function BookDemo() {
  React.useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <Link to="/" className="text-xl font-bold">
              <span className="text-blue-600">Clean</span>
              <span className="text-blue-600">Agent</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Let's Walk You Through{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              CleanAgent.AI
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Schedule a live demo with our team to see how CleanAgent.AI can automate your cleaning business and save you time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          {/* Left Column - Calendar */}
          <div className="order-2 lg:order-1">
            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">What You'll Get</h2>
              <div className="space-y-4 sm:space-y-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 flex items-center justify-center">
                        <benefit.icon className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900">{benefit.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendly Embed */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[500px] sm:h-[600px]">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/cleanagent/demo"
                style={{ width: '100%', height: '100%', minWidth: '320px' }}
              />
            </div>
          </div>

          {/* Right Column - FAQ and Social Proof */}
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Common Questions</h2>
              <div className="space-y-4 sm:space-y-6">
                {demoFAQs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">What Others Say</h2>
              <div className="space-y-4 sm:space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <p className="text-sm sm:text-base text-gray-600 mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center text-white font-bold">
                        {testimonial.author[0]}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 mb-4">Trusted by 500+ cleaning businesses</p>
            </div>

            {/* Fallback CTA */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Not ready for a demo?</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Try CleanAgent.AI on your own with our 7-day free trial.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto justify-center"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 