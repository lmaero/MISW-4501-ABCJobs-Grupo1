import { z } from 'zod'
import { commaSeparatedList } from './CommaSeparatedList'
import { companySizeEnum } from './Enums'

export const CompanyProfileSch = z.object({
  size: companySizeEnum,
  mainAddress: z.string().min(5).max(100),
  segments: commaSeparatedList,
  preferredLanguage: z.string(),
  mainContact: z.string(),
})

export type CompanyProfile = z.infer<typeof CompanyProfileSch>
