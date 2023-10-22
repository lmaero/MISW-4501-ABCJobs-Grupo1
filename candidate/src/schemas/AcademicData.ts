import { z } from 'zod'
import { dateInPast } from './DateInPast'

export const academicExperienceSch = z
  .object({
    endDate: z.coerce.date(),
    grade: z.number().min(0).max(5),
    obtainedDegree: z.string().min(10).max(50),
    schoolName: z.string().min(3).max(50),
    startDate: dateInPast,
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date cannot occur before the start date.',
  })

export type AcademicExperience = z.infer<typeof academicExperienceSch>
