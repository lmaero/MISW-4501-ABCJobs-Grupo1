export interface Candidate { 
    personId: number;
    country: string;
    lenguages: string | string[];
    academicalDataId: number;
    technicalDataId: number;
    workDataId: number;
    isAvailable: boolean;
    softSkills: string | string[];
    interviewId: number;
    email: string;
    password: string;
    token?: string;
}
