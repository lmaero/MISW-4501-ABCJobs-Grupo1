import * as httpMocks from 'node-mocks-http'
import {
  ping,
  register,
  registerProfile,
  searchCandidate,
  testPerformed,
} from '../controllers/candidate'
import Dao from '../database/dao'
import { CandidatePreSch } from '../schemas/Candidate'
import { CandidateProfileSch } from '../schemas/CandidateProfile'

jest.mock('express')
jest.mock('../schemas/Candidate')
jest.mock('../schemas/CandidateProfile')
jest.mock('../database/dao')
jest.mock('axios', () => {
  return {
    defaults: {
      headers: {
        common: jest.fn(),
      },
    },
    headers: jest.fn(),
    create: jest.fn(),
    get: jest.fn(() =>
      Promise.resolve({
        data: {
          userInfo: {
            candidateId: jest.fn(),
          },
        },
      }),
    ),
  }
})

describe('candidate tests', () => {
  test('ping', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      params: {
        id: 42,
      },
    })
    const response = httpMocks.createResponse()
    const result = await ping(request, response)
    const expected = 200
    expect(result.statusCode).toStrictEqual(expected)
  })

  test('register candidate 201', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      params: {
        id: 42,
      },
      body: {
        email: 'alonsodaniel10@hotmail.com',
        password: 'Contra1234!',
        fullName: 'alonso cantu',
      },
    })

    jest.spyOn(CandidatePreSch, 'safeParse').mockReturnValue({
      success: true,
      data: {
        email: 'alonsodaniel10@hotmail.com',
        password: 'Contra1234!',
        fullName: 'alonso cantu',
      },
    })
    jest
      .spyOn(Dao.prototype, 'storeCandidate')
      .mockReturnValue(Promise.resolve({ msg: '201' }))
    const response = httpMocks.createResponse()
    const result = await register(request, response)
    const expected = 201
    expect(result.statusCode).toStrictEqual(expected)
  })

  test('register candidate 400', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      params: {
        id: 42,
      },
      body: {
        email: 'alonsodaniel10@hotmail.com',
        password: 'Contra1234!',
        fullName: 'alonso cantu',
      },
    })

    jest.spyOn(CandidatePreSch, 'safeParse').mockReturnValue({
      success: true,
      data: {
        email: 'alonsodaniel10@hotmail.com',
        password: 'Contra1234!',
        fullName: 'alonso cantu',
      },
    })
    jest
      .spyOn(Dao.prototype, 'storeCandidate')
      .mockReturnValue(Promise.resolve({ msg: '400' }))
    const response = httpMocks.createResponse()
    const result = await register(request, response)
    const expected = 400
    expect(result.statusCode).toStrictEqual(expected)
  })

  test('register profile 200', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      params: {
        id: 42,
      },
      body: {
        email: 'alonsodaniel10@hotmail.com',
        password: 'Contra1234!',
        fullName: 'alonso cantu',
      },
    })

    jest.spyOn(CandidateProfileSch, 'safeParse').mockReturnValue({
      success: true,
      data: {
        academicData: [
          {
            endDate: new Date(),
            grade: 1,
            obtainedDegree: 'z.string().min(10)',
            schoolName: 'z.string().min(3)',
            startDate: new Date(),
          },
        ],
        certifications: 'Contra1234!',
        experienceData: [
          {
            company: 'z.string().max(100)',
            employment: 'Full-Time',
            endDate: new Date(),
            role: 'backend',
            startDate: new Date(),
            title: 'z.string().min(2)',
          },
        ],
        email: 'alonso@cantu',
        location: 'location',
        mainSoftSkills: 'cantu',
        role: 'backend',
        spokenLanguages: 'cantu',
        technicalData: {
          techSkills: 'commaSeparatedList',
          programmingLanguages: 'commaSeparatedList',
          roles: 'role',
          yearsOfExperience: 20,
        },
      },
    })
    jest
      .spyOn(Dao.prototype, 'updateCandidateProfile')
      .mockReturnValue(Promise.resolve({ msg: '200' }))
    const response = httpMocks.createResponse()
    const result = await registerProfile(request, response)
    expect(result).toBeDefined()
  })

  test('search candidate 404', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      params: {
        id: 42,
      },
      body: {
        role: 'alonsodaniel10@hotmail.com',
        languages: 'Contra1234!',
        softSkills: 'alonso cantu',
        spoken_languages: 'alonso cantu',
      },
    })
    jest
      .spyOn(Dao.prototype, 'searchCandidate')
      .mockReturnValue(Promise.resolve({ msg: '404' }))
    const response = httpMocks.createResponse()
    const result = await searchCandidate(request, response)
    const expected = 404
    expect(result.statusCode).toStrictEqual(expected)
  })

  test('test performed 200', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      params: {
        id: 42,
      },
      headers: {
        authorization: 'B 12345',
      },
      body: {
        role: 'alonsodaniel10@hotmail.com',
        languages: 'Contra1234!',
        softSkills: 'alonso cantu',
        spoken_languages: 'alonso cantu',
      },
    })
    jest
      .spyOn(Dao.prototype, 'storeTestPerformedByCandidate')
      .mockReturnValue(Promise.resolve({ msg: '200' }))

    const response = httpMocks.createResponse()
    const result = await testPerformed(request, response)
    expect(result.statusCode).toStrictEqual(200)
  })

  test('test performed 400', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      params: {
        id: 42,
      },
      headers: {
        authorization: 'B 12345',
      },
      body: {
        role: 'alonsodaniel10@hotmail.com',
        languages: 'Contra1234!',
        softSkills: 'alonso cantu',
        spoken_languages: 'alonso cantu',
      },
    })
    jest
      .spyOn(Dao.prototype, 'storeTestPerformedByCandidate')
      .mockReturnValue(Promise.resolve({ msg: '200' }))

    const response = httpMocks.createResponse()
    const result = await testPerformed(request, response)
    expect(result.statusCode).toStrictEqual(200)
  })

  test('search candidate 404', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      params: {
        id: 42,
      },
      headers: {
        authorization: 'B 12345',
      },
      body: {
        role: 'alonsodaniel10@hotmail.com',
        languages: 'Contra1234!',
        softSkills: 'alonso cantu',
        spoken_languages: 'alonso cantu',
      },
    })
    jest
      .spyOn(Dao.prototype, 'searchCandidate')
      .mockReturnValue(Promise.resolve({ msg: '404' }))
    const response = httpMocks.createResponse()
    const result = await searchCandidate(request, response)
    const expected = 404
    expect(result.statusCode).toStrictEqual(expected)
  })
})
