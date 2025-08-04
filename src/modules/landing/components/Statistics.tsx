import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Zap, Target, Play, Building, Clock, PiggyBank, Award } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "85%",
    label: "Less Time on Hiring",
    description: "Owners went from spending 20 hours a week to just 2."
  },
  {
    icon: Zap,
    value: "100%",
    label: "of Applicants Interviewed in Minutes",
    description: "Every single applicant gets interviewed by AI — right away."
  },
  {
    icon: Target,
    value: "5×",
    label: "More Accurate Than Guesswork",
    description: "No more quick hires that don’t work out. We pick the top talent for you."
  },
  {
    icon: Play,
    value: "10m",
    label: "Live in 10 Minutes",
    description: "No training or tech headaches. Just log in and post."
  },
  {
    icon: Building,
    value: "100+",
    label: "Companies Trust Us",
    description: "From growing cleaning teams to national franchises."
  }
];

const Statistics = () => {
  return (
    <section id="stats" className="relative py-24 bg-gradient-to-r from-[#0B1C2D]/5 via-[#0E7CFF]/5 to-[#A1E3FF]/10 overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-[#0E7CFF]/15 to-transparent rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-[#A1E3FF]/20 to-transparent rounded-full blur-2xl opacity-60"></div>
      </div>

      <div className="relative z-0 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Real Results from Real Businesses
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            100+ service teams use ServiceAgent to hire faster and smarter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-slate-50 group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#0E7CFF]/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-[#0E7CFF] transition-colors duration-300">
                  <stat.icon className="h-6 w-6 text-[#0E7CFF] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {stat.value}
                </div>
                <p className="text-sm font-semibold text-slate-700 mb-3 leading-relaxed">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="relative z-0 container mx-auto px-6">
          <div className="text-center mt-16 mb-8">
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We save owners time, money, and stress — without changing how they already work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics; 