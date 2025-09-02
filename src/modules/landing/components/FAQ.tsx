// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// const faqs = [
//   {
//     question: "How does ServiceAgent's AI interviewing work?",
//     answer: "Right after someone applies, our AI interviews them by chat or video with no scheduling needed. It asks key questions like experience, availability, and attitude. You get a clear report and score for every applicant, without lifting a finger."
//   },
//   {
//     question: "What types of jobs does it work best for?",
//     answer: "We’re built for field service jobs like cleaners, technicians, kitchen staff, landscapers, and more. If you hire hourly workers or skilled trades, ServiceAgent fits. Major franchise or growing teams, we’ve got you covered."
//   },
//   {
//     question: "How much time will this really save me?",
//     answer: "Most users cut their hiring time by 85%. One owner went from 20 hours/week to 2. No more chasing down no-shows or wasting time on bad interviews."
//   },
//   {
//     question: "Is setup hard? Do I need tech skills?",
//     answer: "Nope. It takes about 10 minutes. Just fill in your job details and we’ll do the rest. No special software or training needed. Use your ATS or run it solo."
//   },
//   {
//     question: "Can the AI really find better candidates than me?",
//     answer: "Yes, but you still make the final call. Our AI was trained on over 1 million hiring decisions. It ranks applicants by who’s most likely to succeed, without bias or burnout. You get a smarter shortlist, faster."
//   },
//   {
//     question: "Can I change the questions or scoring?",
//     answer: "Yes. You can use our proven templates or fully customize your interviews. Add questions about driving, licenses, experience or whatever matters most. The AI will score them based on what you care about."
//   }
// ];

// const FAQ = () => {
//   return (
//     <section className="relative py-24 bg-gradient-to-tl from-[#A1E3FF]/6 via-slate-50 to-[#0E7CFF]/5 overflow-hidden">
//       {/* Background Gradient Effects */}
//       <div className="absolute inset-0">
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-[#0E7CFF]/10 to-transparent rounded-full blur-3xl opacity-60"></div>
//         <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-radial from-[#A1E3FF]/15 to-transparent rounded-full blur-2xl opacity-50"></div>
//       </div>

//       <div className="relative z-0 md:container max-sm:mx-8 max-md:mt-8 md:mx-auto px-2 sm:px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-slate-900 mb-4">
//             Frequently Asked Questions
//           </h2>
//           <p className="text-xl text-slate-600 max-w-2xl mx-auto hyphens-none break-words">
//             All you need to know about ServiceAgent's AI hiring assistant.
//           </p>
//         </div>

//         <div className="max-w-3xl mx-auto">
//           <Accordion type="single" collapsible>
//             {faqs.map((faq, index) => (
//               <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200">
//                 <AccordionTrigger className="px-4 sm:px-6 text-left text-slate-900 hover:text-[#0E7CFF] py-6">
//                   {faq.question}
//                 </AccordionTrigger>
//                 <AccordionContent className="px-4 sm:px-6 text-slate-600 pb-6 leading-relaxed text-left">
//                   {faq.answer}
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQ;

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQsProps {
  title?: string;
  description?: string;
}
const faqs = [
  {
    id: "item-1",
    question: "How does AI interviewing work?",
    answer: "ServiceAgent conducts video and chat interviews automatically using AI. Candidates answer your custom questions, and our AI evaluates responses, giving each candidate a score from 1-10 with detailed reasoning."
  },
  {
    id: "item-2", 
    question: "Do I need an ATS?",
    answer: "No, ServiceAgent works standalone. However, we integrate with popular ATS platforms like Workable, Bullhorn, and BambooHR to streamline your existing workflow."
  },
  {
    id: "item-3",
    question: "What roles is this best for?",
    answer: "ServiceAgent excels with high-turnover service roles: cleaning staff, restaurant workers, HVAC technicians, pest control specialists, landscaping crews, and franchise positions."
  },
  {
    id: "item-4",
    question: "Can I customize the questions?",
    answer: "Absolutely! Create custom interview questions or use our industry-specific templates. You can tailor questions for each role and location."
  },
  {
    id: "item-5",
    question: "How fast can I go live?",
    answer: "Most customers are conducting interviews within 10 minutes of setup. Our quick onboarding gets you hiring immediately."
  },
  {
    id: "item-6",
    question: "What happens after the trial?",
    answer: "Choose a plan that fits your hiring volume. Cancel anytime with no long-term commitments. Your interview data stays accessible."
  }
];

const FAQ = ({ 
  title = "Frequently Asked Questions", 
  description = "Discover quick and comprehensive answers to common questions about our platform, services, and features.", 
}: FAQsProps) => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-card/10 to-background overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-teal/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-terracotta/2 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative">
          {/* Section Header */}
          <div 
            className="text-center space-y-6 mb-16 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal/10 to-gold/10 text-teal rounded-full text-sm font-medium border border-teal/20">
              <span className="w-2 h-2 bg-teal rounded-full animate-pulse"></span>
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get answers to common questions about ServiceAgent's AI hiring platform for service businesses
            </p>
          </div>

          {/* FAQ Grid */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 shadow-xl overflow-hidden">
              <div className="divide-y divide-border/30">
                {faqs.map((item, index) => (
                  <div
                    key={item.id}
                    className={`group p-8 hover:bg-gradient-to-r hover:from-teal/5 hover:to-gold/5 transition-all duration-300 opacity-0 animate-fade-in ${
                      index === 0 ? 'rounded-t-3xl' : ''
                    } ${index === faqs.length - 1 ? 'rounded-b-3xl' : ''}`}
                    style={{ 
                      animationDelay: `${0.2 + index * 0.1}s`, 
                      animationFillMode: 'forwards' 
                    }}
                  >
                    <details className="group/details">
                      <summary className="flex items-center justify-between cursor-pointer list-none group-hover:text-primary transition-colors duration-200">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-teal/20 to-gold/20 rounded-full flex items-center justify-center mt-1 group-hover:from-teal/30 group-hover:to-gold/30 transition-all duration-300">
                            <span className="text-sm font-bold text-teal">{index + 1}</span>
                          </div>
                          <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight pr-4 hyphens-none break-words">
                            {item.question}
                          </h3>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-terracotta/20 flex items-center justify-center group-hover:from-gold/30 group-hover:to-terracotta/30 transition-all duration-300 group-open/details:rotate-45">
                            <ChevronDown className="w-5 h-5 text-gold transition-transform duration-300 group-open/details:rotate-180" />
                          </div>
                        </div>
                      </summary>
                      
                      <div className="mt-6 ml-12 pr-12">
                        <div className="relative">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal/30 via-gold/30 to-terracotta/30 rounded-full"></div>
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed pl-6 py-2 hyphens-none break-words">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default FAQ;