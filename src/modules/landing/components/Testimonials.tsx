import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Marcus Johnson",
    role: "Founder",
    company: "Elite Plumbing Services", 
    content: "ServiceAgent transformed our hiring. We went from spending 20 hours per week screening candidates to just 2 hours reviewing the top picks. Our new hires are 3x more likely to stay long-term.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Jennifer Martinez",
    role: "Operations Director",
    company: "ProClean Commercial",
    content: "The AI interviews caught red flags we would have missed. One candidate seemed perfect on paper, but the AI detected inconsistencies in their experience. Saved us from a bad hire.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "David Rodriguez", 
    role: "CEO",
    company: "Rodriguez HVAC",
    content: "ROI was immediate. We used to pay $300+ per hire to recruiters. Now we get better candidates for a fraction of the cost. ServiceAgent pays for itself with just one good hire.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 bg-gradient-to-tr from-[#A1E3FF]/5 via-white to-[#0E7CFF]/8 border-t border-slate-200 overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-gradient-radial from-[#0E7CFF]/10 to-transparent rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-radial from-[#A1E3FF]/20 to-transparent rounded-full blur-2xl opacity-70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Trusted by Service Companies Nationwide
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See how ServiceAgent is helping companies hire faster and smarter.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel className="w-full" opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-12 text-center">
                      <div className="flex justify-center items-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-6 w-6 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                      </div>
                      
                      <blockquote className="text-xl text-slate-700 mb-8 leading-relaxed italic">
                        "{testimonial.content}"
                      </blockquote>
                      
                      <div className="flex items-center justify-center">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-slate-200"
                        />
                        <div className="text-left">
                          <div className="font-semibold text-slate-900 text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-slate-600">
                            {testimonial.role}, {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
