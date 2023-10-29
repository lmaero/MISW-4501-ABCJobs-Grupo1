import Dao from '../database/dao'
import { Login } from '../schemas/Login'
import { decodeToken, generateAccessToken, tokenExpired } from '../utils/utils'

let dao: Dao

try {
  dao = new Dao()
} catch (e) {
  console.log('Database connection not established!')
}

export async function authenticateUser(info: Login) {
  const email = info.email
  const password = info.password
  const token = await generateAccessToken(email)

  const result = await dao.authenticateUser(
    personId,
    country,
    languages,
    academicalDataId,
    technicalDataId,
    workDataId,
    isAvailable,
    softSkills,
    interviewId,
    email,
    password,
    token,
  )

  if (result.msg === '201') {
    return {
      personId: personId,
      country: country,
      languages: languages,
      academicalDataId: academicalDataId,
      technicalDataId: technicalDataId,
      workDataId: workDataId,
      isAvailable: isAvailable,
      softSkills: softSkills,
      interviewId: interviewId,
      email: email,
      password: password,
      token: token,
    }
  } else {
    return {
      msg: 'The transaction was not successful with the data provided',
      code: 400,
    }
  }
}

export async function getUserInfo(token: string) {
  const info = await decodeToken(token)
  const isTokenExpired = await tokenExpired(info.exp)

  if (isTokenExpired) {
    return { msg: 'The token expired, you have to authenticate again. ' }
  }

  const email: string = info.email
  const result = await dao.getUserInfo(email)

  if (result.email !== '') {
    return result
  } else {
    return { msg: 'Invalid token provided' }
  }
}
