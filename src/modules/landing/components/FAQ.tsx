import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does ServiceAgent's AI interviewing work?",
    answer: "Our AI conducts structured interviews via chat or video, asking role-specific questions tailored to service industry positions. It evaluates responses for technical skills, experience, communication quality, and cultural fit, then provides detailed scoring and recommendations."
  },
  {
    question: "What types of service industry roles can ServiceAgent help with?",
    answer: "ServiceAgent works for all service industry positions including HVAC technicians, plumbers, electricians, cleaning staff, landscapers, handymen, customer service representatives, and field service managers. Our AI adapts its questions based on the specific role requirements."
  },
  {
    question: "How much time does ServiceAgent save compared to traditional hiring?",
    answer: "Most clients save 15-20 hours per week on candidate screening. Instead of manually reviewing hundreds of applications and conducting initial phone screens, you receive a ranked shortlist of pre-screened candidates ready for final interviews."
  },
  {
    question: "What's the setup process like?",
    answer: "Setup takes less than 30 minutes. We'll help you create your company profile, define job requirements, and customize interview questions. Our team provides onboarding support to ensure you're getting optimal results from day one."
  },
  {
    question: "How accurate is the AI screening compared to human recruiters?",
    answer: "Our AI has a 92% accuracy rate in identifying candidates who successfully complete probationary periods, compared to 65% for traditional screening methods. The AI evaluates candidates consistently without bias and never gets tired or rushed."
  },
  {
    question: "Can I customize the interview questions for my specific needs?",
    answer: "Absolutely. You can customize questions based on your company culture, specific technical requirements, and role responsibilities. Our Growth plan includes unlimited custom question sets and ongoing optimization based on your hiring outcomes."
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
            Everything you need to know about ServiceAgent and how it can transform your hiring process.
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
