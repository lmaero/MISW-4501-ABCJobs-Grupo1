import { ZStringSch } from '@/schemas/ZString'
import { z } from 'zod'

export const performTestSch = z.array(z.tuple([ZStringSch, ZStringSch]))

export type PerformTest = z.infer<typeof performTestSch>
