import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does ServiceAgent's AI interviewing work?",
    answer: "ServiceAgent conducts interviews via an AI chatbot (or video) immediately after someone applies. The AI asks a structured set of questions that you'd typically ask in a first-round interview – for example, work experience, availability, situational judgment questions. It then analyzes the responses in real-time. You'll see a summarized interview report for each candidate, along with an objective score. In short, every applicant gets a fair, fast interview without you lifting a finger, and you get consistent data to compare candidates."
  },
  {
    question: "What types of roles or industries does ServiceAgent support?",
    answer: "We're built for service industry hiring. Think of roles like cleaners, HVAC technicians, landscapers, plumbers, electricians, front-desk staff – any hourly or skilled trade positions. Our AI interviews are customizable to fit each role. Whether you're a cleaning company hiring dozens of cleaners or a small HVAC business hiring your first technician, ServiceAgent can adapt to your needs. (And if you ever need help tailoring it to a unique role, our support team is here to assist.)"
  },
  {
    question: "How much time will ServiceAgent really save me?",
    answer: "Customers report saving dozens of hours per hire. On average, owners see about an 85% reduction in time spent on hiring tasks. For example, one user used to spend 20 hours a week on hiring and cut that down to ~2 hours using ServiceAgent. By automating job posting, scheduling, and initial interviews, you reclaim your time and can focus on only the final round interviews and hiring decisions. Many roles that used to take a month to fill can now be filled in under a week – a huge time savings for your business."
  },
  {
    question: "What's the setup process like? Do I need technical skills?",
    answer: "Setup is extremely quick and non-technical. You sign up for a free trial (just a simple form). Once in, you'll enter basic info about the job you're hiring for (job title, description, requirements). That's it – ServiceAgent's platform then takes over by distributing the job post and activating the AI interviews. The whole setup and posting process takes about 10 minutes. You don't need any special technical knowledge or additional software. And if you do use an ATS or other HR software, ServiceAgent can integrate with it seamlessly, but it's absolutely not required to start."
  },
  {
    question: "How accurate is ServiceAgent's AI screening? Can it really find better candidates than a person can?",
    answer: "Our AI isn't here to replace your judgment – it's here to enhance it. ServiceAgent's screening AI has been trained on over 1,000,000+ hiring decisions and outcomes, allowing it to predict candidate success much better than hunches or cursory resume glances. In tests, our AI's candidate rankings were 5× more predictive of on-the-job success compared to traditional manual screening. It uses consistent criteria for every applicant (no human bias or tired eyes), so you won't miss hidden gems. Of course, you make the final call on who to hire, but ServiceAgent ensures you're looking at the best of the best first."
  },
  {
    question: "Can I customize the interview questions or criteria?",
    answer: "Yes, definitely. ServiceAgent comes with expert-designed interview templates for common service roles, but you have full control to customize them. You can add your own questions – for example, ask about a specific certification or include a scenario question relevant to your business. You can also adjust the importance of certain answers in the scoring (for instance, if having a driver's license is non-negotiable, the AI can weight that heavily). The system is flexible: use it out-of-the-box or tailor it to fit your idea of an ideal hire. Either way, the AI will handle the heavy lifting of asking and evaluating the answers."
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
