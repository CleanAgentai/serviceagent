import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';

interface Review {
  name: string;
  initials: string;
  location: string;
  quote: string;
  rating: number;
  image?: string;
}

const reviews: Review[] = [
  {
    name: "Sarah Martinez",
    initials: "SM",
    location: "Clearwater, FL",
    quote: "CleanAgent's AI has transformed our hiring process. We've grown from 10 to 50 cleaners in just 3 months, and the quality of candidates is exceptional.",
    rating: 5
  },
  {
    name: "Michael Chen",
    initials: "MC",
    location: "Tampa, FL",
    quote: "The AI sales agent is incredible. Our conversion rate doubled, and we're saving 25 hours a week on follow-ups. Best investment we've made!",
    rating: 5
  },
  {
    name: "Emily Thompson",
    initials: "ET",
    location: "Orlando, FL",
    quote: "Marketing automation has revolutionized our online presence. Lead costs dropped 65% while volume tripled. The ROI is amazing.",
    rating: 5
  },
  {
    name: "David Wilson",
    initials: "DW",
    location: "Miami, FL",
    quote: "The scheduling AI is a game-changer. No more last-minute cancellations or scheduling conflicts. Our operations run like clockwork now.",
    rating: 5
  },
  {
    name: "Lisa Rodriguez",
    initials: "LR",
    location: "Jacksonville, FL",
    quote: "From hiring to customer service, CleanAgent handles it all. We've cut operational costs by 40% and our customer satisfaction is at an all-time high.",
    rating: 5
  }
];

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextReview = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }
  };

  const prevReview = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const autoPlayTimer = setInterval(nextReview, 5000);
    return () => clearInterval(autoPlayTimer);
  }, [currentIndex]);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Customer{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            See how cleaning businesses are scaling faster with CleanAgent's AI
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous review"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next review"
          >
            <ArrowRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Review Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
            <div
              className={`transition-opacity duration-500 ${
                isAnimating ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {/* Customer Info */}
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center text-white text-xl font-bold">
                  {reviews[currentIndex].initials}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {reviews[currentIndex].name}
                  </h3>
                  <p className="text-gray-600">{reviews[currentIndex].location}</p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-xl text-gray-600 mb-6">
                "{reviews[currentIndex].quote}"
              </blockquote>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Share Your Experience
            <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
} 