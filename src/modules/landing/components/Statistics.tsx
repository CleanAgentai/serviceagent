import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Zap, Target, Play, Building, Clock, PiggyBank, Award } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "85%",
    label: "Less Time Spent on Hiring",
    description: "We automate repetitive tasks like posting, initial screening, and follow-ups. Customers report cutting time spent on hiring from 20 hours a week to just 2 hours."
  },
  {
    icon: Zap,
    value: "100%",
    label: "of Applicants Interviewed in 5 Minutes",
    description: "Every applicant gets an interview immediately via AI. No one slips through the cracks or waits weeks – no ghosting, no bottlenecks in your pipeline."
  },
  {
    icon: Target,
    value: "5×",
    label: "More Predictive than Manual Screening",
    description: "Our AI, trained on 1M+ hiring data points, identifies top performers with 5× greater accuracy than a quick resume scan. In short, you get better hires with less guesswork."
  },
  {
    icon: Play,
    value: "10",
    label: "Live in 10 Minutes",
    description: "Get set up and post your first job in minutes. No technical setup or training needed – if you can fill out a form, you're ready to go. (Yes, it's really that fast.)"
  },
  {
    icon: Building,
    value: "100+",
    label: "Companies Trust Us",
    description: "From local mom-and-pop shops to national franchises, service businesses across the country rely on ServiceAgent to staff their teams. We grow with you."
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
            Proven Results That Transform Hiring
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join 100+ service businesses who have supercharged their hiring process.
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

        {/* Featured Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
            <div className="text-5xl font-bold text-[#0E7CFF] mb-2">92%</div>
            <div className="text-lg font-semibold text-slate-800 mb-2">Faster Time-to-Hire</div>
            <div className="text-sm text-slate-600">Cut your hiring timeline from weeks down to hours.</div>
          </div>
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
            <div className="text-5xl font-bold text-[#0E7CFF] mb-2">87%</div>
            <div className="text-lg font-semibold text-slate-800 mb-2">Cost Savings per Hire</div>
            <div className="text-sm text-slate-600">Save on job ads, admin time, and bad hires.</div>
          </div>
                      <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
            <div className="text-5xl font-bold text-[#0E7CFF] mb-2">5×</div>
            <div className="text-lg font-semibold text-slate-800 mb-2">Better Candidates</div>
            <div className="text-sm text-slate-600">Focus only on top-tier applicants.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics; 