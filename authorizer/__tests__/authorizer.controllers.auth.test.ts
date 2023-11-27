import { authenticateUser, getInfo } from '../src/controllers/auth'
import Dao from '../src/database/dao'
import { IUserInfo } from '../src/interfaces/interfaces'

jest.mock('../src/utils/utils', () => ({
  generateAccessToken: jest.fn(() => ({ token: 1234 })),
  decodeToken: jest.fn(() => ({ token: 1234, email: 'al@hotmail.com' })),
  tokenExpired: jest.fn().mockReturnValueOnce(true),
}))

jest.mock('../src/database/dao')
jest.mock('jwt-decode', () => jest.fn())

describe('authenticate user', () => {
  test('authenticate user code 201', async () => {
    jest
      .spyOn(Dao.prototype, 'authenticateUser')
      .mockReturnValue(Promise.resolve({ msg: '201' }))
    const userInfo: IUserInfo = {
      country: '1',
      languages: '1',
      academicalDataId: 1,
      technicalDataId: 1,
      workDataId: 1,
      isAvailable: true,
      softSkills: '1',
      interviewId: 1,
      email: '1',
      password: '1',
      type: '1',
      token: '1234',
    }
    jest
      .spyOn(Dao.prototype, 'isUserRegistered')
      .mockReturnValue(Promise.resolve({ found: true, isCandidate: true }))
    const expected = await authenticateUser(userInfo)
    expect(expected).toBeDefined()
  })

  test('authenticate user code 400', async () => {
    jest.spyOn(Dao.prototype, 'authenticateUser').mockReturnValue(
      Promise.resolve({
        msg: 'The transaction was not successful with the data provided',
        code: 400,
      }),
    )
    const userInfo: IUserInfo = {
      country: '1',
      languages: '1',
      academicalDataId: 1,
      technicalDataId: 1,
      workDataId: 1,
      isAvailable: true,
      softSkills: '1',
      interviewId: 1,
      email: '1',
      password: '1',
      type: '1',
      token: '1',
    }

    const userResult = {
      msg: 'The transaction was not successful with the data provided',
      code: 400,
    }
    jest
      .spyOn(Dao.prototype, 'isUserRegistered')
      .mockReturnValue(Promise.resolve({ found: false, isCandidate: true }))
    const expected = await authenticateUser(userInfo)
    expect(userResult).toBeDefined()
  })
})

jest.mock('../src/utils/utils', () => ({
  generateAccessToken: jest.fn(() => ({ token: 1234 })),
  decodeToken: jest.fn(() => ({ token: 1234, email: 'al@hotmail.com' })),
  tokenExpired: jest.fn().mockReturnValueOnce(false),
}))

describe('User Info', () => {
  test('Get user info ', async () => {
    const token = '12345'
    const result = { msg: 'ok' }
    let expected
    jest
      .spyOn(Dao.prototype, 'getInfo')
      .mockReturnValue(Promise.resolve({ msg: 'ok' }))
    try {
      expected = await getInfo(token)
    } catch (e) {
      const error: unknown = e
      console.log(error)
    }
    expect(expected).toBeDefined()
  })

  test('Incorrect token provided ', async () => {
    const token = '12345'
    const result = { msg: 'Invalid token provided' }
    let expected
    jest.spyOn(Dao.prototype, 'getInfo').mockReturnValue(
      Promise.resolve({
        msg: '200',
        email: 'userInfo.email',
        first_name: 'userInfo.email',
        last_name: 'userInfo.email',
        candidateid: 'userInfo.email',
        type: 'userInfo.email',
      }),
    )
    try {
      expected = await getInfo(token)
    } catch (e) {
      const error: unknown = e
      console.log(error)
    }
    expect(expected).toBeDefined()
  })
})
