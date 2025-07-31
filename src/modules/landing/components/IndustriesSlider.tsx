import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import {
  Sparkles, // for Residential Cleaning
  Building2,
  Wrench,
  ShowerHead,
  Leaf,
  Bug,
  Landmark,
  Users,
  Globe,
  Utensils,
  Hotel,
} from "lucide-react";

// Photo suggestions for each industry:


const industries = [
  {
    title: "Residential Cleaning",
    path: "/industries/residential-cleaning",
    overview: `A multi-location residential cleaning franchise—operating across Colorado, Georgia, and Florida—was hiring 12 to 18 cleaners per month across six branches. Despite a consistent flow of applicants from Indeed, their hiring process was slowing down growth and costing revenue. They replaced it with ServiceAgent. In 30 days, they fully staffed all six locations, cut their time-to-hire by more than 70%, and eliminated over 50 hours of recruiting work per month.`,
    icon: Sparkles,
    photo: "/CleaningService.svg"
  },
  {
    title: "Commercial Cleaning",
    path: "/industries/commercial-cleaning",
    overview: `A regional commercial cleaning provider specializing in office parks, healthcare clinics, and government buildings needed to staff up quickly after landing two large facility contracts. They were aiming to hire 8–10 janitors and night crew staff within 14 days — a challenge given their past struggles with flaky applicants and long screening cycles. With ServiceAgent, they hit their hiring target in 11 days, eliminated interview no-shows, and reduced their manual screening time by over 80%.`,
    icon: Building2,
    photo: "/Janitor.svg"
  },
  {
    title: "HVAC",
    path: "/industries/hvac",
    overview: `A multi-location HVAC company serving residential and commercial customers across the Southeast hit a major growth milestone: three new service contracts and a surge in seasonal calls. They needed to hire 6–8 field technicians fast—but were burned out from previous recruiting cycles filled with resume spam, no-shows, and inconsistent hiring standards. With ServiceAgent, they fully staffed their team in 21 days and built a repeatable system that continues to fill roles automatically.`,
    icon: Wrench,
    photo: "/HVAC.svg"
  },
  {
    title: "Plumbing",
    path: "/industries/plumbing",
    overview: `A fast-growing plumbing company with three regional branches was struggling to meet customer demand due to unfilled technician roles. Their team had just signed contracts with new builders and property managers—but lacked the skilled labor to fulfill work orders without overtime or delays. Hiring was a bottleneck. Despite strong applicant volume, the operations team was stuck in a loop of resume filtering, phone tag, and ghosted interviews. Within 14 days of launching ServiceAgent, they hired 5 new field techs and recovered over $18,000 in lost revenue potential.`,
    icon: ShowerHead,
    photo: "/Plumber.svg"
  },
  {
    title: "Landscaping",
    path: "/industries/landscaping",
    overview: `A mid-sized commercial landscaping company was heading into peak spring contracts short-staffed. They needed 6 new field crew members—mowers, trimmers, irrigation techs—across two service areas. Historically, this meant 3–4 weeks of phone calls, ghosted interviews, and rushed hires. This year, they tried something different. By launching ServiceAgent, they filled all 6 roles in 10 days, saved over 60 hours of admin work, and eliminated no-shows entirely.`,
    icon: Leaf,
    photo: "/LandScapping.svg"
  },
  {
    title: "Pest Control",
    path: "/industries/pest-control",
    overview: `A regional pest control company with 5 branches needed to hire 8–10 new field technicians ahead of termite season. Historically, recruiting was slow, inconsistent, and left managers overwhelmed with unqualified candidates. With ServiceAgent, they fully automated top-of-funnel hiring—replacing 30+ hours of manual screening per week with structured AI interviews. In 14 days, they hired 9 techs, reduced time-to-hire by 73%, and made higher-quality hires who stayed longer.`,
    icon: Bug,
    photo: "/Pest.svg"
  },
  {
    title: "Franchises",
    path: "/industries/franchises",
    overview: `A national service-based franchise group with 14 locations (across 4 states) needed to hire 20+ hourly workers to keep up with seasonal demand. Each location handled its own hiring, resulting in major inconsistencies, delays, and missed revenue due to understaffing. With ServiceAgent, the franchisor centralized top-of-funnel hiring for all locations using AI-powered interviews, rubric-based candidate scoring, and automated follow-ups. The results: 22 hires in 21 days, 50+ hours saved weekly, and a repeatable process to roll out across every new franchise unit.`,
    icon: Landmark,
    photo: "/Franchise.svg"
  },
  {
    title: "Staffing",
    path: "/industries/staffing",
    overview: `A regional light industrial staffing firm with 15 recruiters was struggling to keep up with high applicant volume for entry-level warehouse and logistics roles. Applications were strong, but their internal team couldn’t screen fast enough—causing drop-off, missed placements, and recruiter burnout. In just 30 days, ServiceAgent automated over 570 candidate interviews, delivered pre-qualified candidates in under 24 hours, and helped the firm increase fill rates while saving over 280 recruiter hours per month.`,
    icon: Users,
    photo: "/WareHouse.svg"
  },
  {
    title: "Outsourcing Firms",
    path: "/industries/outsourcing-firms",
    overview: `A 200-seat outsourcing firm replaced manual first-round interviews with AI—screening 800+ candidates in 30 days, reducing time-to-hire by 74%, and scaling placements across the Philippines, Mexico, and India. By using ServiceAgent, the BPO was able to automate every applicant interview across all geographies—using AI to screen, score, and rank talent around the clock. Recruiters now focus only on the most promising candidates, reducing burnout, boosting throughput, and accelerating client onboarding.`,
    icon: Globe,
    photo: "/Call Service.svg"
  },
  {
    title: "Restaurants",
    path: "/industries/restaurants",
    overview: `A quick-service restaurant (QSR) operator managing 14 locations across Florida and Georgia was struggling to keep up with constant turnover. The regional manager needed to fill front-line roles (cashiers, line cooks, shift leads) fast—but managers were already overloaded. They implemented ServiceAgent to fully automate the top of their hiring funnel. In 30 days, they filled all 48 open roles, cut average time-to-hire from 7 days to under 36 hours, and removed the need for manual resume screening or phone tag entirely.`,
    icon: Utensils,
    photo: "/Resturant.svg"
  },
  {
    title: "Hospitality",
    path: "/industries/hospitality",
    overview: `A boutique hospitality group operating five upscale hotels across the Southeast U.S. was facing major challenges filling front-desk, housekeeping, kitchen, and concierge roles. Their in-house team couldn’t keep up with the high volume of turnover and seasonal demand. They replaced their manual screening process with ServiceAgent’s automated AI interviewing system. In the first month, they filled all 32 open roles, completely eliminated interview no-shows, and empowered HR to shift from reactive hiring to proactive talent pipeline building.`,
    icon: Hotel,
    photo: "/Hotel.svg"
  },
];

