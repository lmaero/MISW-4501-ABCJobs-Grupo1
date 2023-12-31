import * as httpMocks from 'node-mocks-http'
import { register } from '../controllers/project'
import Dao from '../database/dao'
import { ProjectSch } from '../schemas/Project'

jest.mock('express')
jest.mock('../database/dao')

describe('project tests', () => {
  test('register project 201', async () => {
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

    jest.spyOn(ProjectSch, 'safeParse').mockReturnValue({
      success: true,
      data: {
        budget: 100,
        deadline: new Date(),
        description: 'z.string().max(500).optional()',
        price: 100,
        team: ['backend'],
        stakeholders: 'z.string()',
      },
    })
    jest
      .spyOn(Dao.prototype, 'storeProject')
      .mockReturnValue(Promise.resolve({ msg: '201' }))
    const response = httpMocks.createResponse()
    const result = await register(request, response)
    const expected = 201
    expect(result.statusCode).toStrictEqual(expected)
  })

  test('register project 400', async () => {
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

    jest.spyOn(ProjectSch, 'safeParse').mockReturnValue({
      success: true,
      data: {
        budget: 100,
        deadline: new Date(),
        description: 'z.string().max(500).optional()',
        price: 100,
        team: ['backend'],
        stakeholders: 'z.string()',
      },
    })
    jest
      .spyOn(Dao.prototype, 'storeProject')
      .mockReturnValue(Promise.resolve({ msg: '400' }))
    const response = httpMocks.createResponse()
    const result = await register(request, response)
    const expected = 400
    expect(result.statusCode).toStrictEqual(expected)
  })

  test('register project not success', async () => {
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
    const response = httpMocks.createResponse()
    const result = await register(request, response)
    const expected = 400
    expect(result.statusCode).toStrictEqual(expected)
  })
})
