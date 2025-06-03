import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Zap, Target, Play, Building } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "85%",
    label: "less time on hiring tasks",
    description: "We automate job posts, interviews, and follow-ups—so you don't have to."
  },
  {
    icon: Zap,
    value: "100%",
    label: "of applicants interviewed in 5 min",
    description: "Every applicant gets an AI interview instantly—no ghosting, no bottlenecks."
  },
  {
    icon: Target,
    value: "5x",
    label: "more predictive than manual screening",
    description: "Trained on 1M+ data points to surface the best candidates every time."
  },
  {
    icon: Play,
    value: "10 min",
    label: "setup time to go live",
    description: "No setup. No tech skills. Just results."
  },
  {
    icon: Building,
    value: "100+",
    label: "service businesses trust us",
    description: "From solo operators to franchises—we scale with you."
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
            Proven Results That Transform Your Hiring
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join hundreds of companies already experiencing game-changing improvements in their hiring process.
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
            <div className="text-sm text-slate-600">Weeks reduced to hours</div>
          </div>
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
            <div className="text-5xl font-bold text-[#0E7CFF] mb-2">87%</div>
            <div className="text-lg font-semibold text-slate-800 mb-2">Cost Savings</div>
            <div className="text-sm text-slate-600">Thousands saved per hire</div>
          </div>
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
            <div className="text-5xl font-bold text-[#0E7CFF] mb-2">5x</div>
            <div className="text-lg font-semibold text-slate-800 mb-2">Better Candidates</div>
            <div className="text-sm text-slate-600">AI-filtered top performers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics; 