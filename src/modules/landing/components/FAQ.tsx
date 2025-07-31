import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does ServiceAgent's AI interviewing work?",
    answer: "Right after someone applies, our AI interviews them by chat or video with no scheduling needed. It asks key questions like experience, availability, and attitude. You get a clear report and score for every applicant, without lifting a finger."
  },
  {
    question: "What types of jobs does it work best for?",
    answer: "We’re built for field service jobs like cleaners, technicians, kitchen staff, landscapers, and more. If you hire hourly workers or skilled trades, ServiceAgent fits. Major franchise or growing teams, we’ve got you covered."
  },
  {
    question: "How much time will this really save me?",
    answer: "Most users cut their hiring time by 85%. One owner went from 20 hours/week to 2. No more chasing down no-shows or wasting time on bad interviews."
  },
  {
    question: "Is setup hard? Do I need tech skills?",
    answer: "Nope. It takes about 10 minutes. Just fill in your job details and we’ll do the rest. No special software or training needed. Use your ATS or run it solo."
  },
  {
    question: "Can the AI really find better candidates than me?",
    answer: "Yes, but you still make the final call. Our AI was trained on over 1 million hiring decisions. It ranks applicants by who’s most likely to succeed, without bias or burnout. You get a smarter shortlist, faster."
  },
  {
    question: "Can I change the questions or scoring?",
    answer: "Yes.You can use our proven templates or fully customize your interviews. Add questions about driving, licenses, experience or whatever matters most. The AI will score them based on what you care about."
  }
];

const FAQ = () => {
  return (
    <section className="relative py-24 bg-gradient-to-tl from-[#A1E3FF]/6 via-slate-50 to-[#0E7CFF]/5 overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-[#0E7CFF]/10 to-transparent rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-radial from-[#A1E3FF]/15 to-transparent rounded-full blur-2xl opacity-50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            All you need to know about ServiceAgent's AI hiring assistant.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200">
                <AccordionTrigger className="text-left text-slate-900 hover:text-[#0E7CFF] py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
