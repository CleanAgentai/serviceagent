import React from 'react';
import {
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  ClipboardCheck,
  Settings,
  Brain,
  Zap,
  LucideIcon
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features = [
  {
    title: 'AI-Powered Hiring',
    description: 'Automate candidate screening, interviews, and onboarding to build your dream team faster.',
    icon: Users
  },
  {
    title: '24/7 Customer Service',
    description: 'Let AI handle customer inquiries, quotes, and support while you focus on growth.',
    icon: MessageSquare
  },
  {
    title: 'Smart Scheduling',
    description: 'Optimize routes, manage teams, and handle last-minute changes automatically.',
    icon: Calendar
  },
  {
    title: 'Marketing Automation',
    description: 'Generate leads, nurture prospects, and convert customers on autopilot.',
    icon: TrendingUp
  },
  {
    title: 'Quality Control',
    description: 'Monitor service quality, collect feedback, and maintain high standards effortlessly.',
    icon: ClipboardCheck
  },
  {
    title: 'Operations Management',
    description: 'Streamline workflows, track inventory, and manage expenses with ease.',
    icon: Settings
  },
  {
    title: 'AI Strategy Advisor',
    description: 'Get data-driven insights and recommendations to optimize your business.',
    icon: Brain
  },
  {
    title: 'Instant Automation',
    description: 'Deploy AI agents instantly with no coding or technical expertise required.',
    icon: Zap
  }
];

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon }) => (
  <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <div 
          className="h-[44px] w-[44px] bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
          aria-hidden="true"
        >
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

export default function CleaningManagementSolution() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Cleaning Management
            </span>{' '}
            Solution
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to automate and scale your cleaning business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 