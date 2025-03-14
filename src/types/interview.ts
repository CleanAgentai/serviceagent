export interface Question {
  id: string;
  text: string;
  answer?: string;
  score?: number;
}

export interface Interview {
  id: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  score?: number;
  questions?: Question[];
  feedback?: {
    rating: number;
    strengths: string[];
    weaknesses: string[];
    notes: string;
  };
  type: 'technical' | 'screening' | 'cultural' | 'final';
  interviewerId: string;
  scheduledAt: Date;
} 