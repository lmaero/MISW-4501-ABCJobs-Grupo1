import { CandidatePreSch } from '@/schemas/Candidate'

describe('Candidate Schema Validation', () => {
  test('should validate valid data', () => {
    const validData = {
      email: 'validemail@example.com',
      password: 'Password1!',
      fullName: 'John Smith',
    }

    const result = CandidatePreSch.safeParse(validData)

    expect(result.success).toBe(true)
  })

  test('should validate invalid data', () => {
    const invalidData = {
      email: 'invalidEmail', // Invalid email
      password: 'password', // Password doesn't meet criteria
      fullName: 'John', // Not two words separated by space
    }

    const result = CandidatePreSch.safeParse(invalidData)

    expect(result.success).toBe(false)
  })
})
