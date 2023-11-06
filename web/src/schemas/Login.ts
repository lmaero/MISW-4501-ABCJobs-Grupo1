import z from 'zod'
import { ZStringSch } from './ZString'

export const LoginSch = z.object({
  email: ZStringSch.min(1, { message: 'Should be a valid email address' })
    .email()
    .refine((email) => email !== '', {
      message: 'Email cannot be empty and should be a valid email address.',
    }),
  password: z
    .string()
    .min(8)
    .max(16)
    .refine(
      (password) => {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/
        return passwordRegex.test(password)
      },
      {
        message:
          'Password must be 8-16 characters and include at least one lowercase letter, one uppercase letter, one symbol, and one number.',
      },
    ),
  type: z
    .string()
    .min(7)
    .max(9)
    .max(9)
    .regex(/\b(Company|Candidate)\b/),
})

export type Login = z.infer<typeof LoginSch>
