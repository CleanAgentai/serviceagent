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
    quote: 'Since implementing CleanAgent, our customer satisfaction rates have soared. The automated quality checks and feedback system are game-changers.',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Operations Manager, Elite Clean Co.',
    image: '/testimonials/emma.jpg',
    quote: 'The efficiency gains we've seen with CleanAgent are remarkable. Our team coordination has improved significantly, and billing is now seamless.',
  },
];

export function CustomerSuccessStories() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            See how cleaning businesses are transforming their operations with CleanAgent
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="flex flex-col items-start">
              <div className="relative w-full">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime="2023" className="text-gray-500">
                    Verified Customer
                  </time>
                </div>
                <div className="group relative">
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 