function getPreviewWithFade(text: string, minLength = 120, maxLength = 160) {
  if (text.length <= minLength) return text;
  // Find a space after minLength but before maxLength
  let cut = text.indexOf(' ', minLength);
  if (cut === -1 || cut > maxLength) cut = maxLength;
  return text.slice(0, cut) + '...';
}

const IndustriesSlider = () => {
  return (
    <section id="industries-slider" className="relative py-24 bg-gradient-to-tr from-[#A1E3FF]/5 via-white to-[#0E7CFF]/8 border-t border-slate-200 overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-gradient-radial from-[#0E7CFF]/10 to-transparent rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-radial from-[#A1E3FF]/20 to-transparent rounded-full blur-2xl opacity-70"></div>
      </div>
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            See How ServiceAgent Works in Your Industry
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We help cleaning, pest control, and restaurant businesses hire faster, better people without all the stress.
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <Carousel className="w-full" opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                const preview = getPreviewWithFade(industry.overview, 120, 160);
                return (
                  <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-12 text-center flex flex-col items-center">
                        <div className="flex flex-col items-center mb-6">
                          <Icon className="h-12 w-12 text-[#0E7CFF] mb-3" />
                          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-[#0E7CFF] to-[#1E529D] bg-clip-text text-transparent tracking-tight uppercase">
                            {industry.title}
                          </h3>
                          <div className="h-1 w-12 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] rounded-full mt-2" />
                        </div>
                        <div className="relative max-w-2xl mx-auto w-full">
                          <span className="text-lg text-slate-700 leading-relaxed block text-left" style={{ WebkitMaskImage: 'linear-gradient(180deg, #000 80%, transparent 100%)', maskImage: 'linear-gradient(180deg, #000 80%, transparent 100%)' }}>
                            {preview}
                          </span>
                          <div className="pt-2 text-left">
                            <Link to={industry.path} className="text-[#0E7CFF] font-semibold cursor-pointer hover:underline">
                              See more
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSlider; 