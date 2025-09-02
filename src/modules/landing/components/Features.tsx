// import { Send, Users, ArrowRight, Target, Bot } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import LogoCarousel from "./LogoCarousel";

// const features = [
//   {
//     icon: Send,
//     title: "Post Your Job",
//     description: "Post to Indeed, Facebook, or anywhere you already get applicants. We’ll start tracking them right away.",
//     step: "01"
//   },
//   {
//     icon: Bot,
//     title: "AI Interviews Every Applicant", 
//     description: "Our AI interviews with each candidate right after they apply — no scheduling or follow-up needed.",
//     step: "02"
//   },
//   {
//     icon: Users,
//     title: "Get a Shortlist of Top Picks",
//     description: "We score every applicant and send you a ranked list so you only review the best ones.",
//     step: "03"
//   }
// ];

// const Features = () => {
//   return (
//     <section id="features" className="relative py-24 bg-gradient-to-br from-white via-[#A1E3FF]/10 to-slate-50 overflow-hidden">
//       {/* Background Gradient Effects */}
//       <div className="absolute inset-0">
//         <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-radial from-[#0E7CFF]/20 to-transparent rounded-full blur-2xl opacity-60"></div>
//         <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-radial from-[#A1E3FF]/30 to-transparent rounded-full blur-2xl opacity-50"></div>
//       </div>

//       <div className="relative z-0 md:container max-sm:mx-8 max-md:mt-8 md:mx-auto px-4 sm:px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-slate-900 mb-4">
//             How It Works
//           </h2>
//           <p className="text-xl text-slate-600 max-w-2xl mx-auto">
//             3 simple steps to save hours and hire faster.
//           </p>
//         </div>

//         {/* Visual Flow */}
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-0">
//             {features.map((feature, index) => (
//               <div key={index} className="flex flex-col xl:flex-row items-center xl:items-stretch">
//                 {/* Step Card */}
//                 <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer w-full h-full md:w-80 md:h-96">
//                   <CardContent className="p-8 text-center h-full flex flex-col justify-between">
//                     {/* Step Number */}
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto text-blue-600 font-bold text-lg">
//                       {feature.step}
//                     </div>
                    
//                     {/* Icon */}
//                     <div className="mb-6">
//                       <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-600 transition-colors duration-300 group-hover:scale-110">
//                         <feature.icon className="h-12 w-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
//                       </div>
//                     </div>
                    
