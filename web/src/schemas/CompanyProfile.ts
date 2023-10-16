import { commaSeparatedList } from './CommaSeparatedList'
import { companySizeEnum } from './Enums'
import { z } from 'zod'

export const CompanyProfileSch = z.object({
  size: companySizeEnum,
  mainAddress: z.string().min(5).max(100),
  segments: commaSeparatedList,
  preferredLanguage: z.string(),
  mainContact: z.string()
})

export type CompanyProfile = z.infer<typeof CompanyProfileSch>