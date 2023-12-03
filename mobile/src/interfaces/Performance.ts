export interface PerformanceItem {
  candidateId: number;
  interviewId: number;
  companyId: number;
  companyName: string;
  candidateName: string;
  candidateTypeTest: string;
  testTitle: string;
  resultPercentage: number;
  resultDescription: string;
  canFinishTest: boolean;
  goToCreateResult?: () => void;
}

export interface TestPerformed {
  test_id: number;
  answers: Array<string[]>;
}
