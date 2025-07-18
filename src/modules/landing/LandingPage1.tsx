// import React from "react";
// import { Link } from "react-router-dom";
// import * as Icons from "lucide-react";
// import Timeline from "./components/Timeline";
// import Testimonials from "./components/Testimonials";
// import FAQ from "./components/FAQ";
// import Pricing from "./components/Pricing";
// import { openCalendly } from "@/app/shared/utils/calendly";
// import { Navigation } from "./components/Navigation";
// import { Footer } from "./components/Footer";

// // Stats
// const stats = [
//   {
//     value: "92%",
//     label: "Faster Time-to-Hire",
//     description: "AI screens and ranks applicants instantly",
//     icon: Icons.Clock,
//   },
//   {
//     value: "85%",
//     label: "Less Time Spent on Hiring",
//     description: "Eliminate job posting, resume screening, and scheduling",
//     icon: Icons.Calendar,
//   },
//   {
//     value: "5x",
//     label: "Better Candidate Quality",
//     description: "Only interview the top 5% of applicants",
//     icon: Icons.TrendingUp,
//   },
//   {
//     value: "24/7",
//     label: "AI Hiring Assistant",
//     description: "Working around the clock—even when you’re off the clock",
//     icon: Icons.Zap,
//   },
// ];

// // Hero section features
// const heroFeatures = [
//   {
//     icon: Icons.Megaphone,
//     title: "Hands-Free Job Posting",
//     description:
//       " Automatically publish job listings on Indeed, Facebook, and LinkedIn with optimized descriptions for HVAC, plumbing, cleaning, and more. No manual setup needed",
//   },
//   {
//     icon: Icons.Bot,
//     title: "24/7 Candidate Screening",
//     description:
//       "Every applicant is interviewed instantly by AI via chat or video. Candidates are ranked by skills, experience, and fit—so you only talk to the best",
//   },
//   {
//     icon: Icons.ListChecks,
//     title: "Instant Shortlists, No Guesswork",
//     description:
//       "The Hiring Agent filters and ranks applicants, sends automated rejections, and delivers your top picks with zero admin work",
//   },
// ];

// // Main features
// const mainFeatures = [
//   {
//     title: "Job Posting, Done For You",
//     description:
//       "Your Hiring Agent writes and publishes job listings across platforms like Indeed, Facebook, and LinkedIn—customized for your industry and optimized for conversion.",
//     icon: Icons.Users,
//     gradient: "from-blue-600 to-teal-500",
//     features: [
//       "Multi-platform job distribution",
//       "Role-specific job description templates",
//       "Auto-optimized for performance",
//     ],
//   },
//   {
//     title: "24/7 Candidate Screening",
//     description:
//       "Every applicant is automatically interviewed by AI using chat or video. Responses are scored in real time based on experience, availability, and fit—so you only see the best.",
//     icon: Icons.Target,
//     gradient: "from-blue-600 to-teal-500",
//     features: [
//       "Chat and video interviews",
//       "Skill-based response scoring",
//       "Automatic filtering and red flag detection",
//     ],
//   },
//   {
//     title: "Your Best Candidates, Delivered",
//     description:
//       "Receive a ranked shortlist of top applicants, along with auto-generated offer letters, rejection emails, and onboarding packets. All without lifting a finger.",
//     icon: Icons.Megaphone,
//     gradient: "from-blue-600 to-teal-500",
//     features: [
//       "Top candidates ranked instantly",
//       "Auto-sent rejection and offer emails",
//       "Digital onboarding materials",
//     ],
//   },
// ];

// const highlights = [
//   "AI-Powered Hiring",
//   "Built for Field Service Businesses",
//   "No Setup Required",
//   "Live in 24 Hours",
// ];

// export function LandingPage() {
//   return (
//     <div className="min-h-screen bg-white overflow-hidden">
//       {/* Hero Section */}

//       <div className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
//         {/* Background Decorations */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] bg-gradient-to-b from-blue-50 via-teal-50/30 to-transparent rounded-full opacity-30 blur-3xl" />
//           <div className="absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] bg-gradient-to-t from-blue-50 via-teal-50/30 to-transparent rounded-full opacity-30 blur-3xl" />
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
//           <div className="text-center">
//             {/* Announcement Banner */}
//             {/* <div className="inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-600/10 to-teal-500/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8 text-sm sm:text-base">
//               <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-1 rounded-full">
//                 <Icons.Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
//               </div>
//               <span className="font-medium bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
//                 Only $299/month After Trial
//               </span>
//             </div> */}

//             {/* Main Heading */}
//             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-gray-900 mb-6 sm:mb-8">
//               <span className="block font-bold mb-2 sm:mb-4">
//                 24/7 AI Hiring Agent for Field Service Companies
//               </span>
//               <span className="relative inline-block">
//                 <span className="relative z-10 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent block sm:inline">
//                   Hire Better Techs, Faster
//                 </span>
//                 <br />
//                 <span className="relative z-10 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent block sm:inline">
//                   — Without Lifting a Finger
//                 </span>
//               </span>
//             </h1>

