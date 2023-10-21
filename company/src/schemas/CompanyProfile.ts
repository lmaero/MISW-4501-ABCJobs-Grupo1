import { z } from 'zod'
import { companySizeEnum } from './Enums'

export const CompanyProfileSch = z.object({
  email: z.string().email(),
  size: companySizeEnum,
  mainAddress: z.string().min(5).max(100),
  segments: z.string(),
  preferredLanguage: z.string(),
  mainContact: z.string(),
})
