import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Target, Zap, Users, Rocket, ExternalLink } from 'lucide-react';

interface ValueCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description, icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="h-12 w-12 bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export function AboutUs() {
  // Set meta title and description and scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Us - ServiceAgent AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about ServiceAgent AI, our mission to revolutionize service businesses with AI-powered automation.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Revolutionizing the Cleaning Industry with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              AI-Powered Automation
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            We're on a mission to help cleaning businesses eliminate tedious tasks and scale effortlessly.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600">
              ServiceAgent AI was founded by Porter Stanley, a serial entrepreneur with a background in AI and software development. After selling his first software company, he started a service business as a fun side project. What started as a simple venture quickly turned into an eye-opening experience—highlighting inefficiencies in hiring, operations, and marketing within the service industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">The Problem</h3>
              <p className="text-gray-600">
                Hiring was the biggest headache. At one point, Porter had to interview 44 candidates to hire just one employee. The process was time-consuming, frustrating, and inefficient. He knew there had to be a better way.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">The Solution</h3>
              <p className="text-gray-600">
                Leveraging his expertise in AI and automation, Porter built tools to streamline the hiring process. What started as an internal solution quickly evolved into a full-scale platform—ServiceAgent AI—designed to automate hiring, optimize job postings, manage onboarding, and streamline marketing and sales for service businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600">
            We believe AI is the future of business automation. Our mission is simple: to revolutionize service businesses with AI-powered automation. We help business owners eliminate tedious administrative tasks and optimize operations, so they can focus on what matters—growing their business.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Founder</h2>
              <p className="text-lg text-gray-600 mb-6">
                Porter Stanley is an entrepreneur with a passion for AI, automation, and problem-solving. With a successful track record of building and exiting tech companies, he is now dedicated to helping service-based businesses scale effortlessly.
              </p>
              <a
                href="https://www.linkedin.com/in/porterstanley"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 transition-all duration-300 hover:scale-105"
              >
                Connect on LinkedIn
                <ExternalLink className="h-5 w-5 ml-2" />
              </a>
            </div>
            <div className="relative max-w-sm mx-auto">
              <div className="aspect-w-4 aspect-h-5 rounded-xl overflow-hidden shadow-lg">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 w-full h-full opacity-90" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="h-24 w-24 text-white opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Believe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Zap className="h-6 w-6 text-blue-600" />}
              title="Less busywork, more growth"
              description="Business owners shouldn't be bogged down by hiring, admin, and marketing tasks. AI can handle it."
            />
            <ValueCard
              icon={<Target className="h-6 w-6 text-teal-600" />}
              title="Automation should be simple"
              description="Our tools integrate seamlessly into your business without complexity."
            />
            <ValueCard
              icon={<Rocket className="h-6 w-6 text-purple-600" />}
              title="Your success is our priority"
              description="We're here to help cleaning businesses scale effortlessly."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Us</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're just getting started, and we'd love for you to be a part of this journey. Whether you're a service business owner looking to scale or an entrepreneur seeking AI-driven solutions, ServiceAgent AI is here to help.
          </p>
          <div className="space-y-4">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 transition-all duration-300 hover:scale-105"
            >
              Get in Touch
              <ExternalLink className="h-5 w-5 ml-2" />
            </Link>
            <p className="text-sm text-gray-500">
              Got questions? Want to see ServiceAgent AI in action?
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 