import { Send, Users, ArrowRight, Target, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LogoCarousel from "./LogoCarousel";

const features = [
  {
    icon: Send,
    title: "Post Job",
    description: "Post your job onto your preferred job boards, LinkedIn, & website to receive applicants.",
    step: "01"
  },
  {
    icon: Bot,
    title: "Instant AI Interviews", 
    description: "Within minutes of applying, every candidate gets a personalized AI-driven interview via chat or video.",
    step: "02"
  },
  {
    icon: Users,
    title: "Instant Candidate Ranking",
    description: "AI scores and ranks applicants, delivering a shortlist of top matches ready for you to contact.",
    step: "03"
  }
];

const Features = () => {
  return (
    <section id="features" className="relative py-24 bg-gradient-to-br from-white via-[#A1E3FF]/10 to-slate-50 overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-radial from-[#0E7CFF]/20 to-transparent rounded-full blur-2xl opacity-60"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-radial from-[#A1E3FF]/30 to-transparent rounded-full blur-2xl opacity-50"></div>
      </div>

      <div className="relative z-0 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            How ServiceAgent Works
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Three simple steps to transform your hiring process and find the perfect candidates faster.
          </p>
        </div>

        {/* Visual Flow */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center">
                {/* Step Card */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer w-80 h-96">
                  <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                    {/* Step Number */}
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto text-blue-600 font-bold text-lg">
                      {feature.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-600 transition-colors duration-300 group-hover:scale-110">
                        <feature.icon className="h-12 w-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Arrow (except for last item) */}
                {index < features.length - 1 && (
                  <div className="flex items-center justify-center lg:mx-4 my-4 lg:my-0">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <ArrowRight className="h-6 w-6 text-white lg:rotate-0 rotate-90" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Platform Logos */}
          <div className="mt-16 text-center">
            <LogoCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 