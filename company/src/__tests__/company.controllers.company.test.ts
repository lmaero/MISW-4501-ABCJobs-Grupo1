import * as httpMocks from 'node-mocks-http'
import {createTest, getTestById, getTests, register, registerProfile} from '../controllers/company'
import Dao from '../database/dao'
import { CompanyPreSch } from '../schemas/Company'
import { CompanyProfileSch } from '../schemas/CompanyProfile'
import {testSch} from "../schemas/Test";

jest.mock('express')
jest.mock('../schemas/Company')
jest.mock('../schemas/CompanyProfile')
jest.mock('../database/dao')

const fakeData = {
  email: 'john@abcjobs.com',
  password: 'SuperSecret1#',
  companyName: 'ABC Jobs',
  prueba:
      {
        "name": "Prueba 3",
        "applicableTo": ["frontend"],
        "questions": [
          {
            "question": "Select the best definition of JSX",
            "rightAnswer": "JavaScript XML",
            "wrongOptions": ["A new language", "A plugin for JavaScript", "An awesome library"]
          },
          {
            "question": "Select the best definition of JSX",
            "rightAnswer": "JavaScript XML",
            "wrongOptions": ["A new language", "A plugin for JavaScript", "An awesome library"]
          }
        ]
      }

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

  test('create test 201', async () => {
    const request = httpMocks.createRequest(requestOptions)

    jest.spyOn(testSch, 'safeParse').mockReturnValue({
      success: true,
      data: {
          "name": "Prueba 3",
            "applicableTo": ["frontend"],
            "questions": [
          {
            "question": "Select the best definition of JSX",
            "rightAnswer": "JavaScript XML",
            "wrongOptions": ["A new language", "A plugin for JavaScript", "An awesome library"]
          },
          {
            "question": "Select the best definition of JSX",
            "rightAnswer": "JavaScript XML",
            "wrongOptions": ["A new language", "A plugin for JavaScript", "An awesome library"]
          }
        ]
      },
    })
    jest
        .spyOn(Dao.prototype, 'storeTest')
        .mockReturnValue(Promise.resolve({ msg: '201' }))
    const response = httpMocks.createResponse()
    const result = await createTest(request, response)
    expect(result).toBeDefined()
  })

  test('create test 400', async () => {
    const request = httpMocks.createRequest(requestOptions)

    jest.spyOn(testSch, 'safeParse').mockReturnValue({
      success: true,
      data: {
        "name": "Prueba 3",
        "applicableTo": ["frontend"],
        "questions": [
          {
            "question": "Select the best definition of JSX",
            "rightAnswer": "JavaScript XML",
            "wrongOptions": ["A new language", "A plugin for JavaScript", "An awesome library"]
          },
          {
            "question": "Select the best definition of JSX",
            "rightAnswer": "JavaScript XML",
            "wrongOptions": ["A new language", "A plugin for JavaScript", "An awesome library"]
          }
        ]
      },
    })
    jest
        .spyOn(Dao.prototype, 'storeTest')
        .mockReturnValue(Promise.resolve({ msg: '400' }))
    const response = httpMocks.createResponse()
    const result = await createTest(request, response)
    expect(result).toBeDefined()
  })

  test('get tests 200', async () => {
    const request = httpMocks.createRequest(requestOptions)
    jest.spyOn(Dao.prototype, 'getTests').mockReturnValue(Promise.resolve({ msg: '201', tests: ["Muchos tests"] }))
    const response = httpMocks.createResponse()
    const result = await getTests(request, response)
    const expected = 201
    expect(result.statusCode).toStrictEqual(expected)
  })

  test('get test by id 201', async () => {
    const request = httpMocks.createRequest(requestOptions)
    jest.spyOn(Dao.prototype, 'getTestById').mockReturnValue(Promise.resolve({ msg: '201', tests: ["Muchos tests"] }))
    const response = httpMocks.createResponse()
    const result = await getTestById(request, response)
    const expected = 201
    expect(result.statusCode).toStrictEqual(expected)
  })

})
