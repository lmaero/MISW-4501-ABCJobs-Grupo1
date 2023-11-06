export interface PerformanceItem {
  candidateName: string;
  candidateTypeTest: string;
  testTitle: string;
  resultPercentage: number;
  resultDescription: string;
}

export interface TestPerformed {
  test_id: number;
  answers: Array<string[]>;
}