//                     <div>
//                       <h3 className="text-xl font-semibold text-slate-900 mb-3">
//                         {feature.title}
//                       </h3>
//                       <p className="text-slate-600 leading-relaxed text-wrap hyphens-none break-words">
//                         {feature.description}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Arrow (except for last item) */}
//                 {index < features.length - 1 && (
//                   <div className="lg:flex items-center justify-center px-8 mt-8 xl:mt-0 h-50">
//                     <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
//                       <ArrowRight className="h-6 w-6 text-white xl:rotate-0 rotate-90" />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Platform Logos */}
//           <div className="mt-16 text-center">
//             <LogoCarousel />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;
import { Send, Users, ArrowRight, Target, Bot, Sparkles, Clock, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
// import LogoCarousel from "./LogoCarousel";
const Features = () => {
  return (
  <section id="howitworks" className="py-16 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
 {/* Decorative background elements */}
 <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/5 rounded-full blur-3xl animate-pulse" />
 <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
 
 <div className="container mx-auto px-6 relative">
   <div 
     className="text-center space-y-6 mb-20 opacity-0 animate-fade-in"
     style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
   >
     <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 text-teal rounded-full text-sm font-medium mb-4">
       <Sparkles className="w-4 h-4" />
       Simple Process
     </div>
     <h2 className="text-5xl lg:text-6xl font-bold text-primary leading-tight">
       How It Works
     </h2>
     <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
       Transform your hiring process in just 3 simple steps. No complex setup, no learning curve.
     </p>
   </div>
   
  <div className="flex flex-col lg:flex-row items-stretch gap-12 max-w-7xl mx-auto">
     {/* Step 1 - Modern Gold Theme */}
     <div 
       className="flex-1 group opacity-0 animate-fade-in"
       style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
     >
       <div className="relative bg-gradient-to-br from-card to-gold/5 rounded-3xl p-10 shadow-2xl border border-gold/20 text-center space-y-8 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 hover:border-gold/40  w-full h-full">
         {/* Animated step number */}
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
           <div className="relative">
             <div className="w-12 h-12 bg-gradient-to-r from-gold to-gold/80 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-xl shadow-gold/40 group-hover:scale-110 transition-transform duration-300">
               01
             </div>
             <div className="absolute inset-0 w-12 h-12 bg-gold rounded-full animate-ping opacity-20 group-hover:opacity-40" />
           </div>
         </div>
         
         {/* Icon with animation */}
         <div className="flex justify-center">
           <div className="relative">
             <div className="w-24 h-24 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center group-hover:from-gold/30 group-hover:to-gold/20 transition-all duration-300">
               <Send className="w-12 h-12 text-gold group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
             </div>
             <div className="absolute inset-0 w-24 h-24 bg-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
           </div>
         </div>
         
         {/* Content */}
         <div className="space-y-4">
           <h3 className="text-2xl font-bold text-primary group-hover:text-gold transition-colors duration-300">
             Post Your Job
           </h3>
           <p className="text-muted-foreground leading-relaxed text-base">
             Post to Indeed, Facebook, or anywhere you already get applicants. Our smart tracking starts working immediately.
           </p>
           <div className="pt-2 bottom-0 relative">
             <span className="inline-flex items-center gap-2 text-gold font-medium text-sm group-hover:gap-3 transition-all duration-300">
               <Clock className="w-4 h-4" />
               Takes 2 minutes
             </span>
           </div>
         </div>
       </div>
     </div>

     {/* Animated Arrow 1 */}
     <div className="hidden lg:flex items-center justify-center flex-col gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
       <div className="relative">
         <ArrowRight className="w-8 h-8 text-teal animate-pulse" />
       </div>
     </div>

     {/* Step 2 - Teal Theme */}
     <div 
       className="flex-1 group opacity-0 animate-fade-in"
       style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
     >
       <div className="relative bg-gradient-to-br from-card to-teal/5 rounded-3xl p-10 shadow-2xl border border-teal/20 text-center space-y-8 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 hover:border-teal/40  w-full h-full">
         {/* Animated step number */}
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
           <div className="relative">
             <div className="w-12 h-12 bg-gradient-to-r from-teal to-teal/80 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-xl shadow-teal/40 group-hover:scale-110 transition-transform duration-300">
               02
             </div>
             <div className="absolute inset-0 w-12 h-12 bg-teal rounded-full animate-ping opacity-20 group-hover:opacity-40" style={{ animationDelay: '0.5s' }} />
           </div>
         </div>
         
         {/* Icon with animation */}
         <div className="flex justify-center">
           <div className="relative">
             <div className="w-24 h-24 bg-gradient-to-br from-teal/20 to-teal/10 rounded-full flex items-center justify-center group-hover:from-teal/30 group-hover:to-teal/20 transition-all duration-300">
               <Bot className="w-12 h-12 text-teal group-hover:scale-110 transition-all duration-300" />
             </div>
             <div className="absolute inset-0 w-24 h-24 bg-teal/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
           </div>
         </div>
         
         {/* Content */}
         <div className="space-y-4">
           <h3 className="text-2xl font-bold text-primary group-hover:text-teal transition-colors duration-300">
             AI Interviews Every Applicant
           </h3>
           <p className="text-muted-foreground leading-relaxed text-base">
             Our AI conducts personalized interviews with each candidate immediately after they apply. No scheduling, no delays.
           </p>
           <div className="pt-2 mt-auto">
             <span className="inline-flex items-center gap-2 text-teal font-medium text-sm group-hover:gap-3 transition-all duration-300">
               <Zap className="w-4 h-4" />
               100% automated
             </span>
           </div>
         </div>
       </div>
     </div>

     {/* Animated Arrow 2 */}
     <div className="hidden lg:flex items-center justify-center flex-col gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
       <div className="relative">
         <ArrowRight className="w-8 h-8 text-terracotta animate-pulse" style={{ animationDelay: '0.3s' }} />
       </div>
     </div>

     {/* Step 3 - Terracotta Theme */}
     <div 
       className="flex-1 group opacity-0 animate-fade-in"
       style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
     >
       <div className="relative bg-gradient-to-br from-card to-terracotta/5 rounded-3xl p-10 shadow-2xl border border-terracotta/20 text-center space-y-8 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 hover:border-terracotta/40 w-full h-full">
         {/* Animated step number */}
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
           <div className="relative">
             <div className="w-12 h-12 bg-gradient-to-r from-terracotta to-terracotta/80 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-xl shadow-terracotta/40 group-hover:scale-110 transition-transform duration-300">
               03
             </div>
             <div className="absolute inset-0 w-12 h-12 bg-terracotta rounded-full animate-ping opacity-20 group-hover:opacity-40" style={{ animationDelay: '1s' }} />
           </div>
         </div>
         
          {/* Icon with animation and faces */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-terracotta/20 to-terracotta/10 rounded-full flex items-center justify-center group-hover:from-terracotta/30 group-hover:to-terracotta/20 transition-all duration-300">
                <Users className="w-12 h-12 text-terracotta group-hover:scale-110 transition-all duration-300" />
              </div>
              <div className="absolute inset-0 w-24 h-24 bg-terracotta/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              
              {/* Small face images around the main icon */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                <img src="/workers/Hospitality.png" alt="Top candidate" className="w-full h-full object-cover select-none" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                <img src="/workers/Staffing.png" alt="Top candidate" className="w-full h-full object-cover select-none" />
              </div>
              <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-6 h-6 rounded-full border-2 border-background overflow-hidden">
                <img src="/workers/Restaurant.png" alt="Top candidate" className="w-full h-full object-cover select-none" />
              </div>
            </div>
          </div>
         
         {/* Content */}
         <div className="space-y-4">
           <h3 className="text-2xl font-bold text-primary group-hover:text-terracotta transition-colors duration-300">
             Get a Shortlist of Top Picks
           </h3>
           <p className="text-muted-foreground leading-relaxed text-base">
             We analyze every interview and deliver a ranked shortlist of the best candidates, so you only review the cream of the crop.
           </p>
           <div className="pt-2 mt-auto">
             <span className="inline-flex items-center gap-2 text-terracotta font-medium text-sm group-hover:gap-3 transition-all duration-300">
               <Target className="w-4 h-4" />
               5× more accurate
             </span>
           </div>
         </div>
       </div>
     </div>
   </div>

   {/* Bottom CTA section */}
   <div 
     className="text-center mt-20 opacity-0 animate-fade-in"
     style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}
   >
    <Link to="/signup">
     <div className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold/10 to-teal/10 rounded-full border border-gold/20 text-sm font-medium text-primary hover:shadow-xl hover:scale-105 shadow-lg transition-all duration-300">
       <Sparkles className="w-4 h-4 text-gold group-hover:scale-110 transition-transform duration-300" />
       Ready to transform your hiring process?
       <ArrowRight className="w-4 h-4 text-teal group-hover:translate-x-1 transition-transform duration-300" />
     </div>
     </Link>
      </div>
    
    </div>
  </section>
);
};

export default Features;