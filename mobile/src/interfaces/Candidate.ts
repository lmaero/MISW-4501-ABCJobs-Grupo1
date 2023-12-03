import * as yup from 'yup';
import candidateSchema from '../schemas/CandidateSchema';
import candidateProfileSchema, {
  academicDataSchema,
  experienceSchema,
  technicalDataSchema,
} from '../schemas/CandidateProfileSchema';

export type Candidate = yup.InferType<typeof candidateSchema>;

export type CandidateProfile = yup.InferType<typeof candidateProfileSchema>;

export type AcademicData = yup.InferType<typeof academicDataSchema>;

export type Experience = yup.InferType<typeof experienceSchema>;

export type TechnicalData = yup.InferType<typeof technicalDataSchema>;

export interface CandidateTestsInput {
  results: Result[];
}

export interface Result {
  candidateid: number;
  candidate: null | string;
  test_type: string;
  test_name: string;
  result: string;
  score: number;
}
