import Dao from '../database/dao'

jest.mock('express')
jest.mock('../schemas/Candidate')
jest.mock('../schemas/CandidateProfile')
jest.mock('jwt-decode', () => jest.fn())
jest.mock('pg')

describe('Dao candidate tests', () => {
  test('dao store candidate', async () => {
    const dao = new Dao()
    const result = await dao.storeCandidate('al', 'al', 'al', 'al')
    const expected = '201'
    expect(result.msg).toStrictEqual(expected)
  })

  test('dao update candidate profile', async () => {
    const dao = new Dao()
    const result = await dao.updateCandidateProfile(
      [
        {
          endDate: new Date(),
          grade: 10,
          obtainedDegree: 'z.string().min(10)',
          schoolName: 'z.string().min(3).max(50)',
          startDate: new Date(),
        },
      ],
      'Contra1234!',
      [
        {
          company: 'z.string().max(100)',
          employment: 'Full-Time',
          endDate: new Date(),
          role: 'backend',
          startDate: new Date(),
          title: 'z.string().min(2)',
        },
      ],
      'alonso@cantu',
      'location',
      'cantu',
      'backend',
      'cantu',
      {
        techSkills: 'commaSeparatedList',
        programmingLanguages: 'commaSeparatedList',
        roles: 'role',
        yearsOfExperience: 20,
      },
    )
    const expected = '201'
    expect(result.msg).toStrictEqual(expected)
  })

  test('dao search candidate', async () => {
    const dao = new Dao()
    const result = await dao.searchCandidate(['al'], ['al'], ['al'], ['al'])
    const expected = '200'
    expect(result.msg).toStrictEqual(expected)
  })
})
