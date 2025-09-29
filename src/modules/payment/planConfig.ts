export type PlanKey = 'STARTER' | 'LAUNCH' | 'SCALE';

export type PlanPerks = Record<PlanKey, string[]>;

export interface PlanTheme {
  checkGradient: string;
  bannerGradient: string;
  highlightText: string;
  borderClass: string;
}

export const planThemes: Record<PlanKey, PlanTheme> = {
  STARTER: {
    checkGradient: "bg-gradient-to-br from-teal-5 to-teal/10",
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
};

// Helper to build perks with dynamic costs pulled from the page
export function buildPlanPerks(costPerCandidate: Partial<Record<PlanKey, number | string>>): PlanPerks {
  return {
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
  };
}


