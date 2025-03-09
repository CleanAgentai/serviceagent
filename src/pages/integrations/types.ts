import { LucideIcon } from 'lucide-react';

export interface BaseProvider {
  id: string;
  name: string;
  description: string;
  logo: LucideIcon;
  status: 'connected' | 'disconnected';
}

export interface EmailProvider extends BaseProvider {}
export interface SocialProvider extends BaseProvider {} 