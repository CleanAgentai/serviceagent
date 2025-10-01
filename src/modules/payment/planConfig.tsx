export type PlanKey = 'STARTER' | 'LAUNCH' | 'SCALE' | 'CUSTOM';

export function getPlans(isYearly: boolean = false) {
  return [
    {
      title: "Starter",
      price: isYearly ? "$79" : "$99",
      originalPrice: null,
      headline: "Begin hassle-free hiring",
      yearPrice: "$950",
      period: isYearly ? "/month (billed yearly)" : "/month",
      cost_per_candidate: isYearly ? "$8/candidate" : "$10/candidate",
      description: "Best for getting started",
      features: [
        "10 candidates/month",
        "Create unlimited job posts",
        "Ranked candidates (1-10)",
        "Qualified vs. unqualified scoring",
        "Candidate videos + transcripts",
        "Email support",
      ],
      popular: false,
      key: "STARTER"
    },
    {
      title: "Launch",
      price: isYearly ? "$119" : "$149",
      originalPrice: isYearly ? "$149" : null,
      headline: "Save 15+ hours per hire",
      yearPrice: "$1,430",
      period: isYearly ? "/month (billed yearly)" : "/month",
      cost_per_candidate: isYearly ? "$6/candidate" : "$7/candidate",
      description: "For companies hiring on a monthly basis",
      features: [
        "20 candidates/month",
        "Everything included in Starter Plan",
        "Export candidate analysis as PDF",
        "Export candidate transcript as PDF",
        "Custom branding for candidates", 
        "Save 15+ hours/month on hiring"
      ],
      popular: true,
      key: "LAUNCH"
    },
    {
      title: "Scale",
      price: isYearly ? "$399" : "$499",
      originalPrice: isYearly ? "$499" : null,
      headline: "Hire 5× faster",
      yearPrice: "$4,790",
      period: isYearly ? "/month (billed yearly)" : "/month",
      cost_per_candidate: isYearly ? "$4/candidate" : "$5/candidate",
      description: "For growing companies with higher volume",
      features: [
        "100 candidates/month",
        "Everything included in Launch Plan",
        "ATS Integration",
        "Priority Phone Support",
        "Save 50+ hours/month on hiring"
      ],
      popular: false,
      key: "SCALE",
    },
  ];
}

export type PlanPerks = Record<PlanKey, string[]>;

export interface PlanTheme {
  checkGradient: string;
  bannerGradient: string;
  highlightText: string;
  borderClass: string;
}

export const planThemes: Record<PlanKey, PlanTheme> = {
  STARTER: {
    checkGradient: "bg-gradient-to-br from-teal to-teal/60",
    bannerGradient: "bg-teal/5",
    highlightText: "text-teal",
    borderClass: "border-teal/30 hover:border-teal/80",
  },
  LAUNCH: {
    checkGradient: "bg-gradient-to-br from-gold to-gold/80",
    bannerGradient: "bg-gold/5",
    highlightText: "text-gold",
    borderClass: "border-gold/40",
  },
  SCALE: {
    checkGradient: "bg-gradient-to-br from-terracotta to-terracotta/40",
    bannerGradient: "bg-terracotta/5",
    highlightText: "text-terracotta",
    borderClass: "border-terracotta/40",
  },
  CUSTOM: {
    checkGradient: "bg-gradient-to-br from-orange to-orange/80",
    bannerGradient: "bg-gold/5",
    highlightText: "text-gold",
    borderClass: "border-gold/40",
  },
};

export const planPerks = (costPerCandidate: Partial<Record<PlanKey, number | string>>): PlanPerks => ({
  STARTER: [
    "100% no-risk free trial",
    "Pay nothing for the first 14 days",
    "Cancel anytime, hassle-free",
    "10 candidates/month",
    `Only ${costPerCandidate.STARTER ?? "-"} - $0 due today!`,
    "Expert support included",
  ],
  LAUNCH: [
    "100% no-risk free trial",
    "Pay nothing for the first 14 days",
    "Cancel anytime, hassle-free",
    "20 candidates/month",
    "Save 15+ hours per month with AI interviewing",
    "Candidate transcript and analysis as PDF",
    "Custom branding for candidates",
    `Only ${costPerCandidate.LAUNCH ?? "-"} - $0 due today!`,
    "Expert support included",
  ],
  SCALE: [
    "100% no-risk free trial",
    "Pay nothing for the first 14 days",
    "Cancel anytime, hassle-free",
    "Get access to all features",
    "100 candidates/month",
    "Save 50+ hours per month with AI interviewing",
    "ATS integration",
    `Only ${costPerCandidate.SCALE ?? "-"} - $0 due today!`,
    "Priority phone support",
  ],
  CUSTOM: [],
});


