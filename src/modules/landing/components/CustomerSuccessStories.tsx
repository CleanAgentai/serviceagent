import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Owner, Pristine Cleaning Services',
    image: '/testimonials/sarah.jpg',
    quote: 'CleanAgent has revolutionized how we manage our cleaning business. The AI scheduling and client communication features have saved us countless hours.',
  },
  {
    name: 'Michael Chen',
    role: 'CEO, SparkleRight Solutions',
    image: '/testimonials/michael.jpg',
    quote: 'Since implementing CleanAgent, our response rate is 100% 24/7. The automated quality checks and feedback system are game-changers.',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Operations Manager, Elite Clean Co.',
    image: '/testimonials/emma.jpg',
    quote: 'The AI-powered hiring system has transformed our recruitment process. We now find qualified cleaners in half the time.',
  },
];

export function CustomerSuccessStories() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600">
            See how businesses are transforming with CleanAgent.AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center text-xl font-bold text-blue-600">
                  {testimonial.name[0]}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
