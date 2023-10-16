import { dateInPast } from '@/schemas/DateInPast'
import { employmentEnum, techRoleEnum } from '@/schemas/Enums'
import { z } from 'zod'

export const experienceSch = z
  .object({
    company: z.string().max(100),
    employment: employmentEnum,
    endDate: z.coerce.date(),
    role: techRoleEnum,
    startDate: dateInPast,
    title: z.string().min(2).max(50),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date cannot occur before the start date.',
  })

export type Experience = z.infer<typeof experienceSch>
