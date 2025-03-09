import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { SocialProvider } from './types';

export const socialProviders: SocialProvider[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Connect your Facebook page for social media management',
    logo: Facebook,
    status: 'disconnected'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    description: 'Manage your Twitter presence and engagement',
    logo: Twitter,
    status: 'disconnected'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Connect your LinkedIn company page',
    logo: Linkedin,
    status: 'disconnected'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Manage your Instagram business account',
    logo: Instagram,
    status: 'disconnected'
  }
]; 