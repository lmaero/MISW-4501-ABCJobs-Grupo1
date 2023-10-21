import * as httpMocks from 'node-mocks-http'
import { register, registerProfile } from '../controllers/company'
import Dao from '../database/dao'
import { CompanyPreSch } from '../schemas/Company'
import { CompanyProfileSch } from '../schemas/CompanyProfile'

jest.mock('express')
jest.mock('../schemas/Company')
jest.mock('../schemas/CompanyProfile')
jest.mock('../database/dao')

const fakeData = {
  email: 'john@abcjobs.com',
  password: 'SuperSecret1#',
  companyName: 'ABC Jobs',
}

const requestOptions: httpMocks.RequestOptions = {
  method: 'POST',
  url: '/company/register',
  body: fakeData,
}

describe('company tests', () => {
  test('register company 201', async () => {
    const request = httpMocks.createRequest(requestOptions)

    jest.spyOn(CompanyPreSch, 'safeParse').mockReturnValue({
      success: true,
      data: fakeData,
    })
    jest
      .spyOn(Dao.prototype, 'storeCompany')
      .mockReturnValue(Promise.resolve({ msg: '201' }))
    const response = httpMocks.createResponse()
    const result = await register(request, response)
    const expected = 201
    expect(result.statusCode).toStrictEqual(expected)
  })

  test('register company 400', async () => {
    const request = httpMocks.createRequest(requestOptions)

    jest.spyOn(CompanyPreSch, 'safeParse').mockReturnValue({
      success: true,
      data: fakeData,
    })
    jest
      .spyOn(Dao.prototype, 'storeCompany')
      .mockReturnValue(Promise.resolve({ msg: '400' }))
    const response = httpMocks.createResponse()
    const result = await register(request, response)
    const expected = 400
    expect(result.statusCode).toStrictEqual(expected)
  })

  test('register profile 200', async () => {
    const request = httpMocks.createRequest(requestOptions)

    jest.spyOn(CompanyPreSch, 'safeParse').mockReturnValue({
      success: true,
      data: fakeData,
    })
    jest
      .spyOn(Dao.prototype, 'updateCompanyProfile')
      .mockReturnValue(Promise.resolve({ msg: '200' }))
  })

  test('update profile 200', async () => {
    const request = httpMocks.createRequest(requestOptions)

    jest.spyOn(CompanyProfileSch, 'safeParse').mockReturnValue({
      success: true,
      data: {
        email: 'john@abcjobs.com',
        size: 'Startup',
        mainAddress: '6621 Main Street, Suite 300, Miami, FL 33101',
        segments: 'Aviation,Manufacturing,Industrial',
        preferredLanguage: 'English',
        mainContact: 'John Smith',
      },
    })
    jest
      .spyOn(Dao.prototype, 'updateCompanyProfile')
      .mockReturnValue(Promise.resolve({ msg: '200' }))
    const response = httpMocks.createResponse()
    const result = await registerProfile(request, response)
    expect(result).toBeDefined()
  })
})
