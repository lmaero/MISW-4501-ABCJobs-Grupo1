import { z } from 'zod'

export const dateInPast = z
  .date()
  .refine((startDate) => startDate <= new Date(), {
    message: 'Start date should be in the past.',
  })
