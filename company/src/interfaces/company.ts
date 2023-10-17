import { SIZE } from '@prisma/client'

export interface Company {
  name: string
  size: SIZE
  preferredLanguage: string
  businessSegments: string
  nameMainContact: string
  lastNameMainContact: string
}
