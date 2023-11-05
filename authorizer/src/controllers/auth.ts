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
  const type = info.type
  const { found, isCandidate } = await dao.isUserRegistered(
    email,
    password,
    type,
  )

  if (found) {
    const token = await generateAccessToken(email, type)
    await dao.authenticateUser(email, password, token, isCandidate)

    return {
      email: email,
      token: token,
    }
  } else {
    return {
      email: null,
      token: null,
    }
  }
}

export async function getUserInfo(token: string) {
  // Add validation for the schema provided

  let isTokenExpired
  let info

  try {
    info = await decodeToken(token)
    isTokenExpired = await tokenExpired(info.exp)
  } catch (e) {
    return { msg: 'The token is not valid, provide a valid token. ' }
  }

  if (isTokenExpired) {
    return { msg: 'The token expired, you have to authenticate again. ' }
  }

  const email: string = info.email
  const type: string = info.type
  const result = await dao.getUserInfo(email)

  if (result.msg === '200') {
    return {
      email: result.email,
      first_name: result.first_name,
      last_name: result.last_name,
      candidateid: result.candidateid,
      type: type,
    }
  } else {
    return { msg: 'Invalid token provided' }
  }
}
