import { Mail } from 'lucide-react';
import { EmailProvider } from './types';

export const emailProviders: EmailProvider[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Connect your Gmail account to send and receive emails',
    logo: Mail,
    status: 'disconnected'
  },
  {
    id: 'outlook',
    name: 'Outlook',
    description: 'Connect your Outlook account for email integration',
    logo: Mail,
    status: 'disconnected'
  },
  {
    id: 'smtp',
    name: 'Custom SMTP',
    description: 'Connect your own SMTP server for email sending',
    logo: Mail,
    status: 'disconnected'
  }
]; 