import { CandidatePreSch } from '@/schemas/Candidate'

test('Candidate schema should validate correctly', () => {
  const validData = {
    email: 'validemail@example.com',
    password: 'Password1!',
    fullName: 'John Smith',
  }

  const invalidData = {
    email: 'invalidEmail', // Invalid email
    password: 'password', // Password doesn't meet criteria
    fullName: 'John', // Not two words separated by space
  }

  expect(CandidatePreSch.safeParse(validData).success).toBe(true)
  expect(CandidatePreSch.safeParse(invalidData).success).toBe(false)
})
