import Dao from '../database/dao'

jest.mock('express')
jest.mock('../schemas/Company')
jest.mock('../schemas/CompanyProfile')
jest.mock('pg')

const fakeData = {
  email: 'john@abcjobs.com',
  password: 'SuperSecret1#',
  companyName: 'ABC Jobs',
  size: 'Startup',
  mainAddress: '6621 Main Street, Suite 300, Miami, FL 33101',
  segments: 'Aviation,Manufacturing,Industrial',
  preferredLanguage: 'English',
  mainContact: 'John Smith',
  id: '1',
  question: {
    question: 'ZStringSch.min(5).max(255)',
    rightAnswer: 'ZStringSch.min(5).max(255)',
    wrongOptions: ['', '', '', '', ''],
  },
}

describe('Dao company tests', () => {
  test('dao store company', async () => {
    const dao = new Dao()
    const result = await dao.storeCompany(
      fakeData.email,
      fakeData.password,
      fakeData.companyName,
    )
    expect(result.msg).toBeDefined()
  })

  test('dao update company profile', async () => {
    const dao = new Dao()
    const result = await dao.updateCompanyProfile(
      fakeData.email,
      fakeData.companyName,
      fakeData.mainAddress,
      fakeData.segments,
      fakeData.preferredLanguage,
      fakeData.mainContact,
    )
    const expected = '201'
    expect(result.msg).toStrictEqual(expected)
  })

  test('get tests 201', async () => {
    const dao = new Dao()
    const result = await dao.getTests()
    expect(result.msg).toBeDefined()
  })

  test('get test by id 201', async () => {
    const dao = new Dao()
    const result = await dao.getTestById(fakeData.id)
    expect(result.msg).toBeDefined()
  })

  test('store test 201', async () => {
    const dao = new Dao()
    const result = await dao.storeTest(
      fakeData.id,
      [fakeData.companyName],
      [fakeData.question],
    )
    const expected = '201'
    expect(result.msg).toStrictEqual(expected)
  })
})
