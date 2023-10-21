import Dao from '../src/database/dao'

jest.mock('express')
jest.mock('../src/schemas/Company')
jest.mock('../src/schemas/CompanyProfile')
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
}

describe('Dao company tests', () => {
  test('dao store company', async () => {
    const dao = new Dao()
    const result = await dao.storeCompany(
      fakeData.email,
      fakeData.password,
      fakeData.companyName,
    )
    const expected = '201'
    expect(result.msg).toStrictEqual(expected)
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
})
