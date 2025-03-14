interface TooltipContent {
  id: string;
  content: string;
  title?: string;
}

interface DocumentationSection {
  id: string;
  title: string;
  content: string;
  subsections?: DocumentationSection[];
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  isOptional?: boolean;
  icon: string;
}

class DocumentationService {
  private static instance: DocumentationService;
  private tooltips: Map<string, TooltipContent>;
  private documentation: Map<string, DocumentationSection>;
  private onboardingSteps: OnboardingStep[];

  private constructor() {
    this.tooltips = new Map();
    this.documentation = new Map();
    this.onboardingSteps = [];
    this.initializeContent();
  }

  public static getInstance(): DocumentationService {
    if (!DocumentationService.instance) {
      DocumentationService.instance = new DocumentationService();
    }
    return DocumentationService.instance;
  }

  private initializeContent() {
    // Initialize tooltips
    this.addTooltip({
      id: 'ai-suggestions',
      title: 'AI Suggestions',
      content: 'Click here to see AI-powered recommendations for optimizing your marketing campaigns.'
    });

    this.addTooltip({
      id: 'job-posting-preview',
      content: 'Preview how your job posting will appear on different platforms before publishing.'
    });

    // Initialize documentation sections
    this.addDocumentationSection({
      id: 'marketing-campaigns',
      title: 'Marketing Campaigns',
      content: 'Learn how to create and manage marketing campaigns.',
      subsections: [
        {
          id: 'create-campaign',
          title: 'Creating a Campaign',
          content: 'Step-by-step guide to creating a new marketing campaign...'
        },
        {
          id: 'analytics',
          title: 'Campaign Analytics',
          content: 'Understanding your campaign metrics and performance indicators...'
        }
      ]
    });

    this.addDocumentationSection({
      id: 'job-postings',
      title: 'Job Postings',
      content: 'Everything you need to know about managing job postings.',
      subsections: [
        {
          id: 'create-posting',
          title: 'Creating a Job Posting',
          content: 'How to create and optimize your job postings...'
        },
        {
          id: 'manage-applications',
          title: 'Managing Applications',
          content: 'Track and manage candidate applications efficiently...'
        }
      ]
    });

    // Initialize onboarding steps
    this.setOnboardingSteps([
      {
        id: 'welcome',
        title: 'Welcome to ServiceAgent.ai',
        description: 'Get started with your AI-powered business assistant',
        content: 'Welcome to ServiceAgent.ai! This quick tour will help you get familiar with the key features.',
        icon: 'wave'
      },
      {
        id: 'marketing',
        title: 'Marketing Automation',
        description: 'Learn about our AI-powered marketing tools',
        content: 'Discover how our AI can help automate your marketing campaigns and improve engagement.',
        icon: 'megaphone'
      },
      {
        id: 'hiring',
        title: 'Hiring & Recruitment',
        description: 'Streamline your hiring process with AI',
        content: 'See how our AI can help you find and evaluate the best candidates faster.',
        icon: 'users'
      },
      {
        id: 'complete',
        title: "You're All Set!",
        description: "You've completed the onboarding tour",
        content: "Congratulations! You're now ready to start using ServiceAgent.ai to its full potential.",
        icon: 'check'
      }
    ]);
  }

  public addTooltip(tooltip: TooltipContent) {
    this.tooltips.set(tooltip.id, tooltip);
  }

  public getTooltip(id: string): TooltipContent | undefined {
    return this.tooltips.get(id);
  }

  public addDocumentationSection(section: DocumentationSection) {
    this.documentation.set(section.id, section);
  }

  public getDocumentationSection(id: string): DocumentationSection | undefined {
    return this.documentation.get(id);
  }

  public getAllDocumentationSections(): DocumentationSection[] {
    return Array.from(this.documentation.values());
  }

  public setOnboardingSteps(steps: OnboardingStep[]) {
    this.onboardingSteps = steps;
  }

  public getOnboardingSteps(): OnboardingStep[] {
    return this.onboardingSteps;
  }

  public searchDocumentation(query: string): DocumentationSection[] {
    const normalizedQuery = query.toLowerCase();
    return Array.from(this.documentation.values()).filter(section => {
      const matchInTitle = section.title.toLowerCase().includes(normalizedQuery);
      const matchInContent = section.content.toLowerCase().includes(normalizedQuery);
      const matchInSubsections = section.subsections?.some(
        subsection =>
          subsection.title.toLowerCase().includes(normalizedQuery) ||
          subsection.content.toLowerCase().includes(normalizedQuery)
      );
      return matchInTitle || matchInContent || matchInSubsections;
    });
  }
}

export const documentationService = DocumentationService.getInstance();
export type { TooltipContent, DocumentationSection, OnboardingStep }; 