//             {/* Subheading */}
//             <p className="mt-4 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-gray-600">
//               Automate your hiring process with AI. ServiceAgent’s Hiring Agent
//               posts jobs, screens candidates, and sends you only the top 5%—so
//               you can scale your team without wasting hours reviewing bad fits.
//             </p>

//             {/* CTA Buttons */}
//             <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
//               <button
//                 onClick={openCalendly}
//                 className="inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 border border-transparent text-base sm:text-lg font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 Book a Demo Call
//                 <Icons.Video className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
//               </button>
//               <Link
//                 to="/signup"
//                 className="inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 text-base sm:text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition-all duration-300"
//               >
//                 Start Free for 7 Days
//                 <Icons.ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
//               </Link>
//             </div>

//             {/* Trial Features */}
//             <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-1 sm:gap-y-2 text-sm sm:text-base">
//               {highlights.map((highlight) => (
//                 <div
//                   key={highlight}
//                   className="flex items-center text-gray-500"
//                 >
//                   <Icons.Check className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 mr-1 sm:mr-2" />
//                   <span>{highlight}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Feature Cards */}
//             <div className="mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto">
//               {heroFeatures.map((feature) => (
//                 <div
//                   key={feature.title}
//                   className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   <div className="relative p-4 sm:p-6">
//                     <div className="mb-3 sm:mb-4 bg-gradient-to-r from-blue-600/10 to-teal-500/10 p-2 sm:p-3 rounded-lg w-12 h-12 sm:w-14 sm:h-14 mx-auto flex items-center justify-center">
//                       <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
//                     </div>
//                     <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">
//                       {feature.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm sm:text-base">
//                       {feature.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div id="hiring-agent-metrics" className="bg-white py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {stats.map((stat) => (
//               <div
//                 key={stat.value}
//                 className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//               >
//                 <div className="mb-4 bg-gradient-to-r from-blue-600/10 to-teal-500/10 p-3 rounded-lg w-14 h-14 flex items-center justify-center">
//                   <stat.icon className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <div className="text-3xl font-bold text-gray-900 mb-2">
//                   {stat.value}
//                 </div>
//                 <div className="text-lg font-semibold text-gray-900 mb-1">
//                   {stat.label}
//                 </div>
//                 <div className="text-gray-600">{stat.description}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Features Section */}
//       <div
//         id="hiring-agent-features-grid"
//         className="relative py-16 sm:py-28 overflow-hidden bg-gray-50"
//       >
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
//           <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-100/50 rounded-full blur-3xl" />
//           <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-teal-100/50 rounded-full blur-3xl" />
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
//               Complete{" "}
//               <span className="relative">
//                 <span className="relative z-10 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
//                   AI-Powered Solution
//                 </span>
//               </span>
//             </h2>
//             <p className="text-base sm:text-xl text-gray-600">
//               Our AI agents handle every aspect of your field service business
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8 lg:gap-12">
//             {mainFeatures.map((feature) => (
//               <div
//                 key={feature.title}
//                 className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

//                 <div className="relative p-5 sm:p-8">
//                   <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4 sm:mb-6">
//                     <div
//                       className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${feature.gradient} p-2 sm:p-3`}
//                     >
//                       <feature.icon className="h-full w-full text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
//                         {feature.title}
//                       </h3>
//                       <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
//                         {feature.description}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6">
//                     {feature.features.map((item) => (
//                       <div key={item} className="flex items-center">
//                         <Icons.Check className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-1.5 sm:mr-2 flex-shrink-0" />
//                         <span className="text-gray-600 text-sm sm:text-base">
//                           {item}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Timeline Section */}
//       <Timeline />

//       {/* Testimonials Section */}
//       <Testimonials />

//       {/* Pricing Section */}
//       {/* <Pricing /> */}

//       {/* FAQ Section */}
//       <FAQ />

//       {/* Final CTA Section */}
//       <div
//         id="hiring-agent-final-cta"
//         className="bg-gradient-to-r from-blue-600 to-teal-500 py-20"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold text-white mb-8">
//             Ready to stop wasting time on hiring?
//           </h2>
//           <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
//             Join hundreds of service businesses using ServiceAgent to hire top
//             talent on autopilot. Try it free—no commitments, no setup required.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Link
//               id="final-cta-free-trial"
//               to="/signup"
//               className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               Try Free for 7 Days
//               <Icons.ArrowRight className="ml-2 h-5 w-5" />
//             </Link>
//             <button
//               id="final-cta-book-demo"
//               onClick={openCalendly}
//               className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition-all duration-300"
//             >
//               Book a Demo Call
//               <Icons.Video className="ml-2 h-5 w-5" />
//             </button>
//           </div>
//           <p className="mt-4 text-sm text-white/80">
//             {/* Only $299/month after trial • Cancel anytime */}
//           </p>
//         </div>
//       </div>
//       {/* Timeline Section */}
//     </div>
//   );
// }
