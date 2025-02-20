import { Job, Candidate, HiringMetrics } from '../types/hiring';

export const calculateHiringMetrics = (jobs: Job[], candidates: Candidate[]): HiringMetrics => {
  const activeJobs = jobs.filter(job => job.status === 'active');
  const hiredCandidates = candidates.filter(candidate => candidate.status === 'hired');
  const offeredCandidates = candidates.filter(candidate => candidate.status === 'offer');
  const interviewingCandidates = candidates.filter(candidate => candidate.status === 'interview');
  
  const timeToHire = hiredCandidates.length > 0
    ? hiredCandidates.reduce((acc, candidate) => {
        const applied = new Date(candidate.appliedDate);
        const hired = new Date(candidate.lastContact);
        return acc + (hired.getTime() - applied.getTime()) / (1000 * 60 * 60 * 24);
      }, 0) / hiredCandidates.length
    : 0;

  return {
    openPositions: activeJobs.length,
    totalCandidates: candidates.length,
    activeInterviews: interviewingCandidates.length,
    timeToHire,
    offerAcceptRate: offeredCandidates.length > 0
      ? (hiredCandidates.length / offeredCandidates.length) * 100
      : 0,
    costPerHire: 1000, // This would be calculated based on actual costs
    qualifiedRate: candidates.length > 0
      ? (candidates.filter(c => c.status !== 'rejected').length / candidates.length) * 100
      : 0,
    candidateExperience: candidates.length > 0
      ? candidates.reduce((acc, c) => acc + c.experience, 0) / candidates.length
      : 0
  };
};

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'hired':
      return 'success';
    case 'draft':
    case 'screening':
      return 'warning';
    case 'closed':
    case 'rejected':
      return 'error';
    case 'interview':
      return 'info';
    case 'offer':
      return 'primary';
    default:
      return 'default';
  }
};

export const formatSalary = (min: number, max: number, currency: string = 'USD'): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  });
  
  if (min === max) {
    return formatter.format(min);
  }
  
  return `${formatter.format(min)} - ${formatter.format(max)}`;
};

export const validateJobForm = (data: Job): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.title.trim()) {
    errors.title = 'Job title is required';
  }

  if (!data.department) {
    errors.department = 'Department is required';
  }

  if (!data.location.trim()) {
    errors.location = 'Location is required';
  }

  if (!data.type) {
    errors.type = 'Employment type is required';
  }

  if (!data.description.trim()) {
    errors.description = 'Job description is required';
  }

  if (!data.requirements || data.requirements.length === 0) {
    errors.requirements = 'At least one requirement is required';
  }

  if (!data.responsibilities || data.responsibilities.length === 0) {
    errors.responsibilities = 'At least one responsibility is required';
  }

  if (!data.salary.min || !data.salary.max) {
    errors.salary = 'Salary range is required';
  } else if (data.salary.min > data.salary.max) {
    errors.salary = 'Minimum salary cannot be greater than maximum salary';
  }

  if (!data.closingDate) {
    errors.closingDate = 'Closing date is required';
  } else if (new Date(data.closingDate) < new Date()) {
    errors.closingDate = 'Closing date must be in the future';
  }

  return errors;
};

export const generateJobDescription = (job: Partial<Job>): string => {
  const sections = [
    job.description,
    '\n\nRequirements:',
    ...(job.requirements || []).map(req => `• ${req}`),
    '\n\nResponsibilities:',
    ...(job.responsibilities || []).map(resp => `• ${resp}`),
    '\n\nBenefits:',
    ...(job.benefits || []).map(benefit => `• ${benefit}`)
  ];

  return sections.join('\n');
};

export const parseJobDescription = (description: string): Partial<Job> => {
  const sections = description.split('\n\n');
  const mainDescription = sections[0];
  
  const requirements = sections
    .find(s => s.startsWith('Requirements:'))
    ?.split('\n')
    .slice(1)
    .map(r => r.replace('• ', ''))
    .filter(Boolean) || [];
    
  const responsibilities = sections
    .find(s => s.startsWith('Responsibilities:'))
    ?.split('\n')
    .slice(1)
    .map(r => r.replace('• ', ''))
    .filter(Boolean) || [];
    
  const benefits = sections
    .find(s => s.startsWith('Benefits:'))
    ?.split('\n')
    .slice(1)
    .map(b => b.replace('• ', ''))
    .filter(Boolean) || [];

  return {
    description: mainDescription,
    requirements,
    responsibilities,
    benefits
  };
}; 