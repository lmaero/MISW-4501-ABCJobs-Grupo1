import * as yup from 'yup';
import commaSeparatedList from './components/CommaSeparatedList';
import {employment, roles, techRole} from '../enums/CandidateProfile';
import {aWeekLaterDate} from '../utils/DateFormat';

export const academicDataSchema = yup.object().shape({
  schoolName: yup
    .string()
    .min(3, 'School Name must be at least 3 characters')
    .max(50, 'School Name must be at most 50 characters'),
  obtainedDegree: yup
    .string()
    .min(10, 'Obtained Degree must be at least 10 characters')
    .max(50, 'Obtained Degree must be at most 50 characters'),
  startDate: yup
    .date()
    .default(new Date())
    .max(new Date(), 'Start date should be in the past'),
  endDate: yup
    .date()
    .default(new Date(aWeekLaterDate))
    .when('startDate', (startDate, schema) => {
      return (
        startDate &&
        schema.min(startDate, 'End date must be after or equal to start date')
      );
    }),
  grade: yup
    .number()
    .min(0, 'Grade must be at least 0')
    .max(5, 'Grade must be at most 5'),
});

export const experienceSchema = yup.object().shape({
  company: yup.string().max(100, 'Company name must be at most 100 characters'),
  title: yup
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(50, 'Title must be at most 50 characters'),
  employment: yup
    .string()
    .default(employment[0])
    .test('employment', 'Invalid employment type.', value =>
      value ? Object.values(employment).includes(value) : true,
    ),
  startDate: yup
    .date()
    .default(new Date())
    .max(new Date(), 'Start date should be in the past'),
  endDate: yup
    .date()
    .default(new Date(aWeekLaterDate))
    .when('startDate', (startDate, schema) => {
      return (
        startDate &&
        schema.min(startDate, 'End date must be after or equal to start date')
      );
    }),
  techRole: yup
    .string()
    .default(techRole[0])
    .test('role', 'Invalid tech role type.', value =>
      value ? Object.values(techRole).includes(value) : true,
    ),
});

export const technicalDataSchema = yup.object().shape({
  techSkills: commaSeparatedList,
  programmingLanguages: commaSeparatedList,
  roles: commaSeparatedList,
  yearsOfExperience: yup
    .number()
    .min(0, 'Years of experience must be at least 0')
    .max(50, 'Years of experience must be at most 50'),
});

const candidateProfileSchema = yup.object().shape({
  academicData: yup.array().of(academicDataSchema),
  mainSoftSkills: commaSeparatedList,
  certifications: commaSeparatedList,
  spokenLanguages: commaSeparatedList,
  location: yup.string(),
  experienceData: yup.array().of(experienceSchema),
  technicalData: technicalDataSchema,
  role: yup
    .string()
    .default(roles[0])
    .test('role', 'Invalid role type.', value =>
      value ? Object.values(roles).includes(value) : true,
    ),
});

export default candidateProfileSchema;
