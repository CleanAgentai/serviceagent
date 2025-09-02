import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

// const Demo = () => {
//   return (
//     <section id="demo" className="relative py-24 bg-gradient-to-bl from-white via-[#A1E3FF]/8 to-[#0E7CFF]/5 overflow-hidden">
//       {/* Background Gradient Effects */}
//       <div className="absolute inset-0">
//         <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-[#0E7CFF]/15 to-transparent rounded-full blur-3xl opacity-60"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-radial from-[#A1E3FF]/25 to-transparent rounded-full blur-2xl opacity-70"></div>
//       </div>

//       <div className="relative z-0 md:container max-sm:mx-8 max-md:mt-8 md:mx-auto px-2 sm:px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-slate-900 mb-4">
//             See ServiceAgent in Action
//           </h2>
//           <p className="text-xl text-slate-600 max-w-2xl mx-auto">
//             Watch how our AI transforms your hiring from start to finish.
//           </p>
//         </div>

//         <div>
//           <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          
//             <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
//               <iframe
//                 src="https://www.loom.com/embed/c6331eb111804e92a20090266c736074?sid=a7df1056-af9a-4c8c-b4f2-561a565e7538&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true" 
//                 frameBorder="0" 
//                 allowFullScreen
//                 className="aspect-[16/9] absolute top-0 left-0 w-full h-full border-0"
//               />
//             </div>
//           </div>
          
//           <div className="text-center mt-8">
//             <Link to="/signup">
//               <Button 
//                 size="lg" 
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-4"
//               >
//                 Try It Free for 7 Days
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </Link>
//             <div className="mt-4">
//               <button 
//                 onClick={() => window.open('https://calendly.com/serviceagent/25min', '_blank')}
//                 className="text-blue-600 hover:text-blue-700 underline transition-colors duration-300"
//               >
//                 Prefer a personal touch? Book a live demo.
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

const Demo = () => {
  return (
  <section id="demo" className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-6 relative">
          {/* Section Header */}
          <div 
            className="text-center space-y-6 mb-16 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 via-gold/10 to-teal/10 text-primary rounded-full text-sm font-medium border border-primary/20 shadow-lg">
              <Play className="w-4 h-4" />
              See It In Action
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold">
              <span className="text-foreground">Watch</span>{' '}
              <span className="relative inline-block">
                <span className="text-gold">ServiceAgent</span>
                <div className="absolute -bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-terracotta rounded-full z-[-1]"></div>
              </span>{' '}
              <span className="text-foreground">Transform Hiring</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              See how our AI conducts interviews, scores candidates, and helps you hire the best talent in minutes instead of days.
            </p>
          </div>

          {/* Video Demo Container */}
          <div 
  className="relative max-w-4xl mx-auto opacity-0 animate-fade-in"
  style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
>
  <div className="relative">
    {/* Glow effect (behind + non-interactive) */}
    <div className="absolute -inset-6 bg-gradient-to-r from-gold/20 via-teal/20 to-terracotta/20 rounded-3xl blur-2xl opacity-40 transition-opacity duration-700 pointer-events-none -z-10" />

    {/* Decorative dots (behind + non-interactive) */}
    <div className="absolute inset-0 opacity-20 pointer-events-none -z-10">
      <div className="absolute top-8 left-8 w-4 h-4 bg-gold rounded-full animate-pulse" />
      <div className="absolute top-16 right-16 w-6 h-6 bg-teal rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-10 left-16 w-3 h-3 bg-terracotta rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </div>

    {/* Video container (has the aspect ratio) */}
    <div className="relative bg-card border-2 border-primary/20 rounded-3xl shadow-3xl overflow-hidden hover:border-primary/40 hover:shadow-[0_25px_80px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-500" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src="https://www.loom.com/embed/c6331eb111804e92a20090266c736074?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
        className="absolute aspect-[16/9] w-full border-0 top-0 left-0 h-full"
        title="ServiceAgent Demo"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  </div> 
  </div>
  </div>

          {/* Demo Features */}
          <div 
            className="grid md:grid-cols-3 gap-8 mt-16 opacity-0 animate-fade-in px-8"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground">AI Interview Process</h3>
              <p className="text-muted-foreground">Watch how candidates interact with our AI interviewer</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal/20 to-teal/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground">Automatic Scoring</h3>
              <p className="text-muted-foreground">See how candidates are scored and ranked instantly</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-terracotta/20 to-terracotta/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground">Quick Review</h3>
              <p className="text-muted-foreground">Learn how to review and make hiring decisions fast</p>
            </div>
          </div>
      </section>
    );
};

export default Demo; 