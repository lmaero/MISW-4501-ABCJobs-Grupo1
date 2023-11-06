import {CandidateProfile} from '../Candidate';

export interface RegisterProfileCandidateInput {
  email: string;
  role: string;
  technicalData: TechnicalData;
  experienceData: ExperienceData[];
  location: string;
  spokenLanguages: string;
  certifications: string;
  mainSoftSkills: string;
  academicData: AcademicData[];
}

interface AcademicData {
  grade: number;
  startDate: Date;
  endDate: Date;
  obtainedDegree: string;
  schoolName: string;
}

interface ExperienceData {
  role: string;
  startDate: Date;
  endDate: Date;
  employment: string;
  title: string;
  company: string;
}

interface TechnicalData {
  yearsOfExperience: number;
  roles: string;
  programmingLanguages: string;
  techSkills: string;
}

export const transformRegisterProfileCandidateInput = (
  email: string,
  candidate: CandidateProfile,
): RegisterProfileCandidateInput => {
  const response: RegisterProfileCandidateInput = {
    email,
    role: candidate.role || '',
    technicalData: {
      yearsOfExperience: candidate.technicalData?.yearsOfExperience || 0,
      roles: candidate.technicalData?.roles || '',
      programmingLanguages: candidate.technicalData?.programmingLanguages || '',
      techSkills: candidate.technicalData?.techSkills || '',
    },
    experienceData:
      candidate.experienceData?.map(
        experience =>
          ({
            startDate: experience.startDate,
            role: experience.techRole || '',
            endDate: experience.endDate,
            employment: experience.employment || '',
            title: experience.title || '',
            company: experience.company || '',
          } as ExperienceData),
      ) || [],
    location: candidate.location || '',
    spokenLanguages: candidate.spokenLanguages || '',
    certifications: candidate.certifications || '',
    mainSoftSkills: candidate.mainSoftSkills || '',
    academicData:
      candidate.academicData?.map(
        academic =>
          ({
            startDate: academic.startDate,
            endDate: academic.endDate,
            obtainedDegree: academic.obtainedDegree,
            grade: academic.grade,
            schoolName: academic.schoolName,
          } as AcademicData),
      ) || [],
  };
  return response;
};

export interface CompanyTestsInput {
  tests: TestInput[];
}

export interface TestInput {
  name: string;
  applicable_to: string[];
  type: null;
  result: null;
  questions: QuestionInput[];
  is_individual_test: null;
  is_finished: null;
  has_authorization: null;
  was_supplanted: null;
  minutes_duration: null;
  test_id: number;
}

export interface QuestionInput {
  question: string;
  question_id: string;
  rightAnswer: string;
  wrongOptions: string[];
}
