import { Card, CardContent } from '@/components/ui/card';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  Zap,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useState, useRef, useEffect } from 'react';
import { TestimonialCarousel, Testimonial } from '@/components/ui/testimonial';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    avatar: '/workers/Franchise.png',
    name: 'Operations Manager',
    company: '6-Location Cleaning Franchise',
    quote:
      'We reduced hiring time from weeks to days. Candidate quality improved dramatically, and managers finally stopped screening resumes.',
    caseStudyUrl: '/case-studies/cleaning-franchise',
  },
  {
    id: 2,
    avatar: '/workers/OutsourcingFirm.png',
    name: 'Franchise Owner',
    company: 'Multi-unit Restaurant Group',
    quote:
      "Every applicant gets interviewed instantly. No-shows dropped, and we only review top-ranked candidates. It's become our default hiring funnel.",
    caseStudyUrl: '/case-studies/restaurant-group',
  },
  {
    id: 3,
    avatar: '/workers/HVAC.png',
    name: 'HR Director',
    company: 'National Staffing Agency',
    quote:
      'ServiceAgent let us screen 100% of applicants with consistent scoring. Our team reclaimed 50+ hours per month and placements went up.',
    caseStudyUrl: '/case-studies/staffing-agency',
  },
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);
  const testimonialInterval = useRef<NodeJS.Timeout | null>(null);

  // Testimonial auto-play logic
  useEffect(() => {
    if (!isTestimonialHovered) {
      testimonialInterval.current = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    } else {
      if (testimonialInterval.current) {
        clearInterval(testimonialInterval.current);
      }
    }

    return () => {
      if (testimonialInterval.current) {
        clearInterval(testimonialInterval.current);
      }
    };
  }, [isTestimonialHovered, testimonials.length]);

  // Keyboard navigation for testimonials
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentTestimonial((prev) =>
          prev === 0 ? testimonials.length - 1 : prev - 1,
        );
      } else if (e.key === 'ArrowRight') {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [testimonials.length]);

  return (
    <section
      className="py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden"
      aria-label="Customer testimonials"
      role="region"
    >
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-terracotta/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div
          className="text-center space-y-6 mb-20 opacity-0 animate-fade-in"
          style={{
            animationDelay: '0.1s',
            animationFillMode: 'forwards',
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 text-terracotta rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Customer Success
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-primary leading-tight">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real results from businesses that transformed their hiring process
            with ServiceAgent
          </p>
        </div>

        {/* Enhanced Testimonial Carousel */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsTestimonialHovered(true)}
          onMouseLeave={() => setIsTestimonialHovered(false)}
        >
          {/* Stacked Effect Background Cards */}
          <div className="absolute inset-0 transform translate-y-3 translate-x-2 bg-gradient-to-br from-card/20 to-muted/10 rounded-3xl border border-border/10 -z-20"></div>
          <div className="absolute inset-0 transform translate-y-1.5 translate-x-1 bg-gradient-to-br from-card/40 to-muted/20 rounded-3xl border border-border/20 -z-10"></div>

          {/* Main Testimonial Card */}
          <div
            className="relative bg-gradient-to-br from-card to-background/50 border-2 border-border/30 rounded-3xl shadow-3xl transition-all duration-500 hover:shadow-[0_25px_80px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-2 hover:border-primary/20"
            style={{
              animationDelay: '0.3s',
              animationFillMode: 'forwards',
            }}
          >
            {/* Enhanced Navigation Arrows */}
            <button
              onClick={() =>
                setCurrentTestimonial((prev) =>
                  prev === 0 ? testimonials.length - 1 : prev - 1,
                )
              }
              aria-label="Previous testimonial"
              className="absolute top-8 left-8 w-14 h-14 rounded-full bg-gradient-to-br from-teal/10 to-teal/5 border border-teal/20 hover:from-teal/20 hover:to-teal/10 hover:border-teal/40 transition-all duration-300 flex items-center justify-center opacity-70 hover:opacity-100 focus:outline-none hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-teal" />
            </button>

            <button
              onClick={() =>
                setCurrentTestimonial(
                  (prev) => (prev + 1) % testimonials.length,
                )
              }
              aria-label="Next testimonial"
              className="absolute top-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-teal/10 to-teal/5 border border-teal/20 hover:from-teal/20 hover:to-teal/10 hover:border-teal/40 transition-all duration-300 flex items-center justify-center opacity-70 hover:opacity-100 focus:outline-none hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-teal" />
            </button>

            {/* Testimonial Content */}
            <div className="p-12 md:p-16 text-center space-y-10">
              {/* Quote Icon & Quote */}
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
                    <span className="text-3xl text-gold">"</span>
                  </div>
                </div>
                <blockquote
                  className="text-2xl md:text-3xl font-medium text-primary leading-relaxed transition-all duration-500 max-w-4xl mx-auto hyphens-none break-words"
                  key={currentTestimonial}
                >
                  {testimonials[currentTestimonial].quote}
                </blockquote>
              </div>

              {/* Customer Info */}
              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex justify-center hover:scale-110 transition-all duration-300">
                  <div className="relative">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt=""
                      className="w-20 h-20 rounded-full object-cover border-4 border-terracotta/20 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-terracotta to-terracotta/80 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Attribution */}
                <div className="space-y-2">
                  <p className="text-lg font-bold text-primary">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-muted-foreground font-medium">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Pagination Dots */}
          <div
            className="flex justify-center items-center space-x-4 mt-12"
            role="tablist"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                aria-current={index === currentTestimonial ? 'true' : 'false'}
                aria-label={`Go to testimonial ${index + 1} of ${testimonials.length}`}
                role="tab"
                className={`transition-all duration-300 rounded-full focus:outline-none ${
                  index === currentTestimonial
                    ? 'w-12 h-3 bg-gradient-to-r from-gold to-gold/80'
                    : 'w-3 h-3 bg-muted hover:bg-muted-foreground hover:scale-125'
                }`}
              />
            ))}
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center mt-6">
            <div className="text-sm text-muted-foreground">
              {currentTestimonial + 1} of {testimonials.length}
            </div>
          </div>
        </div>
       {/* Call-to-Action Section */}
       <div 
         className="text-center mt-20 opacity-0 animate-fade-in"
         style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
       >
         <div className="bg-gradient-to-br from-card to-background/80 rounded-3xl p-8 md:p-12 border border-border/30 shadow-2xl max-w-4xl mx-auto">
           <div className="space-y-8">
             <div className="space-y-4">
               <h3 className="text-3xl font-bold text-primary">
                 Ready to Join These Success Stories?
               </h3>
               <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                 Start for free today and see why companies choose ServiceAgent for their hiring needs
               </p>
             </div>

             {/* CTA Button */}
             <div className="space-y-4">
               <div className="relative group">
                <Link to="/signup">
                 <Button 
                   size="lg"
                   className="relative bg-gradient-to-r from-gold to-gold/90 hover:from-terracotta hover:to-terracotta/90 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-lg shadow-gold/30 hover:shadow-terracotta/40 hover:scale-105 active:scale-95 transition-all duration-300"
                 >
                   <div className="flex items-center gap-3">
                     <Zap className="w-6 h-6" />
                     Start for Free
                     <div className="w-2 h-2 bg-white rounded-full animate-pulse opacity-80"></div>
                   </div>
                 </Button>
                 </Link>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>
  );
};
export default Testimonials;
