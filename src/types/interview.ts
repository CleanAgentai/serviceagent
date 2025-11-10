export interface Interview {
    id: string;
    willoKey: string;
    title: string;
    createdAt: string;
    deadline: string;
    location?: string;
    interviewLink?: string;
    applicantCount?: number;
}

export interface InterviewAttempt {
    id: string;
    candidateName: string;
    email: string;
    phone: string;
    createdAt: string;
    interviewTitle: string;
    status: string;
    qualified: boolean | null;
    generalScore: number | null;
}

export type Candidate = {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
};


export type Applicant = {
    id: string;
    createdAt: string;
    createdAtDate?: Date;
    status: string | null;
    qualified: boolean | null;
    candidate: Candidate | null;
    score: number | null;
};