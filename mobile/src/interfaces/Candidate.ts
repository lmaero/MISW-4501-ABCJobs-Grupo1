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
