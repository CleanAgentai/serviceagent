import {
  Home,
  MessageSquare,
  BarChart,
  Users,
  Briefcase,
  GitBranch,
  Plug,
  Sliders,
  HelpCircle,
  ClipboardList,
  LayoutDashboard
} from 'lucide-react';

const sidebarLinks = [
  {
    title: 'Launchpad',
    href: '/',
    icon: Home
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: MessageSquare
  },
  {
    title: 'Metrics',
    href: '/metrics',
    icon: BarChart
  },
  {
    title: 'Sales Agent',
    href: '/sales',
    icon: Briefcase
  },
  {
    title: 'Marketing Agent',
    href: '/marketing',
    icon: Users
  },
  {
    title: 'Hiring Agent',
    href: '/hiring',
    icon: GitBranch
  },
  {
    title: 'Operations',
    href: '/operations',
    icon: LayoutDashboard
  },
  {
    title: 'Integrations',
    href: '/integrations',
    icon: Plug
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Sliders
  },
  {
    title: 'Help',
    href: '/help',
    icon: HelpCircle
  }
]; 