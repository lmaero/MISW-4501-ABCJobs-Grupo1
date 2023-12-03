export interface LoginOutput {
  email: string;
  token: string;
}

export interface RegisterCandidateOutput {
  message: string;
  email: string;
}

export interface RegisterProfileCandidateOutput {
  candidates: string;
}

export interface CandidateInfoOutput {
  userInfo: UserInfoCandidateOutput;
}

export interface UserInfoCandidateOutput {
  email: string;
  first_name: string;
  last_name: string;
  candidateid: number;
  type: string;
}

export interface CompanyInfoOutput {
  userInfo: UserInfoCompanyOutput;
}

export interface UserInfoCompanyOutput {
  email: string;
  company_name: string;
  company_id: number;
}

export interface InterviewsOutput {
  interviews: Interview[];
}

export interface Interview {
  candidateid: number;
  company_id: number;
  company_name: string;
  schedule: Date;
  result: InterviewResult | null;
  selected: null;
  interview_id: number;
}

export interface InterviewResult {
  results: ResultElement[];
}

export interface ResultElement {
  test: string;
  score: number;
}

export interface ResultsOutput {
  results: Result[];
}

export interface Result {
  test: string;
  score: number;
}

export interface ScheduleInterviewOutput {
  msg: string;
}
